import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryDetailsByCode } from '../services/countryAPI';
import { useJsApiLoader } from '@react-google-maps/api';
import NavBar from '../components/NavBar';
import LoadingState from '../components/country/LoadingState';
import ErrorState from '../components/country/ErrorState';
import NotFoundState from '../components/country/NotFoundState';
import CountryHero from '../components/country/CountryHero';
import TabNavigation from '../components/country/TabNavigation';
import InfoTab from '../components/country/InfoTab';
import MapTab from '../components/country/MapTab';
import GalleryTab from '../components/country/GalleryTab';
import BackButton from '../components/country/BackButton';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [viewMode, setViewMode] = useState('info'); 

  const { isLoaded: mapsLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const data = await getCountryDetailsByCode(code);
        setCountry(data);
        if (data?.latlng && data.latlng.length >= 2) {
          setMapCenter({ lat: data.latlng[0], lng: data.latlng[1] });
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load country details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountryDetails();
  }, [code]);

  const goBack = () => {
    navigate(-1);
  };

  const formatPopulation = (population) => {
    return population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatArea = (area) => {
    return area?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (loading) {
    return <LoadingState countryCode={code} />;
  }

  if (error) {
    return <ErrorState error={error} onGoBack={goBack} />;
  }

  if (!country) {
    return <NotFoundState onGoBack={goBack} />;
  }

  return (
    <div className="min-h-screen bg-bgLight pb-6 sm:pb-12">
      <NavBar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <BackButton onClick={goBack} />
        
        <CountryHero country={country} formatPopulation={formatPopulation} />
        
        <TabNavigation activeTab={viewMode} onTabChange={setViewMode} />
        
        <div className="bg-white rounded-b-xl rounded-r-xl shadow-lg overflow-hidden border border-gray-200 
                     transform transition-all duration-500 animate-fade-in">
          {viewMode === 'info' && (
            <InfoTab 
              country={country} 
              formatPopulation={formatPopulation}
              formatArea={formatArea}
            />
          )}
          
          {viewMode === 'map' && (
            <MapTab 
              country={country} 
              mapsLoaded={mapsLoaded}
              loadError={loadError}
              mapCenter={mapCenter}
            />
          )}
          
          {viewMode === 'gallery' && (
            <GalleryTab country={country} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
