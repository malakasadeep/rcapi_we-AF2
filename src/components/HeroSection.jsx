import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/lottie/bgworld.json';
import bgImage from '../assets/img/bg2.png'; 

const HeroSection = () => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5);
    }
  }, []);

  return (
    <div 
      className="w-full h-screen overflow-hidden relative flex flex-row items-center bg-bgLight bg-cover bg-center animate-fadeIn"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${bgImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          opacity: 0.3 
        }}
      ></div>
      
      <div className="absolute inset-0 z-0">
        <Lottie 
          lottieRef={lottieRef}
          animationData={animationData} 
          loop={true} 
          autoplay={true}
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="mb-2 flex flex-col md:flex-row items-start md:items-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primaryDark mr-4">
            DISCOVER
          </h1>
          <p className="text-sm font-semibold text-gray-800 max-w-3xl mt-3 md:mt-0 md:ml-10 leading-relaxed">
            Country Explorer provides a comprehensive guide to nations across the globe. 
            From historical landmarks and cultural heritage to modern attractions and natural wonders, 
            it serves as a one-stop resource for travelers, researchers, and enthusiasts alike. 
            Dive into detailed articles about each country's geography, economy, traditions, and more. 
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 mt-6 sm:mt-2">
          <div className="bg-primaryDark text-white text-3xl sm:text-4xl md:text-5xl font-bold py-2 px-4 sm:py-4 sm:px-6 rounded-full mr-4 mb-2 sm:mb-0">
            EXPLORE
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primaryDark">
            AROUND THE WORLD
          </h1>
        </div>

        {/* Features section - hidden on mobile */}
        <div className="hidden sm:block mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-2">
              <i className="lucide lucide-globe text-primaryDark text-4xl sm:text-6xl mb-3 sm:mb-4"></i>
              <h3 className="text-lg sm:text-xl font-bold text-primaryDark">Global Destinations</h3>
              <p className="text-xs sm:text-sm text-gray-800">
                Discover countries from every corner of the world, with detailed guides and insights.
              </p>
            </div>
            <div className="flex flex-col items-center p-2">
              <i className="lucide lucide-map text-primaryDark text-4xl sm:text-6xl mb-3 sm:mb-4"></i>
              <h3 className="text-lg sm:text-xl font-bold text-primaryDark">Interactive Maps</h3>
              <p className="text-xs sm:text-sm text-gray-800">
                Navigate through interactive maps to explore regions, landmarks, and attractions.
              </p>
            </div>
            <div className="flex flex-col items-center p-2 col-span-1 sm:col-span-2 md:col-span-1 mx-auto sm:mx-0">
              <i className="lucide lucide-book-open text-primaryDark text-4xl sm:text-6xl mb-3 sm:mb-4"></i>
              <h3 className="text-lg sm:text-xl font-bold text-primaryDark">Cultural Insights</h3>
              <p className="text-xs sm:text-sm text-gray-800">
                Learn about the rich cultures, traditions, and histories of different nations.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HeroSection;