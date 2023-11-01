import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";


//English Directions
import Home from './Components/Home/Home';
import Maintanence from "./Build/Maintanence/Maintanence";
import PageUnavailable from "./Build/Error/PageUnavailable";
import Register from "./Components/Register/Register";
import Welcome from "./Components/Welcome/Welcome";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import Store from "./Components/Store/Store";
import Privacy from './Build/Privacy/Privacy'
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";




import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import Hiring from "./Components/Hiring/Hiring";
import HomeStore from "./Components/Store/HomeStore";
import VerifyEmail from "./Components/VerifyEmail/VerifyEmail";



function App() {


  const languages = [
    {
      code: 'fr',
      name: 'Français',
      country_code: 'fr',
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
      country_code: 'sa',
    },
  ]

  const currentLanguageCode = Cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)



  const { t } = useTranslation()

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')

    if (currentLanguage.code === 'ar') {
      const buttons = document.querySelectorAll('button');

      // Apply the desired font style to each button
      buttons.forEach((button) => {
        button.style.fontFamily = 'Cairo';
      });

      document.body.style.fontFamily = 'Cairo'
      document.getElementById('email-get-started')?.classList.add('rtl');
      if (document.getElementById('res-undertext')) {
        document.getElementById('res-undertext').style.display = 'none';
      }
    }
  }, [currentLanguage, t])


  return (
    <ThemeProvider>


      <Routes>

        {/* English routes */}
        <Route exact path='/' element={<Home />} />

        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/verify-email/:token/:id/:email' element={<VerifyEmail />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/privacy-policy' element={<Privacy />} />
        <Route exact path='/jobs' element={<Hiring />} />


        {/* Authenticated user */}
        <Route exact path='/logout' element={<Logout />} />
        <Route exact path='/welcome' element={<Welcome />} />
        <Route exact path='/store' element={<Store />} />
        <Route exact path='/store/home' element={<HomeStore />} />




        <Route exact path='/maintanence' element={<Maintanence />} />
        <Route exact path="*" element={<PageUnavailable />} />



      </Routes>
    </ThemeProvider>

  );
}

export default App;