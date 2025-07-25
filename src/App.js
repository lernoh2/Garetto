import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Header />
    
      <main>
        <div className='mainBox'> First block</div>
          <div className='mainBox'>about</div>
        <div className='mainBox'>G-ETTO1</div>
        <div className='mainBox'>G-ETTO2</div>
        <div className='mainBox'>SWAP</div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
