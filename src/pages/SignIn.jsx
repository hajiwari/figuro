// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signin(formData.email, formData.password);
      
      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      
      navigate(redirectTo);
    } catch (error) {
      console.error('Sign in error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        case 'auth/invalid-credential':
          setError('Invalid email or password');
          break;
        default:
          setError('Failed to sign in. Please try again');
      }
    } finally {
      setLoading(false);
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
  };

  const handleDemoLogin = (email, password) => {
    setFormData({ email, password });
    setError('');
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }
    // In a real app, you would send a password reset email
    alert(`Password reset email would be sent to ${formData.email}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {redirectTo !== '/' && (
          <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl animate-fade-in">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-gray-600" />
              <p className="text-sm text-gray-800 font-medium">
                Please sign in to continue to checkout
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 relative sm:mx-auto sm:w-full sm:max-w-md">
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
                Welcome Back
              </h2>
              <p className="text-gray-600 text-sm font-medium">
                Sign in to continue your collection journey
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



            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl shadow-soft placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl shadow-soft placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded transition-colors"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 font-medium">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="font-semibold text-gray-700 hover:text-gray-600 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-semibold rounded-2xl text-black transition-all duration-300 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-medium hover:shadow-strong transform hover:scale-105'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing you in...
                  </div>
                ) : (
                  <>
                    Sign in to your account
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-bold text-blue-800">Try Demo Accounts</h3>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handleDemoLogin('demo@figuro.com', 'Password123')}
                  className="w-full text-left p-4 text-sm text-blue-700 hover:bg-blue-100 rounded-xl transition-all duration-200 border border-blue-200 hover:border-blue-300"
                >
                  <div className="font-semibold">👤 Customer Account</div>
                  <div className="text-xs opacity-75 mt-1">demo@figuro.com / Password123</div>
                </button>
                <button
                  onClick={() => handleDemoLogin('admin@figuro.com', 'Admin123')}
                  className="w-full text-left p-4 text-sm text-purple-700 hover:bg-purple-100 rounded-xl transition-all duration-200 border border-purple-200 hover:border-purple-300"
                >
                  <div className="font-semibold">👑 Admin Account</div>
                  <div className="text-xs opacity-75 mt-1">admin@figuro.com / Admin123</div>
                </button>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-base text-gray-600">
              New to Figuro?{' '}
              <Link
                to="/signup"
                className="font-semibold text-primary-600 hover:text-primary-500 transition-colors"
              >
                Create your account
              </Link>
            </p>
          </div>

          {/* Guest Checkout Option */}
          {redirectTo === '/cart' && (
            <div className="mt-6 text-center">
              <Link
                to="/checkout?guest=true"
                className="text-sm text-gray-600 hover:text-gray-900 underline font-medium"
              >
                Continue as guest instead
              </Link>
            </div>
          )}
        </div>

        {/* Security & Links */}
        <div className="mt-8 space-y-6">
          {/* Security Notice */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <div className="bg-green-100 p-2 rounded-xl mr-3">
                <Lock className="h-4 w-4 text-green-600" />
              </div>
              <span className="font-medium">Protected by 256-bit SSL encryption</span>
            </div>
          </div>

          {/* Footer Links */}
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
      </div>
    </div>
  );
};

export default SignIn;