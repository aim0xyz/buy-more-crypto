import React, { useEffect, useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { getSolBalance } from './utils/getBalance'
import { getSolPriceUSD } from './utils/getSolPrice'
import { getLevel } from './utils/levelSystem'

const PowerLevel: React.FC = () => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const [usdValue, setUsdValue] = useState<number | null>(null)

  useEffect(() => {
    const fetchPowerLevel = async () => {
      if (!publicKey) return
      try {
        const solBalance = await getSolBalance(connection, publicKey) // 1) balance in SOL
        const solPrice = await getSolPriceUSD() // 2) current price
        const value = solBalance * solPrice
        setUsdValue(value)
      } catch (err) {
        console.error('Error fetching power level:', err)
      }
    }

    fetchPowerLevel()
  }, [connection, publicKey])

  if (!publicKey) return <p>🔌 Connect your wallet to see Power Level</p>

  if (usdValue === null) return <p>Loading your stats...</p>

  const { level, title } = getLevel(usdValue)

  return (
    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
      <h2>⚡ Your Power Level</h2>
      <p style={{ fontSize: '1.5rem' }}>{usdValue.toFixed(2)} USD 💪</p>
      <p style={{ fontSize: '1.2rem', color: '#4ade80' }}>
        Lvl {level}: {title}
      </p>
    </div>
  )
}

export default PowerLevel