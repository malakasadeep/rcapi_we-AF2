export const getAllCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries data. Please try again later.');
  }
};

export const searchCountries = async (searchTerm) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}?fields=name,flags,capital,region,population,cca3`);
    if (!response.ok) {
      if (response.status === 404) {
        return []; 
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching countries:', error);
    throw new Error('Failed to search countries. Please try again later.');
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,capital,region,population,cca3`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return [data];
  } catch (error) {
    console.error(`Error fetching country with code ${code}:`, error);
    throw new Error('Failed to fetch country data. Please try again later.');
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,flags,capital,region,population,cca3`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching countries in region ${region}:`, error);
    throw new Error('Failed to fetch region data. Please try again later.');
  }
};

export const getCountriesByLanguage = async (language) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/lang/${language}?fields=name,flags,capital,region,population,cca3`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching countries with language ${language}:`, error);
    throw new Error('Failed to fetch language data. Please try again later.');
  }
};

export const getAllRegions = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=region');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    // Extract unique regions
    const regions = [...new Set(data.map(country => country.region))].filter(Boolean).sort();
    return regions;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw new Error('Failed to fetch regions data. Please try again later.');
  }
};

export const getAllCountryCodes = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=cca3');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    // Extract unique country codes
    const codes = data.map(country => country.cca3).sort();
    return codes;
  } catch (error) {
    console.error('Error fetching country codes:', error);
    throw new Error('Failed to fetch country codes data. Please try again later.');
  }
};

export const getAllLanguages = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=languages');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract all languages
    const languagesSet = new Set();
    data.forEach(country => {
      if (country.languages) {
        Object.values(country.languages).forEach(lang => {
          languagesSet.add(lang);
        });
      }
    });
    
    return [...languagesSet].sort();
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw new Error('Failed to fetch languages data. Please try again later.');
  }
};

export const getCountryDetailsByCode = async (code) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data[0]; // Return the first (and only) country object
  } catch (error) {
    console.error(`Error fetching detailed country data with code ${code}:`, error);
    throw new Error('Failed to fetch detailed country data. Please try again later.');
  }
};