import React from 'react';
import '../App.css';
import WalletConnect from '../components/WalletConnect';

const Header = () => (
  <header className="header">
    <div className="headerSides">
      
    </div>
    <div className="header-buttons">
      <button className="header-button">ABOUT</button>
      <button className="header-button">G-ETTO1</button>
      <button className="header-button">G-ETTO2</button>
      <button className="header-button">SWAP</button>
    </div>
    <div className="headerSides">
      <WalletConnect className="header-button"/>
    </div>
  </header>
);

export default Header;
