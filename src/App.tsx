import React from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import PowerLevel from "./PowerLevel"
import "@solana/wallet-adapter-react-ui/styles.css"
import "./App.css"
import GlitchHeader from "./GlitchHeader"  // 👈 glitch component

const App: React.FC = () => {
  const { publicKey } = useWallet()

  return (
    <div className="app-container">
      {/* 🎨 Background */}
      <div className="background-art" />

      {/* 🔌 Wallet button - top right */}
      <div className="wallet-button">
        <WalletMultiButton />
      </div>

      {/* 💥 Glitch Header */}
      <header className="header-center">
        <GlitchHeader text="CRYPTO" />
      </header>

      {/* 📦 Main content */}
      <main className="content">
        {publicKey ? (
          <>
            <p className="wallet-text">
              ✅ Connected: <strong>{publicKey.toBase58()}</strong>
            </p>
            <PowerLevel />
          </>
        ) : (
          <p className="wallet-text">🔌 Wallet not connected</p>
        )}
      </main>
    </div>
  )
}

export default App