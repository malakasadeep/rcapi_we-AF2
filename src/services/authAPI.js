import axios from 'axios';

const API_BASE_URL =  '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add event system
const authEvents = {
  listeners: {},
  
  subscribe: (event, callback) => {
    if (!authEvents.listeners[event]) {
      authEvents.listeners[event] = [];
    }
    authEvents.listeners[event].push(callback);
    return () => {
      authEvents.listeners[event] = authEvents.listeners[event].filter(
        cb => cb !== callback
      );
    };
  },
  
  publish: (event, data) => {
    if (authEvents.listeners[event]) {
      authEvents.listeners[event].forEach(callback => callback(data));
    }
  }
};


const authAPI = {
 
  signUp: async (email, username, password) => {
    try {
      const response = await apiClient.post('/auth/signup', {
        email,
        username,
        password,
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to sign up. Please try again.' };
    }
  },
  

  signIn: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/signin', {
        email,
        password,
      });
      
      if (response.data) {
        const userData = {
          ...response.data.user,
          token: response.data._id,
          favoriteCountries: response.data.favoriteCountries || [],
        };
        
        // Store session in localStorage
        authAPI.setSession(userData);
        
        // Publish auth state change event
        authEvents.publish('authStateChanged', true);
        
        return userData;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      throw error.response?.data || { message: 'Failed to sign in. Please check your credentials.' };
    }
  },

  setSession: (userData) => {
    localStorage.setItem('userSession', JSON.stringify(userData));
    // apiClient.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  },
  
  getSession: () => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const userData = JSON.parse(session);
      //apiClient.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      
      return userData;
    }
    return null;
  },
  
  isAuthenticated: () => {
    return !!authAPI.getSession();
  },
  
  updateFavoriteCountries: (countries) => {
    const session = authAPI.getSession();
    if (session) {
      session.favoriteCountries = countries;
      authAPI.setSession(session);
    }
  },
  
  getFavoriteCountries: () => {
    const session = authAPI.getSession();
    return session ? session.favoriteCountries : [];
  },
  

  logout: () => {
    localStorage.removeItem('userSession');
    delete apiClient.defaults.headers.common['Authorization'];
    
    // Publish auth state change event
    authEvents.publish('authStateChanged', false);
  },
  
  // Expose event system
  events: authEvents
};

export default authAPI;
