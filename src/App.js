import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home';
import { ThemeProvider } from "./Context/ThemeContext";
import Maintanence from "./Build/Maintanence/Maintanence";
import PageUnavailable from "./Build/Error/PageUnavailable";



function App() {

  return (
    <ThemeProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/maintanence' element={<Maintanence />} />
        <Route exact path="*" element={<PageUnavailable />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;