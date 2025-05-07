import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import SearchForm from '../components/SearchForm';
import CountryCard from '../components/CountryCard';
import { getAllCountries } from '../services/countryAPI';
import { ChevronLeft, ChevronRight, Loader, Search } from 'lucide-react';

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError('Failed to load countries. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountries();
  }, []);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCountries]);
  
  const handleSearchResults = (results) => {
    setFilteredCountries(results);
  };
  
  const displayedCountries = filteredCountries || countries;
  
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCountries = displayedCountries.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(displayedCountries.length / cardsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return ( 
    <div className="min-h-screen bg-bgLight transition-all duration-300">
      <NavBar/>
      <HeroSection/>
      <SearchForm onSearchResults={handleSearchResults}/>
      <div className="container mx-auto px-4 py-8 mt-12 sm:mt-20">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-primaryDark flex flex-wrap items-center">
          {filteredCountries ? (
            <>
              <Search size={20} className="mr-2 text-accent" />
              <span className="flex-1">Search Results</span>
              <span className="w-full mt-1 sm:mt-0 sm:w-auto sm:ml-2 text-sm sm:text-base font-normal text-gray-600">
                ({displayedCountries.length} countries found)
              </span>
            </>
          ) : (
            <>Explore Countries</>
          )}
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin">
              <Loader size={40} className="text-accent" />
            </div>
            <span className="ml-3 text-base sm:text-lg text-primary">
              Loading countries...
            </span>
          </div>
        ) : error ? (
          <div className="bg-accent bg-opacity-20 border-l-4 border-accent text-primary p-3 sm:p-4 mb-6 text-sm sm:text-base">
            <p>{error}</p>
          </div>
        ) : displayedCountries.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-gray-100 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">No countries found</h3>
            <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {currentCountries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-10">
                <div className="flex items-center mb-4 sm:mb-0">
                  <button 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mr-2 sm:mr-3 rounded-md text-sm 
                              ${currentPage === 1 
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                : 'bg-accent text-white hover:bg-primary transition-colors'}`}
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Prev
                  </button>
                  
                  <span className="text-primary text-sm sm:text-base mx-2 sm:hidden">
                    {currentPage}/{totalPages}
                  </span>
                  
                  {/* Next button for mobile only */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-1.5 sm:px-4 sm:py-2 ml-2 sm:ml-3 rounded-md text-sm sm:hidden
                              ${currentPage === totalPages
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                : 'bg-accent text-white hover:bg-primary transition-colors'}`}
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                <div className="hidden md:flex items-center">
                  {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = idx + 1;
                    } else if (currentPage <= 3) {
                      pageNum = idx + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + idx;
                    } else {
                      pageNum = currentPage - 2 + idx;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`mx-1 px-4 py-2 rounded-md ${
                          currentPage === pageNum
                            ? 'bg-primary text-white'
                            : 'bg-accent bg-opacity-20 text-primary hover:bg-accent hover:bg-opacity-30'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <span className="hidden sm:inline mx-4 text-primary">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  {/* Next button for desktop, positioned on the right */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`hidden sm:flex items-center px-4 py-2 ml-2 rounded-md text-sm
                              ${currentPage === totalPages
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                : 'bg-accent text-white hover:bg-primary transition-colors'}`}
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;