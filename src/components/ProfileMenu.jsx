import React from 'react';
import { LogOut, User, Settings, Heart } from 'lucide-react';
import authAPI from '../services/authAPI';

const ProfileMenu = ({ onClose, onLogout }) => {
  const user = authAPI.getSession();
  const username = user?.username || 'User';

  const handleLogout = () => {
    authAPI.logout();
    onLogout();
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl py-2 animate-fadeIn z-50 border border-gray-100">
      
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center">
          <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="font-medium text-primary">{username}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
      
      
      <div className="py-1">
        <button className="w-full text-left px-4 py-2 hover:bg-primary/5 flex items-center text-gray-700 hover:text-primary transition-colors">
          <User size={16} className="mr-3 text-accent" />
          My Profile
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-primary/5 flex items-center text-gray-700 hover:text-primary transition-colors">
          <Heart size={16} className="mr-3 text-accent" />
          Favorite Countries
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-primary/5 flex items-center text-gray-700 hover:text-primary transition-colors">
          <Settings size={16} className="mr-3 text-accent" />
          Settings
        </button>
      </div>
      
      
      <div className="border-t border-gray-100 my-1"></div>
      
      
      <div className="py-1">
        <button 
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center text-gray-700 hover:text-red-600 transition-colors"
        >
          <LogOut size={16} className="mr-3 text-red-500" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
