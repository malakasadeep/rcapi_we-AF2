import React from 'react';
import NavBar from '../NavBar';
import { ArrowLeft } from 'lucide-react';

const NotFoundState = ({ onGoBack }) => {
  return (
    <div className="min-h-screen bg-bgLight/50">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-2">Country not found</h3>
          <p className="text-gray-600">The country you're looking for doesn't exist or has been removed.</p>
        </div>
        <div className="mt-6">
          <button 
            onClick={onGoBack}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
