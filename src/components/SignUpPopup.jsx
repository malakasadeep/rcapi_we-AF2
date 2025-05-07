import React, { useState } from 'react';
import { X, UserPlus, Mail, User, Lock, AlertCircle, Loader } from 'lucide-react';
import authAPI from '../services/authAPI';

const SignUpPopup = ({ onClose, onSignUpSuccess }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!email || !username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authAPI.signUp(email, username, password);
      const userData = await authAPI.signIn(email, password);
      setIsLoading(false);
      onSignUpSuccess(userData);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-primaryDark/70 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
        
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-500 hover:text-accent transition-colors p-1.5 hover:bg-accent/10 rounded-full"
        >
          <X size={20} />
        </button>
        
        
        <div className="text-center mb-6">
          <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <UserPlus size={28} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-primaryDark">Create Account</h2>
          <p className="text-gray-600 mt-1">Join the World Explorer community</p>
        </div>
        
        
        <form onSubmit={handleSignUp} className="space-y-4">
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
            <label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center">
              <User size={16} className="mr-2 text-accent" />
              Username
            </label>
            <input 
              type="text" 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Choose a username"
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
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center">
              <Lock size={16} className="mr-2 text-accent" />
              Confirm Password
            </label>
            <input 
              type="password" 
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-accent text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <Loader size={20} className="animate-spin mr-2" />
                Creating account...
              </>
            ) : (
              <>Create Account</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPopup;
