import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Heart, ChevronLeft, Loader } from 'lucide-react';
import NavBar from '../components/NavBar';
import CountryCard from '../components/CountryCard';
import authAPI from '../services/authAPI';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authAPI.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const userFavorites = authAPI.getFavoriteCountries();
        setFavorites(userFavorites);
      }
      
      setLoading(false);
    };
    
    checkAuth();
    
    const unsubscribe = authAPI.events.subscribe('authStateChanged', () => {
      checkAuth();
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  // If user is not authenticated, redirect to home
  if (!loading && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-bgLight transition-all duration-300">
      <NavBar />
      
      <div className="container mx-auto px-4 py-16 mt-10">
        <div className="animate-fadeIn"> 
          <Link 
            to="/" 
            className="inline-flex items-center mb-6 text-primary hover:text-accent transition-colors duration-300"
          >
            <ChevronLeft size={20} className="mr-1" /> 
            Back to Countries
          </Link>
          
          <h1 className="text-3xl font-bold mb-8 text-primaryDark flex items-center">
            <Heart size={28} className="mr-3 text-accent animate-pulse" />
            Your Favorite Countries
          </h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin">
                <Loader size={40} className="text-accent" />
              </div>
              <span className="ml-3 text-lg text-primary">
                Loading favorites...
              </span>
            </div>
          ) : favorites.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center animate-fadeIn">
              <div className="flex justify-center mb-4">
                <Heart size={64} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-3">
                No Favorite Countries Yet
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start exploring countries and click the heart icon to add them to your favorites.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-primary transition-colors duration-300 transform hover:scale-105"
              >
                Explore Countries
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
              {favorites.map((country) => (
                <div key={country.cca3} className="animate-fadeInUp">
                  <CountryCard country={country} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
