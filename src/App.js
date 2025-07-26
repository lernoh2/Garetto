import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Header />
    
      <div className='content'>
        <div className='firstBlock'> First Block</div>
          <div className='aboutBlock'>About</div>
        <div className='getto1'>G-ETTO1</div>
        <div className='getto2'>G-ETTO2</div>
        <div className='swapBlock'>SWAP</div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
