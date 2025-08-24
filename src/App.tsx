import React, { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import PowerLevel from "./PowerLevel"
import "@solana/wallet-adapter-react-ui/styles.css"
import "./App.css"
import GlitchHeader from "./GlitchHeader"  // glitch component

interface Player {
  name: string
  points: number
}

const App: React.FC = () => {
  const { publicKey } = useWallet()

  // --- Points & Leaderboard state ---
  const [playerPoints, setPlayerPoints] = useState(0)
  const [leaderboard, setLeaderboard] = useState<Player[]>([
    { name: "Wallet 0x123…", points: 3200 },
    { name: "Wallet 0x456…", points: 2990 },
    { name: "Wallet 0x789…", points: 2840 },
  ])
  const [completed, setCompleted] = useState<string[]>([])

  // Example tasks
  const missions = [
    { id: "tutorial", name: "Complete Tutorial", points: 50 },
    { id: "invite", name: "Invite a Friend", points: 100 },
    { id: "insights", name: "Read Daily Insights", points: 25 },
  ]
  const dailyTasks = [
    { id: "login", name: "Login Today", points: 10 },
    { id: "market", name: "Check Market Dashboard", points: 15 },
    { id: "hold", name: "Post 'HOLD STRONG' in chat", points: 20 },
  ]

  // Handle claiming a task
  function claimTask(id: string, points: number) {
    if (completed.includes(id)) return
    setCompleted([...completed, id])
    setPlayerPoints((prev) => prev + points)

    setLeaderboard((prev) => {
      const walletName = publicKey ? publicKey.toBase58().slice(0, 6) + "…" : "You"
      const idx = prev.findIndex((p) => p.name === walletName)
      let updated: Player[]
      if (idx === -1) {
        updated = [...prev, { name: walletName, points }]
      } else {
        updated = [...prev]
        updated[idx].points += points
      }
      return updated.sort((a, b) => b.points - a.points).slice(0, 50)
    })
  }

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
              Connected: <strong>{publicKey.toBase58()}</strong>
            </p>
            <PowerLevel />

            {/* --- Missions --- */}
            <section id="missions">
              <h2>🎯 Missions</h2>
              <ul>
                {missions.map((m) => (
                  <li key={m.id}>
                    {m.name} — +{m.points} pts
                    <button onClick={() => claimTask(m.id, m.points)} disabled={completed.includes(m.id)}>
                      {completed.includes(m.id) ? "Claimed" : "Claim"}
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* --- Daily Tasks --- */}
            <section id="tasks">
              <h2>📅 Daily Tasks</h2>
              <ul>
                {dailyTasks.map((t) => (
                  <li key={t.id}>
                    {t.name} — +{t.points} pts
                    <button onClick={() => claimTask(t.id, t.points)} disabled={completed.includes(t.id)}>
                      {completed.includes(t.id) ? "Claimed" : "Claim"}
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* --- Leaderboard --- */}
            <section id="leaderboard">
              <h2>🏆 Leaderboard</h2>
              <ol>
                {leaderboard.map((p, i) => (
                  <li key={i}>{p.name} — {p.points} pts</li>
                ))}
              </ol>
              <p className="note">Top 50 holders earn bonus rewards!</p>
            </section>

            {/* --- HOLD STRONG Concept --- */}
            <section id="holdstrong">
              <h2>💎 HOLD STRONG</h2>
              <p>
                The longer you <strong>hold your tokens</strong> without selling, the more points
                you accumulate.  
              </p>
              <p>
                Buying when the market dips? You get rewarded even more.  
                Selling in panic? Zero extra points!
              </p>
              <p>
                Only the strongest diamond hands climb the leaderboard 🏆
              </p>
            </section>
          </>
        ) : (
          <p className="wallet-text">🔌 Wallet not connected</p>
        )}
      </main>
    </div>
  )
}

export default App