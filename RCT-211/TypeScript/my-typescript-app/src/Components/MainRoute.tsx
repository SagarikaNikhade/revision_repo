import React from 'react';
import {Routes , Route} from "react-router-dom";
import HomePage from './HomePage';

const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/add-product" element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default MainRoute;
