import React, { useState } from 'react';
import { X, LogIn, Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import authAPI from '../services/authAPI';

const SignInPopup = ({ onClose, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const userData = await authAPI.signIn(email, password);
      setIsLoading(false);
      onSignInSuccess(userData);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 bg-primaryDark/70 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-500 hover:text-accent transition-colors p-1.5 hover:bg-accent/10 rounded-full"
        >
          <X size={20} />
        </button>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <LogIn size={28} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-primaryDark">Welcome Back</h2>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 flex items-start rounded">
              <AlertCircle size={20} className="text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
              <Mail size={16} className="mr-2 text-accent" />
              Email Address
            </label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
              <Lock size={16} className="mr-2 text-accent" />
              Password
            </label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-sm font-medium text-accent hover:text-primary transition-colors">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-accent text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <Loader size={20} className="animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              <>Sign In</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPopup;
