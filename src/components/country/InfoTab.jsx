import React from 'react';
import { 
  Heart, Globe, Mountain, Calendar, Compass, Waves, 
  MapPinned, Banknote, Languages, MapPin, Building, 
  Users, Check, X, Info, School, GlobeLock, Mail, 
  Circle, Award, Hash, Landmark, Sparkles, Car, Clock, 
  Flag, LifeBuoy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InfoTab = ({ country, formatPopulation, formatArea }) => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {country.name.nativeName && Object.keys(country.name.nativeName).length > 0 && (
        <div className="mb-6 md:mb-8 p-3 sm:p-4 md:p-5 bg-primary/5 rounded-xl border border-primary/10">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary flex items-center">
            <Heart size={20} className="mr-2 text-accent" /> Native Names
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {Object.entries(country.name.nativeName).map(([langCode, names]) => (
              <div key={langCode} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-accent font-bold">{langCode}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    {country.languages?.[langCode] || langCode}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Official: <span className="text-primaryDark">{names.official}</span></p>
                <p className="text-sm text-gray-600">Common: <span className="text-primaryDark">{names.common}</span></p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 
                     hover:border-primary/20 transition-all duration-300 
                     shadow-sm hover:shadow-md transform hover:scale-102">
          <h2 className="text-xl font-bold mb-4 text-primary flex items-center border-b border-gray-200 pb-2">
            <Globe className="mr-2 text-accent" /> Basic Information
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <Building size={16} className="mr-2 text-primary/70" />Capital:
              </span>
              <span className="text-primaryDark font-medium">{country.capital?.join(', ') || 'N/A'}</span>
            </li>
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <Users size={16} className="mr-2 text-primary/70" />Population:
              </span>
              <span className="text-primaryDark font-medium">{formatPopulation(country.population)}</span>
            </li>
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <Mountain size={16} className="mr-2 text-primary/70" />Area:
              </span>
              <span className="text-primaryDark font-medium">{formatArea(country.area)} km²</span>
            </li>
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <Calendar size={16} className="mr-2 text-primary/70" />Start of Week:
              </span>
              <span className="text-primaryDark font-medium capitalize">{country.startOfWeek || 'N/A'}</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 
                     hover:border-primary/20 transition-all duration-300 
                     shadow-sm hover:shadow-md transform hover:scale-102">
          <h2 className="text-xl font-bold mb-4 text-primary flex items-center border-b border-gray-200 pb-2">
            <Compass className="mr-2 text-accent" /> Geography
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <Globe size={16} className="mr-2 text-primary/70" />Region:
              </span>
              <span className="text-primaryDark font-medium">{country.region}</span>
            </li>
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <MapPin size={16} className="mr-2 text-primary/70" />Subregion:
              </span>
              <span className="text-primaryDark font-medium">{country.subregion || 'N/A'}</span>
            </li>
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <Waves size={16} className="mr-2 text-primary/70" />Landlocked:
              </span>
              <span className="text-primaryDark flex items-center">
                {country.landlocked ? 
                  <Check size={18} className="text-green-500" /> : 
                  <X size={18} className="text-red-500" />}
              </span>
            </li>
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <MapPinned size={16} className="mr-2 text-primary/70" />Coordinates:
              </span>
              <span className="text-primaryDark font-medium">
                {country.latlng ? `${country.latlng[0]}°, ${country.latlng[1]}°` : 'N/A'}
              </span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 
                     hover:border-primary/20 transition-all duration-300 
                     shadow-sm hover:shadow-md transform hover:scale-102">
          <h2 className="text-xl font-bold mb-4 text-primary flex items-center border-b border-gray-200 pb-2">
            <Banknote className="mr-2 text-accent" /> Currencies
          </h2>
          {country.currencies ? (
            <ul className="space-y-3">
              {Object.entries(country.currencies).map(([code, currency]) => (
                <li key={code} className="flex flex-col bg-white p-3 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium flex items-center">
                      <Circle size={16} className="mr-2 text-primary/70" />Code:
                    </span>
                    <span className="text-primaryDark font-medium bg-primary/10 px-2 py-0.5 rounded">{code}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium flex items-center">
                      <Award size={16} className="mr-2 text-primary/70" />Name:
                    </span>
                    <span className="text-primaryDark">{currency.name}</span>
                  </div>
                  {currency.symbol && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium flex items-center">
                        <Hash size={16} className="mr-2 text-primary/70" />Symbol:
                      </span>
                      <span className="text-primaryDark font-bold">{currency.symbol}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic flex items-center">
              <Info size={16} className="mr-2" />No currency information available
            </p>
          )}
        </div>
        
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 
                     hover:border-primary/20 transition-all duration-300 
                     shadow-sm hover:shadow-md transform hover:scale-102">
          <h2 className="text-xl font-bold mb-4 text-primary flex items-center border-b border-gray-200 pb-2">
            <Languages className="mr-2 text-accent" /> Languages
          </h2>
          {country.languages ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(country.languages).map(([code, language]) => (
                <span 
                  key={code}
                  className="bg-accent/10 text-primary px-3 py-1.5 rounded-full text-sm
                          hover:bg-accent hover:text-white transition-all duration-300
                          flex items-center shadow-sm"
                >
                  <School size={14} className="mr-1.5" />
                  {language} <span className="text-xs ml-1.5 opacity-75">({code})</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic flex items-center">
              <Info size={16} className="mr-2" />No language information available
            </p>
          )}
        </div>
        
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 
                     hover:border-primary/20 transition-all duration-300 
                     shadow-sm hover:shadow-md transform hover:scale-102">
          <h2 className="text-xl font-bold mb-4 text-primary flex items-center border-b border-gray-200 pb-2">
            <MapPinned className="mr-2 text-accent" /> Border Countries
          </h2>
          {country.borders && country.borders.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {country.borders.map(border => (
                <span 
                  key={border}
                  className="bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm 
                          hover:bg-accent hover:text-white cursor-pointer 
                          transition-all duration-300 flex items-center shadow-sm
                          transform hover:scale-105"
                  onClick={() => navigate(`/country/${border}`)}
                >
                  <Flag size={14} className="mr-1.5" />
                  {border}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 p-3 rounded-lg flex items-center">
              <LifeBuoy size={18} className="mr-2 text-accent" />
              <p className="text-gray-600">Island nation or no bordering countries</p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 
                     hover:border-primary/20 transition-all duration-300 
                     shadow-sm hover:shadow-md transform hover:scale-102">
          <h2 className="text-xl font-bold mb-4 text-primary flex items-center border-b border-gray-200 pb-2">
            <Sparkles className="mr-2 text-accent" /> Miscellaneous
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <Car size={16} className="mr-2 text-primary/70" />Driving Side:
              </span>
              <span className="text-primaryDark capitalize font-medium">{country.car?.side || 'N/A'}</span>
            </li>
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <Clock size={16} className="mr-2 text-primary/70" />Time Zones:
              </span>
              <div className="text-right">
                {country.timezones && country.timezones.length > 0 ? (
                  <span className="text-primaryDark">
                    {country.timezones.length > 2 
                      ? `${country.timezones.slice(0, 2).join(', ')}...` 
                      : country.timezones.join(', ')
                    }
                  </span>
                ) : 'N/A'}
              </div>
            </li>
            <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
              <span className="text-gray-600 font-medium flex items-center">
                <GlobeLock size={16} className="mr-2 text-primary/70" />UN Member:
              </span>
              <span className="text-primaryDark flex items-center">
                {country.unMember ? 
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                    <Check size={14} className="mr-1" />Yes
                  </span> : 
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full flex items-center">
                    <X size={14} className="mr-1" />No
                  </span>}
              </span>
            </li>
            {country.tld && country.tld.length > 0 && (
              <li className="flex items-center justify-between hover:bg-white p-2 rounded-lg transition-colors">
                <span className="text-gray-600 font-medium flex items-center">
                  <Mail size={16} className="mr-2 text-primary/70" />Domain:
                </span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {country.tld.map(domain => (
                    <span key={domain} className="text-primaryDark font-medium bg-primary/10 px-2 rounded">
                      {domain}
                    </span>
                  ))}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {country.coatOfArms && (country.coatOfArms.png || country.coatOfArms.svg) && (
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary flex items-center">
            <Landmark className="mr-2 text-accent" /> Coat of Arms
          </h2>
          <div className="flex justify-center p-4 md:p-8 shadow-sm">
            <img 
              src={country.coatOfArms.svg || country.coatOfArms.png}
              alt={`Coat of Arms of ${country.name.common}`}
              className="max-h-48 md:max-h-64 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTab;
