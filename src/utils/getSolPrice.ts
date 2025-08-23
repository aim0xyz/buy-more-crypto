// Fetch current SOL price in USD (CoinGecko API)
export async function getSolPriceUSD(): Promise<number> {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
  )
  const json = await res.json()
  return json.solana.usd as number
}