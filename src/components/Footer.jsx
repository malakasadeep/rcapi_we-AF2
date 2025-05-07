import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Mail, 
  Send, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Facebook,
  MapPin,
  Phone,
  Heart,
  ExternalLink,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(false);

  // Handle newsletter subscription
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log(`Subscribed with email: ${email}`);
      setSubscribed(true);
      setEmail('');
      // Reset subscription message after 5 seconds
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show scroll button when scrolled down
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-primaryDark text-white pt-12 pb-6 relative">
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary hover:bg-accent shadow-lg transition-all duration-300 transform hover:scale-110 z-50 ${
          scrollVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ArrowUp size={20} />
      </button>
      
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden">
        <svg
          className="fill-bgLight"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,26.7C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 mt-32">
          {/* Logo and About section */}
          <div className="animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4 group cursor-pointer">
              <div className="relative">
                <Globe className="text-white h-8 w-8 group-hover:rotate-45 transition-all duration-700" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              </div>
              <span className="text-white font-bold text-xl tracking-wide">
                World<span className="text-accent">Explorer</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              Discover countries from every corner of the world, with detailed guides and insights 
              about cultures, geography, and attractions.
            </p>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="bg-primary/30 hover:bg-primary p-2 rounded-full transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-primary/30 hover:bg-primary p-2 rounded-full transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-primary/30 hover:bg-primary p-2 rounded-full transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-primary/30 hover:bg-primary p-2 rounded-full transition-colors duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="bg-primary/30 hover:bg-primary p-2 rounded-full transition-colors duration-300">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeIn animation-delay-150">
            <h3 className="text-lg font-semibold mb-4 border-b border-accent pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  Features
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Continents */}
          <div className="animate-fadeIn animation-delay-300">
            <h3 className="text-lg font-semibold mb-4 border-b border-accent pb-2">Explore Continents</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?region=africa" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  Africa
                </Link>
              </li>
              <li>
                <Link to="/?region=americas" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  Americas
                </Link>
              </li>
              <li>
                <Link to="/?region=asia" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  Asia
                </Link>
              </li>
              <li>
                <Link to="/?region=europe" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  Europe
                </Link>
              </li>
              <li>
                <Link to="/?region=oceania" className="text-gray-300 hover:text-accent flex items-center transition-colors duration-200">
                  <ExternalLink size={14} className="mr-2" />
                  Oceania
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="animate-fadeIn animation-delay-450">
            <h3 className="text-lg font-semibold mb-4 border-b border-accent pb-2">Stay Updated</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to our newsletter to receive updates about new countries, travel tips and featured destinations.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-primary text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
              >
                <span>Subscribe</span>
                <Send size={16} className="ml-2" />
              </button>
              {subscribed && (
                <p className="text-green-400 text-sm animate-fadeIn">
                  Thank you for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright and Attribution */}
        <div className="text-center pt-4 text-sm text-gray-400">
          <p className="mb-2">
            © {new Date().getFullYear()} WorldExplorer. All rights reserved.
          </p>
          <p className="flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-accent" /> using RestCountryAPIs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
