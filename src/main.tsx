import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SolanaProvider from './SolanaProvider'
import './index.css'

// --- Node polyfills for Solana/web3.js and wallet adapters --- //

// Buffer: used by crypto libs
import { Buffer } from 'buffer'
window.Buffer = Buffer

// Process: sometimes used for env detection
import process from 'process'
window.process = process as any

// --- Render App --- //
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SolanaProvider>
      <App />
    </SolanaProvider>
  </React.StrictMode>
)