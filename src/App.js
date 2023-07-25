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
import Cookies from "js-cookie";



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


  useEffect(() => {
    console.log('Setting page stuff')
    document.body.dir = currentLanguage.dir || 'ltr'
  }, [currentLanguage])


  return (
    <ThemeProvider>
      <Routes>



        {/* English routes */}
        <Route exact path='/' element={<Home />} />

        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/privacy-policy' element={<Privacy />} />


        {/* Authenticated user */}
        <Route exact path='/logout' element={<Logout />} />
        <Route exact path='/welcome' element={<Welcome />} />
        <Route exact path='/store' element={<Store />} />



        <Route exact path='/maintanence' element={<Maintanence />} />
        <Route exact path="*" element={<PageUnavailable />} />



      </Routes>
    </ThemeProvider>

  );
}

export default App;