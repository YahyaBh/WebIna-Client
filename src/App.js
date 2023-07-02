import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home';
import { ThemeProvider } from "./Context/ThemeContext";



function App() {

  return (
    <ThemeProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;