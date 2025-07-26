import React, { useState } from 'react';
import { ethers } from 'ethers';

function WalletConnect() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request accounts
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Connection error:", error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask extension.');
    }
  };

  return (
    <div>
      {account ? (
        <p>{account.slice(0, 6)}...{account.slice(-4)}</p>
      ) : (
        <button onClick={connectWallet}  className="header-button">Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnect;
