import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center px-5 py-2.5 mb-6 bg-primary text-white rounded-full 
               shadow-lg hover:bg-primaryDark transform hover:scale-105 transition-all duration-300"
    >
      <ArrowLeft size={20} className="mr-2 animate-pulse-light" /> 
      Back to Countries
    </button>
  );
};

export default BackButton;
