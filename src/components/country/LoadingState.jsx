import React from 'react';
import NavBar from '../NavBar';
import { Loader } from 'lucide-react';

const LoadingState = ({ countryCode }) => {
  return (
    <div className="min-h-screen bg-bgLight/50">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin mb-4">
            <Loader size={60} className="text-primary" />
          </div>
          <span className="text-lg text-primary font-medium">Loading country details...</span>
          <p className="text-gray-500 mt-2">Fetching information about {countryCode}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
