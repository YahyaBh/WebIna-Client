import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Loading from './Components/Loading/Loading';
import { HelmetProvider } from 'react-helmet-async';

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
      .then((res) => {
        setLoading(false);
      });
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        {loading ? <Loading /> : <App />}
      </BrowserRouter>
    </HelmetProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('web-ina-digita-SAf21kDKASJ2DNAKSDML2flFKAMSD'));
root.render(<Root />);
