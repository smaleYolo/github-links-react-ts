import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";

function App() {
  return (
      <>
          <Navigation />
          <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/favorites' element={<Favorites/>} />
              <Route path='*' element={<Navigate to='/'/>} />
          </Routes>
      </>
  );
}

export default App;
