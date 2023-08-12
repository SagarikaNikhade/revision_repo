import React from 'react';

const Navbar = () => {
  return (
    <div style={{display:"flex",gap:"20px",justifyContent:"space-evenly"}}>
      <a className="home-link" href="/">
        Home
      </a>
      <a className="add-product-link" href="/add-product">
        Add Product
      </a>
    </div>
  )
}

export default Navbar;
