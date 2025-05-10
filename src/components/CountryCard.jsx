import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Users, Globe, Flag, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import authAPI from '../services/authAPI';

const CountryCard = ({ country }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const unsubscribeRef = useRef(null);

  const formatPopulation = (population) => {
    // Add a safety check for undefined or null population
    if (population === undefined || population === null) return 'N/A';
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const updateAuthStatus = () => {
    const authenticated = authAPI.isAuthenticated();
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      const favorites = authAPI.getFavoriteCountries();
      setIsFavorite(favorites.some(fav => fav.cca3 === country.cca3));
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    // Initial check
    updateAuthStatus();
    
    // Subscribe to auth state changes
    const unsubscribe = authAPI.events.subscribe('authStateChanged', () => {
      updateAuthStatus();
    });
    
    unsubscribeRef.current = unsubscribe;
    
    return () => {
      // Cleanup subscription when component unmounts
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [country.cca3]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    
    if (!isAuthenticated) return;
    
    const favorites = authAPI.getFavoriteCountries();
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.cca3 !== country.cca3);
    } else {
      const countryInfo = {
        cca3: country.cca3,
        name: country.name,
        flags: country.flags,
        region: country.region,
        capital: country.capital,
        population: country.population || 0 // Ensure population is always defined
      };
      updatedFavorites = [...favorites, countryInfo];
    }

    authAPI.updateFavoriteCountries(updatedFavorites);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden 
                    transition-all duration-300 ease-in-out hover:shadow-2xl 
                    hover:scale-102 h-full border border-gray-100 
                    hover:border-primary/20 relative group">
      <div className="relative h-40 overflow-hidden">
        
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover transition-transform duration-700 
                    group-hover:scale-105 filter saturate-105"
        />
        <div className="absolute top-3 right-3 bg-primaryDark text-white px-3 py-1 
                      rounded-full text-xs font-bold shadow-lg transform 
                      transition-transform group-hover:scale-110">
          {country.cca3}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 text-primaryDark truncate 
                     group-hover:text-accent transition-colors duration-300">
          {country.name.common}
        </h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-gray-700">
            {country.capital && (
              <div className="flex items-center hover:text-primary transition-colors duration-300">
                <MapPin size={16} className="mr-1.5 flex-shrink-0 text-primary/70" />
                <span className="font-medium text-xs sm:text-sm">Capital: <span className="font-normal">{country.capital.join(', ')}</span></span>
              </div>
            )}
            
            <div className="flex items-center hover:text-primary transition-colors duration-300">
              <Globe size={16} className="mr-1.5 flex-shrink-0 text-primary/70" />
              <span className="font-medium text-xs sm:text-sm">Region: <span className="font-normal">{country.region}</span></span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-700 hover:text-primary transition-colors duration-300">
            <Users size={16} className="mr-2 flex-shrink-0 text-primary/70" />
            <span className="font-medium text-xs sm:text-sm">Population: <span className="font-normal">{formatPopulation(country.population)}</span></span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-t border-gray-100">
        {/* Favorite button - only show when authenticated - now at bottom left */}
        {isAuthenticated ? (
          <button
            onClick={toggleFavorite}
            className="p-1.5 rounded-full transform transition-all hover:scale-110 
                     hover:bg-white hover:shadow-sm"
          >
            <Heart 
              size={18} 
              className={`${isFavorite ? 'fill-accent text-accent' : 'text-gray-400'} 
                        transition-colors duration-300`} 
            />
          </button>
        ) : (
          <div></div>
        )}
        
        <Link 
          to={`/country/${country.cca3}`}
          className="text-primary bg-primary/5 hover:bg-primary hover:text-white 
                   transition-all duration-300 ease-in-out flex items-center 
                   text-xs sm:text-sm font-medium py-1.5 px-3 rounded-full group-hover:shadow-md"
        >
          More details
          <ExternalLink size={14} className="ml-1.5 transform transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;
