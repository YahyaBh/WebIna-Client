import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";


//English Directions
import Home from './Website/En/Components/Home/Home';
import Maintanence from "./Website/En/Build/Maintanence/Maintanence";
import PageUnavailable from "./Website/En/Build/Error/PageUnavailable";
import Register from "./Website/En/Components/Register/Register";
import Welcome from "./Website/En/Components/Welcome/Welcome";
import Login from "./Website/En/Components/Login/Login";
import Logout from "./Website/En/Components/Logout/Logout";
import Store from "./Website/En/Components/Store/Store";
import Privacy from './Website/En/Build/Privacy/Privacy'


//Arabic Directions
import ArHome from './Website/Ar/Components/Home/Home';
import ArMaintanence from "./Website/Ar/Build/Maintanence/Maintanence";
import ArPageUnavailable from "./Website/Ar/Build/Error/PageUnavailable";
import ArRegister from "./Website/Ar/Components/Register/Register";
import ArWelcome from "./Website/Ar/Components/Welcome/Welcome";
import ArLogin from "./Website/Ar/Components/Login/Login";
import ArLogout from "./Website/Ar/Components/Logout/Logout";
import ArStore from "./Website/Ar/Components/Store/Store";
import ArPrivacy from './Website/Ar/Build/Privacy/Privacy'


//French Routes
import FrHome from './Website/Fr/Components/Home/Home';
import FrMaintanence from "./Website/Fr/Build/Maintanence/Maintanence";
import FrPageUnavailable from "./Website/Fr/Build/Error/PageUnavailable";
import FrRegister from "./Website/Fr/Components/Register/Register";
import FrWelcome from "./Website/Fr/Components/Welcome/Welcome";
import FrLogin from "./Website/Fr/Components/Login/Login";
import FrLogout from "./Website/Fr/Components/Logout/Logout";
import FrStore from "./Website/Fr/Components/Store/Store";
import FrPrivacy from './Website/Fr/Build/Privacy/Privacy'

function App() {

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



        {/* Arabic routes */}
        <Route exact path='/ar' element={<ArHome />} />

        <Route exact path='/ar/register' element={<ArRegister />} />
        <Route exact path='/ar/login' element={<ArLogin />} />
        <Route exact path='/ar/privacy-policy' element={<ArPrivacy />} />


        {/* Authenticated user */}
        <Route exact path='/ar/logout' element={<ArLogout />} />
        <Route exact path='/ar/welcome' element={<ArWelcome />} />
        <Route exact path='/ar/store' element={<ArStore />} />



        <Route exact path='/ar/maintanence' element={<ArMaintanence />} />
        <Route exact path="ar/*" element={<ArPageUnavailable />} />


        {/* French routes */}
        <Route exact path='/fr' element={<FrHome />} />

        <Route exact path='/fr/register' element={<FrRegister />} />
        <Route exact path='/fr/login' element={<FrLogin />} />
        <Route exact path='/fr/privacy-policy' element={<FrPrivacy />} />


        {/* Authenticated user */}
        <Route exact path='/fr/logout' element={<FrLogout />} />
        <Route exact path='/fr/welcome' element={<FrWelcome />} />
        <Route exact path='/fr/store' element={<FrStore />} />



        <Route exact path='/fr/maintanence' element={<FrMaintanence />} />
        <Route exact path="fr/*" element={<FrPageUnavailable />} />
      </Routes>
    </ThemeProvider>

  );
}

export default App;