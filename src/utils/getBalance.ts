import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

// Fetch SOL balance in SOL (not lamports)
export async function getSolBalance(
  connection: Connection,
  wallet: PublicKey
): Promise<number> {
  const lamports = await connection.getBalance(wallet)
  return lamports / LAMPORTS_PER_SOL
}