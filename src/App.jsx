import React from 'react';
import AgeVerificationForm from './components/AgeVerificationForm';
import useMetaMask from './hooks/useMetaMask';

function App() {
  const { account, connectWallet, error, isConnected } = useMetaMask();

  return (
    <div style={styles.container}>
      <h1>🔐 ZKP Age Verifier</h1>

      {!isConnected ? (
        <>
          <p>Connect your wallet to begin verification.</p>
          <button onClick={connectWallet} style={styles.button}>
            Connect MetaMask
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </>
      ) : (
        <>
          <p>🟢 Connected Wallet: <strong>{account}</strong></p>
          <AgeVerificationForm />
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    color: '#4f46e5',
    maxWidth: '500px',
    margin: '50px auto',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial',
    background: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default App;
