import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";

import './App.css';

//English Directions
import Home from './Components/Home/Home';
import Maintanence from "./Build/Maintanence/Maintanence";
import PageUnavailable from "./Build/Error/PageUnavailable";
import Welcome from "./Components/Welcome/Welcome";
import Store from "./Components/Store/Store";
import Privacy from './Build/Privacy/Privacy'
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import Product from "./Components/Product/Product";
import Hiring from "./Components/Hiring/Hiring";
import HomeStore from "./Components/Store/HomeStore";



//Auth Directories
import Register from "./Components/Authentication/Register/Register";
import Login from "./Components/Authentication/Login/Login";
import PasswordResest from "./Components/Authentication/PasswordReset/PasswordReset";
import SocialAuthCallback from "./Components/Authentication/Login/SocialAuthCallback";
import VerifyEmail from "./Components/Authentication/VerifyEmail/VerifyEmail";
import Logout from "./Components/Authentication/Logout/Logout";
import Cart from "./Components/Cart/Cart";



import Checkout from "./Components/Checkout/Checkout";
import Profile from "./Components/Authentication/Profile/Profile";
import Purchases from "./Components/Authentication/Purchases/Purchases";
import Cards from "./Components/Authentication/Cards/Cards";
import Wishlist from "./Components/Authentication/Wishlist/Wishlist";
import Password from "./Components/Authentication/Password/Password";









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


  const { t } = useTranslation();




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
    <>

      <Routes>

        {/* English routes */}
        <Route exact path='/' element={<Home />} />

        <Route exact path='/register' element={<Register />} />
        <Route exact path='/register/:email_home' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/forget-password' element={<PasswordResest />} />
        <Route path="/auth/:provider/callback" element={<SocialAuthCallback />}></Route>
        <Route exact path='/verify-email/:token/:id/:email' element={<VerifyEmail />} />


        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/privacy-policy' element={<Privacy />} />
        <Route exact path='/jobs' element={<Hiring />} />


        {/* Authenticated user */}
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/change-password' element={<Password />} />
        <Route exact path='/logout' element={<Logout />} />
        <Route exact path='/welcome' element={<Welcome />} />
        <Route exact path='/store' element={<Store />} />
        <Route exact path='/store/home' element={<HomeStore />} />
        <Route exact path='/store/product/:token' element={<Product />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/checkout' element={<Checkout />} />
        <Route exact path='/purchases' element={<Purchases />} />
        <Route exact path='/user/cards' element={<Cards />} />
        <Route exact path='/favourite' element={<Wishlist />} />



        <Route exact path='/maintanence' element={<Maintanence />} />
        <Route exact path="*" element={<PageUnavailable />} />



      </Routes>

    </>

  );
}

export default App;