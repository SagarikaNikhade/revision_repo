import React, {useState, useEffect } from 'react';
import Navbar from './Navbar';
import {useLocation} from "react-router-dom";
// import {getProducts} from ""

const HomePage = () => {
  const [data , setData] = useState<formDataType[]>([]);

  const location = useLocation();
  const navData = location.pathname == "/add-product" ? "Add Product Page"

  useEffect(()=>{
     getProducts().then(res => setData(res))
  },[])

  return (
    <div>
      <Navbar navData={"Home Page"}/>
      <ProductList data={data} setData={setData}/>
    </div>
  )
}

export default HomePage
