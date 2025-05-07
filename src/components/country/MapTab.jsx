import React, { useState, useCallback } from 'react';
import { Map, Loader } from 'lucide-react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const MapTab = ({ country, mapsLoaded, loadError, mapCenter }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '0.75rem'
  };

  // Use responsive height with media query
  if (window.innerWidth >= 768) {
    mapContainerStyle.height = '500px';
  }

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: window.innerWidth >= 768, // Hide map type control on mobile
  };
  
  const getCapitalCoordinates = useCallback(() => {
    if (country?.capitalInfo?.latlng) {
      return { 
        lat: country.capitalInfo.latlng[0], 
        lng: country.capitalInfo.latlng[1] 
      };
    }
    return null;
  }, [country]);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-primary flex items-center">
        <Map className="mr-2 text-accent" /> Interactive Map
      </h2>
      
      {loadError ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">Error loading Google Maps: {loadError.message}</p>
        </div>
      ) : !mapsLoaded ? (
        <div className="h-64 md:h-96 flex justify-center items-center bg-gray-100 rounded-xl">
          <div className="animate-spin mr-3">
            <Loader size={24} className="text-accent" />
          </div>
          <p className="text-sm md:text-base">Loading map...</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute z-10 top-2 md:top-4 left-2 md:left-4 bg-white p-1.5 md:p-2 rounded-lg shadow-md border border-gray-200 text-xs sm:text-sm">
            <h3 className="font-bold text-primary mb-0.5 md:mb-1">{country.name.common}</h3>
            <p className="text-gray-600">
              Click on markers for more information
            </p>
          </div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={5}
            options={mapOptions}
          >
            {/* Country Marker */}
            <Marker
              position={mapCenter}
              icon={{
                url: country.flags.svg || country.flags.png,
                scaledSize: new window.google.maps.Size(40, 30)
              }}
              onClick={() => setSelectedMarker({
                id: 'country', 
                position: mapCenter,
                title: country.name.common,
                info: `Region: ${country.region}${country.subregion ? `, Subregion: ${country.subregion}` : ''}`
              })}
            />
            
            {/* Capital City Marker */}
            {getCapitalCoordinates() && (
              <Marker
                position={getCapitalCoordinates()}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: '#3B82F6',
                  fillOpacity: 0.9,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2
                }}
                onClick={() => setSelectedMarker({
                  id: 'capital', 
                  position: getCapitalCoordinates(),
                  title: country.capital?.join(', ') || 'Capital',
                  info: `Capital City of ${country.name.common}`
                })}
              />
            )}
            
            {/* Info Windows */}
            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-1">
                  <h4 className="font-bold text-primary">{selectedMarker.title}</h4>
                  <p className="text-sm text-gray-600">{selectedMarker.info}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
          
          <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-3">
            {country.maps?.googleMaps && (
              <a 
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-2 py-2 md:p-3 text-sm md:text-base bg-primary/10 text-primary 
                        hover:bg-primary hover:text-white rounded-lg transition-colors transform hover:scale-105"
              >
                <Map className="mr-1 md:mr-2 w-4 h-4 md:w-auto md:h-auto" /> Open in Google Maps
              </a>
            )}
            {country.maps?.openStreetMaps && (
              <a 
                href={country.maps.openStreetMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-2 py-2 md:p-3 text-sm md:text-base bg-accent/10 text-accent 
                        hover:bg-accent hover:text-white rounded-lg transition-colors transform hover:scale-105"
              >
                <Map className="mr-1 md:mr-2 w-4 h-4 md:w-auto md:h-auto" /> Open in OpenStreetMap
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapTab;
