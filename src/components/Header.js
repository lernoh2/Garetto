import React from 'react';
import '../App.css';
import WalletConnect from '../components/WalletConnect';

const Header = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

return (
  <header className="header">
    <div className="headerSides">
      
    </div>
    <div className="header-buttons">
      <button onClick={() => scrollToSection('aboutBlock')} className="header-button">ABOUT</button>
        <button onClick={() => scrollToSection('getto1')} className="header-button">G-ETTO1</button>
        <button onClick={() => scrollToSection('getto2')} className="header-button">G-ETTO2</button>
        <button onClick={() => scrollToSection('swapBlock')} className="header-button">SWAP</button>
    </div>
    <div className="headerSides">
      <WalletConnect className="header-button"/>
    </div>
  </header>
  );
};
export default Header;
