import React from 'react';
import { Shapes, Flag, Landmark } from 'lucide-react';

const GalleryTab = ({ country }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-primary flex items-center">
        <Shapes className="mr-2 text-accent" /> Country Gallery
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-xl border border-gray-100">
          <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-primary flex items-center">
            <Flag className="mr-2 text-accent" /> National Flag
          </h3>
          <div className="aspect-video bg-white p-2 sm:p-4 rounded-lg shadow-inner overflow-hidden flex items-center justify-center">
            <img 
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          {country.flags.alt && (
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm italic text-gray-600">{country.flags.alt}</p>
          )}
        </div>
        
        {country.coatOfArms && (country.coatOfArms.png || country.coatOfArms.svg) && (
          <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-xl border border-gray-100">
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-primary flex items-center">
              <Landmark className="mr-2 text-accent" /> Coat of Arms
            </h3>
            <div className="aspect-video bg-white p-2 sm:p-4 rounded-lg shadow-inner overflow-hidden flex items-center justify-center">
              <img 
                src={country.coatOfArms.svg || country.coatOfArms.png}
                alt={`Coat of Arms of ${country.name.common}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryTab;
