import React from 'react';
import { Info, Map, Shapes } from 'lucide-react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const renderTabButton = (id, label, icon) => (
    <button 
      onClick={() => onTabChange(id)}
      className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-t-lg transition-all duration-300 whitespace-nowrap ${
        activeTab === id 
          ? 'bg-white text-primary border-t border-l border-r border-gray-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="ml-1 sm:ml-2 text-sm sm:text-base font-medium">{label}</span>
    </button>
  );

  return (
    <div className="overflow-x-auto scrollbar-hide mt-6 sm:mt-8">
      <div className="flex gap-1 sm:gap-2 mb-0 min-w-max">
        {renderTabButton('info', 'Country Information', <Info size={16} className="text-accent" />)}
        {renderTabButton('map', 'Interactive Map', <Map size={16} className="text-accent" />)}
        {renderTabButton('gallery', 'Gallery', <Shapes size={16} className="text-accent" />)}
      </div>
    </div>
  );
};

export default TabNavigation;
