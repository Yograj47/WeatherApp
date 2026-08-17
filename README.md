# Weather App

A responsive weather application built with **React + Vite** that provides current weather conditions, hourly forecasts, daily forecasts, weather highlights, location-based weather, and utility features such as a clock and countdown timer.

Weather data is provided by the **OpenWeather API**.

## Features

* 🌤️ Current weather conditions
* 📍 Automatic weather detection using browser geolocation
* 🔎 Search weather by city
* 🕐 Hourly weather forecast
* 📅 5-day weather forecast
* 💧 Humidity information
* 💨 Wind speed and direction
* 👁️ Visibility
* 🌡️ Feels-like temperature
* 🌅 Sunrise and sunset information
* 🌧️ Precipitation probability
* 🌙 Dark mode
* ⚙️ Settings panel
* 🕒 Location-based clock with timezone support
* ⏱️ Countdown timer
* 📶 Online/offline network status
* 📱 Responsive layouts for mobile, tablet, and desktop
* 💾 Local persistence for selected settings

## Tech Stack

* **React**
* **Vite**
* **JavaScript**
* **Tailwind CSS**
* **Lucide React**
* **React Select**
* **OpenWeather API**

## Weather Data

The application uses the **OpenWeather API** to retrieve weather information.

The application consumes:

* Current weather data
* Forecast data
* Weather icons
* Location timezone information
* Atmospheric and wind information

OpenWeather API:

https://openweathermap.org/api

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── Header.jsx
│   ├── MainContent.jsx
│   ├── SearchCity.jsx
│   ├── Sidebar.jsx
│   ├── TodayHighlights.jsx
│   └── ...
├── hooks/
│   ├── useWeather.js
│   └── useOnlineStatus.js
├── pages/
│   └── Home.jsx
├── stores/
│   └── weatherStore.js
├── utils/
│   ├── DateAndTime.js
│   └── GetLocation.js
├── App.jsx
├── index.css
└── main.jsx
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_WEATHER_API_KEY=your_openweather_api_key
VITE_WEATHER_API_ICON=https://openweathermap.org/img/wn
```

Replace `your_openweather_api_key` with your OpenWeather API key.

### Important

Because this is a Vite client-side application, variables prefixed with `VITE_` are exposed to the browser after being bundled.

Do **not** store private credentials or secrets in these variables.

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Responsive Design

The application provides separate responsive experiences for:

* **Mobile**
* **Tablet**
* **Desktop**

The layout adapts the presentation of current weather, forecasts, highlights, search, and supporting utilities based on the available viewport size.

## Dark Mode

Dark mode can be enabled through the application settings.

The preference is persisted using `localStorage`, allowing the selected appearance to remain active between sessions.

## Location & Timezone

The application supports browser geolocation as well as manual city selection.

Weather timezone information from OpenWeather is used for location-aware time displays, including the built-in clock.

## Network Status

The application monitors the browser's online/offline state and displays the current network status.

This provides immediate feedback when the user loses or regains connectivity.

## Performance

The application is built with Vite and uses a production-optimized bundle for deployment.

Performance considerations include:

* Production JavaScript bundling
* Optimized CSS generation
* Responsive rendering
* Efficient weather data handling
* Browser-side persistence for user settings
* Limited forecast data rendering

## Deployment

The application can be deployed as a static frontend application.

For production deployment, the project can be hosted on **Vercel** using the standard Vite build configuration.

Typical Vercel configuration:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Environment variables used by the application should also be configured in the Vercel project settings.

## Limitations

This application is intentionally built as a client-side React application.

As a result:

* Weather API requests are performed from the browser.
* OpenWeather API availability and limits affect weather data.
* API credentials exposed through Vite environment variables should be treated as client-side credentials.
* Search-engine indexing capabilities are more limited than an SSR/SSG architecture such as Next.js.
* Weather data depends on the external OpenWeather API.

## Future Improvements

Potential future improvements include:

* Weather data caching
* Better offline support
* More granular API request optimization
* Unit selection between Celsius and Fahrenheit
* Improved weather error states
* Additional weather visualizations
* Progressive Web App support
* More advanced performance optimizations

## License

This project is intended as a client-side weather application project.
Weather data is provided by OpenWeather and is subject to their API terms and conditions.
