import React from 'react';
import { Globe, Flag, Building, Users, Languages } from 'lucide-react';

const CountryHero = ({ country, formatPopulation }) => {
  return (
    <div className="relative h-64 sm:h-80 md:h-[500px] rounded-xl overflow-hidden shadow-2xl mb-6 md:mb-8">
      <img
        src={country.flags.svg || country.flags.png}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      
      <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex flex-col gap-1.5 sm:gap-2 items-end">
        <div className="bg-black/70 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm 
                     flex items-center shadow-lg transform transition-transform hover:scale-105 text-xs sm:text-sm">
          <Globe size={16} className="mr-1 sm:mr-2 text-accent" />
          <span>{country.region}</span>
        </div>
        <div className="bg-primary/80 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm 
                     flex items-center shadow-lg transform transition-transform hover:scale-105 text-xs sm:text-sm">
          <Flag size={16} className="mr-1 sm:mr-2 text-white" />
          <span>{country.cca3}</span>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-10 w-full">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg 
                     animate-fade-in-bottom">
          {country.name.common}
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-2 sm:mb-4 drop-shadow-md max-w-3xl 
                   animate-fade-in-bottom animation-delay-150 line-clamp-2 sm:line-clamp-none">
          {country.name.official}
        </p>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-3 mb-2 animate-fade-in-bottom animation-delay-300">
          {country.capital && (
            <div className="bg-black/50 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full 
                         backdrop-blur-sm flex items-center text-xs sm:text-sm">
              <Building size={14} className="mr-1 sm:mr-1.5 text-accent" />
              Capital: {country.capital.join(', ')}
            </div>
          )}
          
          <div className="bg-black/50 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full 
                       backdrop-blur-sm flex items-center text-xs sm:text-sm">
            <Users size={14} className="mr-1 sm:mr-1.5 text-accent" />
            Pop: {formatPopulation(country.population)}
          </div>
          
          {country.languages && (
            <div className="bg-black/50 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full 
                         backdrop-blur-sm flex items-center text-xs sm:text-sm">
              <Languages size={14} className="mr-1 sm:mr-1.5 text-accent" />
              Lang: {Object.values(country.languages).length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryHero;
