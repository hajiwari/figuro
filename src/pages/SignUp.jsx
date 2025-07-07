// src/pages/SignUp.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Check, CheckCircle, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../services/firebase';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailCheckDisabled, setEmailCheckDisabled] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /\d/, text: 'One number' }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.regex.test(formData.password));

  // Function to check if email is already taken
  const checkEmailAvailability = async (email) => {
    if (!email || !email.includes('@') || emailCheckDisabled) {
      setEmailTaken(false);
      setCheckingEmail(false);
      return;
    }
    
    setCheckingEmail(true);
    try {
      // Use fetchSignInMethodsForEmail but with proper error handling
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log('Sign in methods for', email, ':', signInMethods);
      
      // Check if any sign-in methods exist for this email
      const emailExists = signInMethods && signInMethods.length > 0;
      setEmailTaken(emailExists);
      
    } catch (error) {
      console.error('Error checking email:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/quota-exceeded' || 
          error.code === 'resource-exhausted' || 
          error.message?.includes('quota') ||
          error.message?.includes('Quota exceeded')) {
        console.warn('Firebase quota exceeded - disabling email checks');
        setEmailCheckDisabled(true);
        setEmailTaken(false);
      } else if (error.code === 'auth/invalid-email') {
        // Invalid email format
        setEmailTaken(false);
      } else {
        // For other errors, we'll do a simple HTTP request to check if the email exists
        // This is a fallback method using the Firebase REST API
        try {
          const apiKey = 'AIzaSyCGtDqccQvo_9o8IlhIpy4Hno8ZP2HWfP4'; // Your Firebase API key
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${apiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: email,
              continueUri: 'http://localhost:3000'
            })
          });
          
          const data = await response.json();
          
          // If registered is true, the email exists
          // If allProviders exists and has length > 0, email is registered
          const emailExists = data.registered === true || (data.allProviders && data.allProviders.length > 0);
          setEmailTaken(emailExists);
          
        } catch (restError) {
          console.error('REST API fallback also failed:', restError);
          // If all methods fail, assume email is available to not block user registration
          setEmailTaken(false);
        }
      }
    } finally {
      setCheckingEmail(false);
    }
  };

  // Handle email field blur (when user clicks away from email field)
  const handleEmailBlur = () => {
    if (formData.email && formData.email.includes('@') && !emailCheckDisabled) {
      setEmailChecked(true);
      checkEmailAvailability(formData.email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Only check emailTaken if we're not currently checking and the state is reliable
    if (emailTaken && !checkingEmail) {
      setError('An account with this email already exists');
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet the requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const displayName = `${formData.firstName} ${formData.lastName}`;
      await signup(formData.email, formData.password, displayName);
      setSuccess(true);
      setLoading(false);
      
      // Auto-redirect to home page after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Sign up error:', error);
      setLoading(false);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists');
          setEmailTaken(true); // Update our state to reflect this
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/weak-password':
          setError('Password is too weak');
          break;
        default:
          setError('Failed to create account. Please try again');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
    
    // Reset email taken state when email changes
    if (name === 'email') {
      setEmailTaken(false);
      setCheckingEmail(false);
      setEmailChecked(false);
      // Don't reset emailCheckDisabled here - let it persist during the session
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="mt-8 relative sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-strong sm:rounded-3xl sm:px-12 border border-white/20 animate-fade-in">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <Link to="/" className="group flex justify-center items-center mb-6">
              <img 
                src="/figLogo.png" 
                alt="Figuro Logo" 
                className="h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Join Figuro
              </h2>
              <p className="text-gray-600 text-sm font-medium">
                Start your collection journey today
              </p>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-fade-in">
                <div className="flex">
                  <div className="bg-red-100 p-2 rounded-xl">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="First name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleEmailBlur}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              
              {/* Email availability feedback */}
              {formData.email && formData.email.includes('@') && !emailCheckDisabled && emailChecked && (
                <div className="mt-2">
                  {checkingEmail ? (
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-400 mr-2"></div>
                      Checking email availability...
                    </div>
                  ) : emailTaken ? (
                    <div className="flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      This email is already registered
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-green-600">
                      <Check className="h-4 w-4 mr-2" />
                      Email is available
                    </div>
                  )}
                </div>
              )}
              
              {/* Quota exceeded message */}
              {emailCheckDisabled && formData.email && formData.email.includes('@') && (
                <div className="mt-2">
                  <div className="flex items-center text-sm text-amber-600">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Email validation temporarily unavailable. You can still proceed with signup.
                  </div>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-sm">
                      {req.regex.test(formData.password) ? (
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <div className="h-4 w-4 border border-gray-300 rounded-full mr-2" />
                      )}
                      <span className={req.regex.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agree-terms" className="text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading || !isPasswordValid || (emailTaken && !checkingEmail) || checkingEmail}
                className={`group relative w-full flex justify-center py-4 px-6 border border-transparent text-base font-semibold rounded-2xl text-black transition-all duration-300 ${
                  loading || !isPasswordValid || (emailTaken && !checkingEmail) || checkingEmail
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-medium hover:shadow-strong transform hover:scale-105'
                } transition-colors`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {success && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-6 animate-fade-in">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Account Created Successfully!
                </h3>
                <p className="text-green-700 text-sm mb-4">
                  Welcome to Figuro, {formData.firstName}! Your account has been created and you're ready to start your collection journey. You will be redirected to the home page in a few seconds.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go to Home Page
                </button>
              </div>
            </div>
          )}

          {/* Sign In Link */}
          {!success && (
            <div className="mt-8 text-center">
              <p className="text-base text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="font-semibold text-primary-600 hover:text-primary-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Additional Links */}
        {!success && (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <div className="flex justify-center space-x-8 text-sm text-gray-600">
                <Link to="/privacy" className="hover:text-primary-600 transition-colors font-medium">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-primary-600 transition-colors font-medium">
                  Terms of Service
                </Link>
                <Link to="/help" className="hover:text-primary-600 transition-colors font-medium">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;