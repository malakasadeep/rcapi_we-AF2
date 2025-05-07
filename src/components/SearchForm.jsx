import React, { useState, useEffect } from "react";
import {
  Search,
  Globe,
  MapPin,
  Flag,
  Languages,
  Filter,
  X,
  Sparkles,
} from "lucide-react";
import { 
  getAllRegions, 
  getAllCountryCodes, 
  getAllLanguages,
  searchCountries,
  getCountryByCode,
  getCountriesByRegion,
  getCountriesByLanguage
} from "../services/countryAPI";

const SearchForm = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Data for dropdowns
  const [regions, setRegions] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [languages, setLanguages] = useState([]);
  
  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [regionsData, codesData, languagesData] = await Promise.all([
          getAllRegions(),
          getAllCountryCodes(),
          getAllLanguages()
        ]);
        
        setRegions(regionsData);
        setCountryCodes(codesData);
        setLanguages(languagesData);
      } catch (err) {
        setError("Failed to load filter options. Please try again later.");
        console.error(err);
      }
    };
    
    fetchDropdownData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    
    try {
      let results = [];
      
      // Check which filters are active and prioritize them
      if (countryCode) {
        // If country code is selected, use that (most specific)
        results = await getCountryByCode(countryCode);
      } else if (searchTerm) {
        // If search term is provided, search by name
        results = await searchCountries(searchTerm);
      } else if (region) {
        // If region is selected, filter by region
        results = await getCountriesByRegion(region);
      } else if (language) {
        // If language is selected, filter by language
        results = await getCountriesByLanguage(language);
      } else {
        // No filters, return all countries
        return onSearchResults(null); // Reset to default view
      }
      
      // Send results to parent component
      onSearchResults(results);
    } catch (err) {
      setError("Error performing search. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClearFilters = () => {
    setRegion("");
    setCountryCode("");
    setLanguage("");
    setSearchTerm("");
    onSearchResults(null); // Reset to default view
  };

  return (
    <div className="relative z-20 mx-auto -mt-20 sm:-mt-36 w-full max-w-6xl px-4 sm:px-0">
      {/* Main Form Container */}
      <div className="max-w-6xl mx-auto bg-white/50 rounded-lg shadow-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <div className="relative -top-8 sm:-top-12 text-center mb-2 bg-primaryDark w-4/5 sm:w-1/2 justify-center mx-auto rounded-3xl p-2 sm:p-3 animate-fadeIn">
          <h2 className="text-lg sm:text-xl font-bold text-bgLight mb-1 flex justify-center items-center">
            <Globe className="mr-1 sm:mr-2 text-accent" size={20} />
            Country Explorer
            <Sparkles className="ml-1 sm:ml-2 text-accent animate-pulse" size={16} />
          </h2>
          <p className="text-bgLight text-xs sm:text-sm">Discover nations around the world</p>
        </div>
        
        {/* Main Search Box */}
        <div className="relative mb-3 sm:mb-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3 sm:left-4 h-4 sm:h-5 w-4 sm:w-5 text-primary" />
            <input
              type="text"
              placeholder="Search for countries by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border-2 border-accent/30 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-md"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-4 text-primary hover:text-primaryDark"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 mb-4">
          {/* Region Dropdown */}
          <div className="relative">
            <label className="text-base sm:text-lg text-primary mb-0 sm:mb-1 flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-accent" /> Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-1.5 sm:p-2 border border-accent/30 rounded-lg hover:border-primary transition-colors appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            >
              <option value="">All Regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Country Code Dropdown */}
          <div className="relative">
            <label className="block text-base sm:text-lg text-primary mb-0 sm:mb-1 flex items-center">
              <Flag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-accent" /> Country Code
            </label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full p-1.5 sm:p-2 border border-accent/30 rounded-lg hover:border-primary transition-colors appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            >
              <option value="">All Codes</option>
              {countryCodes.map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <label className="block text-base sm:text-lg text-primary mb-0 sm:mb-1 flex items-center">
              <Languages className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-accent" /> Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-1.5 sm:p-2 border border-accent/30 rounded-lg hover:border-primary transition-colors appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="text-red-500 text-center mt-2 text-xs sm:text-sm">{error}</div>}

        {/* Action Buttons */}
        <div className="relative top-6 sm:top-10 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2 sm:mt-3">
          <button
            onClick={handleClearFilters}
            className="bg-accent hover:bg-accent/80 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 text-base sm:text-xl font-semibold"
          >
            <Filter className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3" /> Clear Filters
          </button>
          
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-primary hover:bg-primaryDark text-bgLight px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:bg-gray-400 transform hover:scale-105 text-base sm:text-xl font-semibold"
          >
            {loading ? (
              <span className="flex items-center"><div className="animate-spin mr-2 h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-b-2 border-bgLight rounded-full"></div> Searching...</span>
            ) : (
              <span className="flex items-center"><Search className="mr-2 sm:mr-3 w-4 h-4 sm:w-6 sm:h-6" /> Explore Countries</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
