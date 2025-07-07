// src/pages/AccountSettings.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Bell, CreditCard, MapPin, Eye, EyeOff, Save, AlertCircle, Check, Trash2, Edit3, Upload, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/priceUtils';

const AccountSettings = () => {
  const { currentUser, updateUserProfile, logout, getCurrentUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bio: ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Address form state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    }
  ]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    firstName: '',
    lastName: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    orderUpdates: true,
    newArrivals: false,
    saleAlerts: true,
    restockNotifications: false,
    reviewReminders: true,
    wishlistAlerts: false,
    securityAlerts: true
  });

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      holderName: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      brand: 'mastercard',
      last4: '8888',
      expiryMonth: 6,
      expiryYear: 2026,
      holderName: 'John Doe',
      isDefault: false
    }
  ]);

  // Order history
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 8699,
      items: 3,
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 4999,
      items: 1,
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 16599,
      items: 2,
      trackingNumber: null
    }
  ]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    // Load user data from Firestore
    const loadUserProfile = async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        if (userProfile) {
          setProfileData({
            displayName: userProfile.displayName || '',
            email: userProfile.email || '',
            phone: userProfile.phone || '',
            dateOfBirth: userProfile.dateOfBirth || '',
            gender: userProfile.gender || '',
            bio: userProfile.bio || ''
          });
        } else {
          // Fallback to basic Firebase Auth data
          setProfileData({
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            phone: currentUser.phoneNumber || '',
            dateOfBirth: '',
            gender: '',
            bio: ''
          });
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Fallback to basic Firebase Auth data
        setProfileData({
          displayName: currentUser.displayName || '',
          email: currentUser.email || '',
          phone: currentUser.phoneNumber || '',
          dateOfBirth: '',
          gender: '',
          bio: ''
        });
      }
    };

    loadUserProfile();
  }, [currentUser, navigate, getCurrentUserProfile]);

  const clearMessages = () => {
    setSuccess('');
    setError('');
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      await updateUserProfile({
        displayName: profileData.displayName,
        email: profileData.email,
        phone: profileData.phone,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        bio: profileData.bio
      });
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      setError(`Failed to update profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await updateUserProfile({
        password: passwordData.newPassword
      });
      setSuccess('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Password update error:', error);
      setError('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress ? { ...newAddress, id: editingAddress } : addr
      ));
      setEditingAddress(null);
    } else {
      const id = Math.max(...addresses.map(a => a.id), 0) + 1;
      setAddresses(prev => [...prev, { ...newAddress, id }]);
    }
    setNewAddress({
      type: 'home',
      firstName: '',
      lastName: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    });
    setSuccess('Address saved successfully!');
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      setSuccess('Address deleted successfully!');
    }
  };

  const handleDeletePaymentMethod = (id) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
      setSuccess('Payment method removed successfully!');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.prompt(
      'This action cannot be undone. Type "DELETE" to confirm account deletion:'
    );
    
    if (confirmation === 'DELETE') {
      try {
        // In a real app, you would call a delete account function
        alert('Account deletion would be implemented here');
      } catch (error) {
        setError('Failed to delete account. Please try again.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'orders', label: 'Order History', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and security settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-md p-2 sticky top-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); clearMessages(); }}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Success/Error Messages */}
              {(success || error) && (
                <div className={`mb-6 p-4 rounded-md ${success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex">
                    {success ? (
                      <Check className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                    <div className="ml-3">
                      <p className={`text-sm ${success ? 'text-green-600' : 'text-red-600'}`}>
                        {success || error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                  
                  {/* Avatar Section */}
                  <div className="mb-8 flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-12 w-12 text-gray-600" />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{profileData.displayName || 'User'}</h3>
                      <p className="text-gray-600">{profileData.email}</p>
                      <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                        Change avatar
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={profileData.displayName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender
                        </label>
                        <select
                          value={profileData.gender}
                          onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                  
                  {/* Two-Factor Authentication */}
                  <div className="mb-8 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute right-3 top-2.5"
                        >
                          {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute right-3 top-2.5"
                        >
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute right-3 top-2.5"
                        >
                          {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>

                  {/* Login Sessions */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-600">Chrome on Windows • New York, NY</p>
                        </div>
                        <span className="text-sm text-green-600">Active now</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete Account
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Shipping Addresses</h2>
                    <button 
                      onClick={() => setEditingAddress('new')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Add New Address
                    </button>
                  </div>

                  {/* Address List */}
                  <div className="space-y-4 mb-8">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium">{address.firstName} {address.lastName}</span>
                              {address.isDefault && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">
                              {address.street}{address.apartment && `, ${address.apartment}`}<br />
                              {address.city}, {address.state} {address.zipCode}<br />
                              {address.country}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setEditingAddress(address.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add/Edit Address Form */}
                  {editingAddress && (
                    <form onSubmit={handleAddressSubmit} className="space-y-6 border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        {editingAddress === 'new' ? 'Add New Address' : 'Edit Address'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={newAddress.firstName}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={newAddress.lastName}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123 Main Street"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          value={newAddress.apartment}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, apartment: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Apt 4B"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            value={newAddress.zipCode}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          value={newAddress.country}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, country: e.target.value }))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Set as default address
                        </label>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingAddress(null)}
                          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Add Payment Method
                    </button>
                  </div>

                  {paymentMethods.length > 0 ? (
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium capitalize">{method.brand}</span>
                                  <span className="text-gray-600">•••• {method.last4}</span>
                                  {method.isDefault && (
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">
                                  Expires {method.expiryMonth}/{method.expiryYear} • {method.holderName}
                                </p>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDeletePaymentMethod(method.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Methods</h3>
                      <p className="text-gray-600 mb-6">
                        Add a payment method to make checkout faster and easier.
                      </p>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                        Add Payment Method
                      </button>
                    </div>
                  )}

                  {/* Billing Address */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
                    <p className="text-gray-600 text-sm">
                      Your billing address is used for payment verification and invoicing.
                    </p>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-8">
                    {/* Email Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {key === 'emailMarketing' && 'Receive promotional emails and special offers'}
                                {key === 'orderUpdates' && 'Get notified about your order status and shipping updates'}
                                {key === 'newArrivals' && 'Be the first to know about new products and collections'}
                                {key === 'saleAlerts' && 'Get notified when items go on sale or price drops'}
                                {key === 'restockNotifications' && 'Know when out-of-stock items are available again'}
                                {key === 'reviewReminders' && 'Reminders to review products you\'ve purchased'}
                                {key === 'wishlistAlerts' && 'Notifications about items in your wishlist'}
                                {key === 'securityAlerts' && 'Important security updates and login notifications'}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          Enable push notifications in your browser to receive real-time updates about your orders and account.
                        </p>
                        <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                          Enable Push Notifications
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setSuccess('Notification preferences saved successfully!')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
                  
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Total Amount</p>
                              <p className="font-medium">{formatPrice(order.total)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Items</p>
                              <p className="font-medium">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Tracking Number</p>
                              <p className="font-medium">{order.trackingNumber || 'N/A'}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Details
                            </button>
                            {order.trackingNumber && (
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Track Package
                              </button>
                            )}
                            {order.status === 'delivered' && (
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Write Review
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mb-4">
                        <CreditCard className="h-16 w-16 text-gray-400 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
                      <p className="text-gray-600 mb-6">
                        Start shopping to see your order history here.
                      </p>
                      <button 
                        onClick={() => navigate('/products')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;