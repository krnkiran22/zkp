import React, { useState } from 'react';
import {
  BrowserProvider,
  Contract,
  keccak256,
  toUtf8Bytes
} from 'ethers';

import AgeVerifierABI from '../abi/AgeVerifierABI.json';

const CONTRACT_ADDRESS = '0x6fB571D8d56c0eB153a83F60b20cfb4457f93Ff6';

function AgeVerificationForm() {
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setStatus('');
    try {
      if (!window.ethereum) {
        setStatus('❌ MetaMask not detected.');
        return;
      }

      const parsedAge = parseInt(age);
      if (!parsedAge || parsedAge < 18) {
        setStatus('❌ You must be over 18.');
        return;
      }

      setLoading(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, AgeVerifierABI, signer);

      const proof = keccak256(toUtf8Bytes("over_18"));

      const tx = await contract.verifyProof(proof);
      await tx.wait();

      setStatus('✅ Age verified successfully!');
    } catch (error) {
      console.error('❌ Verification error:', error);
      const errorMessage =
        error?.error?.message || error?.data?.message || error.message || 'Verification failed.';
      setStatus(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Verify Your Age</h2>
      <input
        type="number"
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleVerify} style={styles.button} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      <p>{status}</p>
    </div>
  );
}

const styles = {
  card: {
    marginTop: '30px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    maxWidth: '400px',
    margin: '30px auto',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default AgeVerificationForm;
