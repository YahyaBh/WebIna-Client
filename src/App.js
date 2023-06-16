import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home';
import Cookies from "js-cookie";

function App() {


  

  return (
    <div className={`glitch-effect ${Cookies.get('--DARK-MODE') ? 'glitch-active' : ''}`}>
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;