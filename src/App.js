import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home'
import Cookies from "js-cookie";


function App() {


  const [glitchEffect , setGlitchEffect] = useState(Cookies.get('glitch'));


  return (
    <div >

        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>

    </div>
  );
}

export default App;
