import React, { useState } from 'react';
import { SEPOLIA_TOKENS, DEFAULT_FROM_TOKEN, DEFAULT_TO_TOKEN } from '../constants/tokens';


const SwapForm = ({ onSwap }) => {
  const [fromToken, setFromToken] = useState(SEPOLIA_TOKENS[0]);
  const [toToken, setToToken] = useState(SEPOLIA_TOKENS[1]);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

 const handleSwap = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Enter a valid amount');
      return;
    }
    onSwap(fromToken, toToken, amount);
  };

  return (
    <div className='swap'>
        <div className='swapSelct'>
        <label>From:</label>
        <select value={fromToken.symbol} onChange={(e) =>
            setFromToken(SEPOLIA_TOKENS.find((t) => t.symbol === e.target.value))} className='select'>
          {SEPOLIA_TOKENS.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>
        <div className='swapSelct'>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='select'/>
      </div>
        <div className='swapSelct'>
        <label>To:</label>
        <select value={toToken.symbol} onChange={(e) =>
            setToToken(SEPOLIA_TOKENS.find((t) => t.symbol === e.target.value))} className='select'>
          {SEPOLIA_TOKENS.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>
       
        <button onClick={handleSwap} className='swapButton'>
        Swap
      </button>
  
    </div>
  );
};


export default SwapForm;
