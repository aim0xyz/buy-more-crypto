import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

// Import wallet styles
import '@solana/wallet-adapter-react-ui/styles.css'

import PowerLevel from './PowerLevel'

const App: React.FC = () => {
  const { publicKey } = useWallet()

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚀 Buy More Crypto: The Hodler's Quest</h1>

      {/* Wallet Connect */}
      <WalletMultiButton />

      {publicKey ? (
        <>
          <p style={styles.text}>
            ✅ Connected to wallet: <strong>{publicKey.toBase58()}</strong>
          </p>
          <PowerLevel /> {/* <-- show Power Level inside app */}
        </>
      ) : (
        <p style={styles.text}>🔌 Wallet not connected</p>
      )}
    </div>
  )
}

// Inline styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#0e1117',
    color: '#fff',
  },
  heading: {
    fontSize: '2rem',
  },
  text: {
    fontSize: '1rem',
    maxWidth: '90%',
    wordBreak: 'break-word',
    textAlign: 'center',
  },
}

export default App