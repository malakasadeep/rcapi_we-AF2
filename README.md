# 🌍 Country Explorer Application

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

## 📋 Table of Contents
- [Overview](#overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Prerequisites](#-prerequisites)
- [🚀 Installation & Setup](#-installation--setup)
- [🏃‍♂️ Running the Application](#️-running-the-application)
- [🏗️ Building for Production](#️-building-for-production)
- [🔌 API Integration](#-api-integration)
- [🧩 Project Structure](#-project-structure)
- [📝 Contributing](#-contributing)

## Overview
Country Explorer is a comprehensive web application that provides detailed information about countries across the globe. From geographical data and cultural insights to economic information and visual representations, this application serves as a one-stop resource for country-related information.

## ✨ Features
- **🔍 Country Search**: Search for countries by name, region, or code
- **📊 Detailed Country Information**: Access comprehensive data about each country
- **🗺️ Interactive Maps**: Explore countries through integrated Google Maps
- **🖼️ Visual Gallery**: View images related to each country
- **🏳️ Native Names & Languages**: Discover how countries are named in their native languages
- **💹 Economic Indicators**: Learn about currencies and other economic data
- **🏛️ Government Information**: Access information about capitals and governance
- **📱 Responsive Design**: Optimized for all device sizes

## 🛠️ Tech Stack
- **Frontend Framework**: React 19
- **Build Tool**: Vite 6.3
- **Styling**: TailwindCSS 3.4
- **Routing**: React Router 7.5
- **Maps Integration**: Google Maps API
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Animation**: Lottie React

## 📦 Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v18+ recommended)
- npm or yarn package manager
- Google Maps API key (for map functionality)

## 🚀 Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd af-2-malakasadeep
```

2. **Install dependencies**
```bash
npm install
# or if you use yarn
yarn install
```

3. **Environment Variables**

Create a `.env` file in the root directory with the following variables:
```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 🏃‍♂️ Running the Application

To start the development server:
```bash
npm run dev
# or
yarn dev
```

This will launch the application in development mode. Open your browser and navigate to: http://localhost:5173/

## 🏗️ Building for Production

To build the application for production:
```bash
npm run build
# or
yarn build
```

To preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

## 🔌 API Integration

### Country API
The application uses a country API to fetch detailed information about countries. The API is accessed through the following endpoints:

1. **Fetch All Countries**
   - Endpoint: `/api/countries`
   - Used in the main listing page to display all countries

2. **Fetch Country by Code**
   - Endpoint: `/api/countries/{code}`
   - Used in the country detail page to display specific information
   - Example: `/api/countries/USA` for United States

3. **Search Countries**
   - Endpoint: `/api/countries/search?q={query}`
   - Used for searching countries by name or attributes

### Google Maps API
The application integrates with Google Maps API to display country locations. To use this functionality:

1. Obtain a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Add your API key to the `.env` file as described in the setup section
3. The map will automatically load in the country detail page

## 🧩 Project Structure