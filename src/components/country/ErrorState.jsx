import React from 'react';
import NavBar from '../NavBar';
import { ArrowLeft } from 'lucide-react';

const ErrorState = ({ error, onGoBack }) => {
  return (
    <div className="min-h-screen bg-bgLight/50">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <div className="bg-accent bg-opacity-20 border-l-4 border-accent text-primary p-4 mb-6">
          <p>{error}</p>
        </div>
        <button 
          onClick={onGoBack}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
