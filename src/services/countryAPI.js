const BASE_URL = 'https://restcountries.com/v3.1';
const COMMON_FIELDS = 'name,flags,capital,region,population,cca3';

const fetchFromAPI = async (endpoint, errorMsg = 'Failed to fetch data.') => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(errorMsg, error);
    throw new Error(errorMsg + ' Please try again later.');
  }
};

export const getAllCountries = async () => {
  return fetchFromAPI(`/all?fields=${COMMON_FIELDS}`, 'Error fetching countries:');
};

export const searchCountries = async (searchTerm) => {
  return fetchFromAPI(`/name/${encodeURIComponent(searchTerm)}?fields=${COMMON_FIELDS}`, 'Error searching countries:');
};

export const getCountryByCode = async (code) => {
  const data = await fetchFromAPI(`/alpha/${encodeURIComponent(code)}?fields=${COMMON_FIELDS}`, `Error fetching country with code ${code}:`);
  return Array.isArray(data) ? data : [data];
};

export const getCountriesByRegion = async (region) => {
  return fetchFromAPI(`/region/${encodeURIComponent(region)}?fields=${COMMON_FIELDS}`, `Error fetching countries in region ${region}:`);
};

export const getCountriesByLanguage = async (language) => {
  return fetchFromAPI(`/lang/${encodeURIComponent(language)}?fields=${COMMON_FIELDS}`, `Error fetching countries with language ${language}:`);
};

export const getAllRegions = async () => {
  const data = await fetchFromAPI('/all?fields=region', 'Error fetching regions:');
  const regions = [...new Set(data.map(country => country.region))].filter(Boolean).sort();
  return regions;
};

export const getAllCountryCodes = async () => {
  const data = await fetchFromAPI('/all?fields=cca3', 'Error fetching country codes:');
  return data.map(country => country.cca3).sort();
};

export const getAllLanguages = async () => {
  const data = await fetchFromAPI('/all?fields=languages', 'Error fetching languages:');
  const languagesSet = new Set();
  data.forEach(country => {
    if (country.languages) {
      Object.values(country.languages).forEach(lang => languagesSet.add(lang));
    }
  });
  return [...languagesSet].sort();
};

export const getCountryDetailsByCode = async (code) => {
  const data = await fetchFromAPI(`/alpha/${encodeURIComponent(code)}`, `Error fetching detailed country data with code ${code}:`);
  return Array.isArray(data) ? data[0] : data;
};