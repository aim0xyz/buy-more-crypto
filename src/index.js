import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import SolanaProvider from './SolanaProvider';
import { config } from './wagmiConfig';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <SolanaProvider>
        <App />
      </SolanaProvider>
    </WagmiProvider>
  </React.StrictMode>
);