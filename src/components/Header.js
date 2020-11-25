import React from 'react';
import logo from '../images/logo.svg';

function Header () {
  return (
    <header className="header section">         
      <img className="logo" src={logo} alt="логотип Место" />    
    </header> 
  )
}

export default Header;