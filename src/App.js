import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home'

function App() {
  return (
    <Fragment>






      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>






    </Fragment>
  );
}

export default App;
