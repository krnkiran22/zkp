import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const useMetaMask = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkMetaMask = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const ethProvider = new ethers.BrowserProvider(window.ethereum); // ✅ Ethers v6
          setProvider(ethProvider);

          const accounts = await ethProvider.send("eth_accounts", []);
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (err) {
          console.error("Error checking MetaMask:", err);
          setError("MetaMask error");
        }
      } else {
        setError('MetaMask not detected');
      }
    };

    checkMetaMask();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask not detected');
      return;
    }

    try {
      const ethProvider = new ethers.BrowserProvider(window.ethereum); // ✅ For Ethers v6
      const accounts = await ethProvider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      setProvider(ethProvider);
    } catch (err) {
      setError('User rejected connection');
    }
  };

  return {
    account,
    connectWallet,
    error,
    isConnected: !!account,
  };
};

export default useMetaMask;
