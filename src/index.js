import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Loading from './Components/Loading/Loading';
import { ThemeProvider } from './Context/ThemeContext';
import { StoreProvider } from './Context/StoreConetxt';

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    i18next
      .use(HttpApi)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        supportedLngs: ['en', 'ar', 'fr'],
        fallbackLng: 'en',
        debug: false,
        detection: {
          order: ['path', 'cookie', 'htmlTag'],
          caches: ['cookie'],
        },
        backend: {
          loadPath: '/assets/locales/{{lng}}/translation.json',
        },
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    <Loading />
    return null;
  }

  return (
    <App />
  );
};


const root = ReactDOM.createRoot(document.getElementById("web-ina-digita-SAf21kDKASJ2DNAKSDML2flFKAMSD"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <StoreProvider>
            <Root />
          </StoreProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
