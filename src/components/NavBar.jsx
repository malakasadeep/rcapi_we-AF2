import React, { useState, useEffect, useRef } from 'react';
import { Globe, Search, ChevronDown, Map, User, UserPlus, History, Star, X, LogIn, Heart, ChevronRight, Menu } from 'lucide-react';
import SignInPopup from './SignInPopup';
import SignUpPopup from './SignUpPopup';
import ProfileMenu from './ProfileMenu';
import authAPI from '../services/authAPI';

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authAPI.isAuthenticated());
    };
    
    checkAuth();
  }, []);
  
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('[data-mobile-toggle]')) {
        setMobileMenuOpen(false);
      }
    };
    
    if (showProfileMenu || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu, mobileMenuOpen]);
  
  const recentSearches = ['Japan', 'Brazil', 'Italy', 'Egypt'];
  
  const continents = [
    { value: '', label: 'All Continents' },
    { value: 'africa', label: 'Africa' },
    { value: 'americas', label: 'Americas' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'oceania', label: 'Oceania' },
  ];

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true);
    setShowSignInPopup(false);
    setShowSignUpPopup(false);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className={`${isDarkMode ? 'bg-primaryDark' : 'bg-bgLight'} py-3 px-6 shadow-lg flex items-center justify-between sticky top-0 z-30 transition-colors duration-500 relative`}>
      {/* Left - Logo and Brand Name */}
      <div className="flex items-center space-x-3 group cursor-pointer">
        <div className="relative">
          <Globe className={`${isDarkMode ? 'text-white' : 'text-primary'} h-8 w-8 group-hover:rotate-45 transition-all duration-700`} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
        </div>
        <span className={`${isDarkMode ? 'text-white' : 'text-primary'} font-bold text-xl tracking-wide`}>
          World<span className="text-accent">Explorer</span>
        </span>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        data-mobile-toggle
        className="md:hidden bg-primary hover:bg-accent p-2 rounded-full transition-all duration-300 text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Middle - Search Bar - Desktop Only */}
      <div className="hidden md:flex flex-1 max-w-4xl mx-6 relative">
        <div className={`flex w-full rounded-full overflow-hidden border-2 ${isDarkMode ? 'border-primary bg-primaryDark' : 'border-accent bg-white'} hover:border-accent focus-within:border-accent transition-colors duration-300 shadow-md hover:shadow-lg`}>
          {/* Continent selector */}
          <div className="relative group">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-accent' : 'text-primary'} h-4 w-4 pointer-events-none transition-transform duration-300 group-hover:scale-110`}>
              <Map size={16} />
            </div>
            <select 
              className={`appearance-none ${isDarkMode ? 'bg-primaryDark text-white' : 'bg-bgLight text-primary'} h-full py-2 pl-10 pr-8 focus:outline-none font-medium border-r border-primary cursor-pointer transition-colors duration-300`}
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
            >
              {continents.map((continent) => (
                <option key={continent.value} value={continent.value}>
                  {continent.label}
                </option>
              ))}
            </select>
            <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-accent' : 'text-primary'} h-4 w-4 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-35%]`} />
          </div>
          
          {/* Search input */}
          <div className="flex flex-1 items-center relative">
            <input
              type="text"
              placeholder="Search for a country..."
              className={`w-full py-2 px-4 focus:outline-none ${isDarkMode ? 'bg-primaryDark text-white placeholder-gray-400' : 'bg-white text-primary'} transition-colors duration-300`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowRecentSearches(true)}
              onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)}
            />
            <button className="bg-primary hover:bg-accent p-2 rounded-full mr-1.5 transition-all duration-300 transform hover:scale-110 hover:rotate-12 group">
              <Search className={`${isDarkMode ? 'text-white' : 'text-white'} h-5 w-5 group-hover:text-primary`} />
            </button>
          </div>
        </div>
        
        {/* Recent searches dropdown */}
        {showRecentSearches && searchQuery.length === 0 && (
          <div className={`absolute top-full left-0 right-0 mt-2 ${isDarkMode ? 'bg-primaryDark text-white' : 'bg-white text-primary'} rounded-lg shadow-lg border border-primary z-20 py-2 animate-fadeIn`}>
            <div className="flex items-center justify-between px-4 py-1 border-b border-primary">
              <div className="flex items-center">
                <History className="h-4 w-4 mr-2 text-accent" />
                <span className="font-medium">Recent Searches</span>
              </div>
              <button className="text-xs text-accent hover:text-white">Clear</button>
            </div>
            <ul>
              {recentSearches.map((item, index) => (
                <li 
                  key={index} 
                  className={`px-4 py-1.5 flex items-center justify-between hover:${isDarkMode ? 'bg-primary' : 'bg-bgLight'} cursor-pointer transition-colors duration-200`}
                  onClick={() => setSearchQuery(item)}
                >
                  <span>{item}</span>
                  <div className="flex space-x-1">
                    <Star className="h-3.5 w-3.5 text-accent" />
                    <X className="h-3.5 w-3.5 text-gray-400 hover:text-accent" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right - Auth Buttons or User Profile - Desktop Only */}
      <div className="hidden md:flex items-center space-x-3">
        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className="bg-primary hover:bg-accent w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-180"
        >
          <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-white' : 'bg-primary'} transition-all duration-500 ${isDarkMode ? 'scale-75' : 'scale-100'}`}></div>
        </button>
        
        {isAuthenticated ? (
          <>
            {/* Favorites Button */}
            <button className="bg-primary hover:bg-accent text-white py-1.5 px-4 rounded-full transition-all duration-300 hover:shadow-md transform hover:scale-105 group flex items-center">
              <Heart size={16} className="text-white group-hover:text-primary mr-2 transition-colors duration-300" />
              <span className="group-hover:text-primary transition-colors duration-300">Favorites</span>
            </button>
            
            {/* Profile Button with Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center space-x-2 ${isDarkMode ? 'bg-transparent hover:bg-primary' : 'bg-transparent hover:bg-accent'} ${isDarkMode ? 'text-white' : 'text-primary'} py-1.5 px-4 rounded-full transition-all duration-300 border ${isDarkMode ? 'border-primary' : 'border-accent'} hover:shadow-md group`}
              >
                <User size={16} className={`${isDarkMode ? 'text-accent' : 'text-primary'} group-hover:scale-110 transition-transform duration-300`} />
                <span className="mr-1">Profile</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Profile Menu Dropdown */}
              {showProfileMenu && (
                <ProfileMenu onClose={() => setShowProfileMenu(false)} onLogout={handleLogout} />
              )}
            </div>
          </>
        ) : (
          <>
            {/* Sign In Button */}
            <button 
              onClick={() => setShowSignInPopup(true)}
              className={`flex items-center space-x-2 ${isDarkMode ? 'bg-transparent hover:bg-primary' : 'bg-transparent hover:bg-accent'} ${isDarkMode ? 'text-white' : 'text-primary'} py-1.5 px-4 rounded-full transition-all duration-300 border ${isDarkMode ? 'border-primary' : 'border-accent'} hover:shadow-md group`}
            >
              <LogIn size={16} className={`${isDarkMode ? 'text-accent' : 'text-primary'} group-hover:scale-110 transition-transform duration-300`} />
              <span>Login</span>
            </button>
            
            {/* Sign Up Button */}
            <button 
              onClick={() => setShowSignUpPopup(true)}
              className="bg-primary hover:bg-accent text-white py-1.5 px-4 rounded-full transition-all duration-300 hover:shadow-md transform hover:scale-105 group"
            >
              <div className="flex items-center space-x-2">
                <UserPlus size={16} className="text-white group-hover:text-primary group-hover:rotate-12 transition-all duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">Sign Up</span>
              </div>
            </button>
          </>
        )}
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className={`absolute top-full left-0 right-0 mt-3 mx-3 p-4 rounded-lg shadow-lg md:hidden z-40 animate-fadeIn ${
            isDarkMode ? 'bg-primaryDark border border-primary' : 'bg-bgLight border border-accent'
          }`}
        >
          {/* Mobile Search Bar */}
          <div className="mb-4">
            <div className={`flex rounded-full overflow-hidden border-2 ${isDarkMode ? 'border-primary bg-primaryDark' : 'border-accent bg-white'} hover:border-accent transition-colors duration-300 shadow-md`}>
              {/* Continent selector - Mobile */}
              <div className="relative group">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-accent' : 'text-primary'} h-4 w-4 pointer-events-none`}>
                  <Map size={16} />
                </div>
                <select 
                  className={`appearance-none ${isDarkMode ? 'bg-primaryDark text-white' : 'bg-bgLight text-primary'} h-full py-2 pl-10 pr-8 focus:outline-none font-medium border-r border-primary`}
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                >
                  {continents.map((continent) => (
                    <option key={continent.value} value={continent.value}>
                      {continent.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-accent' : 'text-primary'} h-4 w-4 pointer-events-none`} />
              </div>
              
              {/* Search input - Mobile */}
              <div className="flex flex-1 items-center relative">
                <input
                  type="text"
                  placeholder="Search for a country..."
                  className={`w-full py-2 px-4 focus:outline-none ${isDarkMode ? 'bg-primaryDark text-white placeholder-gray-400' : 'bg-white text-primary'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-primary hover:bg-accent p-2 rounded-full mr-1.5">
                  <Search className="text-white h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Auth Buttons */}
          <div className="space-y-3">
            {/* Dark Mode Toggle - Mobile */}
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-white' : 'text-primary'} font-medium`}>Dark Mode</span>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="bg-primary hover:bg-accent w-8 h-8 rounded-full flex items-center justify-center"
              >
                <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-white' : 'bg-primary'} ${isDarkMode ? 'scale-75' : 'scale-100'}`}></div>
              </button>
            </div>
            
            {isAuthenticated ? (
              <>
                <button className="w-full bg-primary hover:bg-accent text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                  <Heart size={16} className="text-white" />
                  <span>Favorites</span>
                </button>
                
                <button 
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center space-x-2 ${isDarkMode ? 'bg-transparent border-primary text-white' : 'bg-transparent border-accent text-primary'} py-2 px-4 rounded-lg border`}
                >
                  <User size={16} className={isDarkMode ? 'text-accent' : 'text-primary'} />
                  <span>Profile</span>
                </button>
                
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center space-x-2 bg-transparent border border-red-500 text-red-500 py-2 px-4 rounded-lg`}
                >
                  <LogIn size={16} className="transform rotate-180" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setShowSignInPopup(true);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center space-x-2 ${isDarkMode ? 'bg-transparent border-primary text-white' : 'bg-transparent border-accent text-primary'} py-2 px-4 rounded-lg border`}
                >
                  <LogIn size={16} className={isDarkMode ? 'text-accent' : 'text-primary'} />
                  <span>Login</span>
                </button>
                
                <button 
                  onClick={() => {
                    setShowSignUpPopup(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary hover:bg-accent text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                >
                  <UserPlus size={16} className="text-white" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Sign In Popup */}
      {showSignInPopup && (
        <SignInPopup onClose={() => setShowSignInPopup(false)} onSignInSuccess={handleAuthSuccess} />
      )}
      
      {/* Sign Up Popup */}
      {showSignUpPopup && (
        <SignUpPopup onClose={() => setShowSignUpPopup(false)} onSignUpSuccess={handleAuthSuccess} />
      )}
    </nav>
  );
}

export default NavBar;