export function getLevel(usdValue: number) {
  if (usdValue < 100) return { level: 1, title: "Noob Hodler" }
  if (usdValue < 500) return { level: 2, title: "Apprentice Hodler" }
  if (usdValue < 2000) return { level: 3, title: "Crypto Adept" }
  if (usdValue < 10000) return { level: 4, title: "Market Master" }
  return { level: 5, title: "Diamond Whale" }
}