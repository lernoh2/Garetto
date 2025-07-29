export const SEPOLIA_TOKENS = [
  {
    symbol: "ETH",
    name: "Sepolia ETH",
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    decimals: 18,
    logoURI: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
    chainId: 11155111,
  },
  // {
  //   symbol: "USDT",
  //   name: "Tether USD (Sepolia)",
  //   address: "0xYourSepoliaUSDTAddress",
  //   decimals: 6,
  //   logoURI: "https://tokens.1inch.io/0xdAC17F958D2ee523a2206206994597C13D831ec7.png", // reuse
  //   chainId: 11155111,
  // },
  // {
  //   symbol: "DAI",
  //   name: "Dai Stablecoin (Sepolia)",
  //   address: "0xYourSepoliaDAIAddress",
  //   decimals: 18,
  //   logoURI: "https://tokens.1inch.io/0x6B175474E89094C44Da98b954EedeAC495271d0F.png", // reuse
  //   chainId: 11155111,
  // },
  {
    symbol: "G-ETTO1",
    name: "Garetto1 (Sepolia)",
    address: "0x6eD4a1B8efDe6438C1AE6E92820D2aB981aA90E2",
    decimals: 18,
    logoURI: "logo192.png",
    chainId: 11155111,
  },
  {
    symbol: "G-ETTO2",
    name: "Garetto2 (Sepolia)",
    address: "0xD682aC73f93628FbB78B1400163c286b23635808",
    decimals: 18,
    logoURI: "logo192.png",
    chainId: 11155111,
  },
];

export const DEFAULT_FROM_TOKEN = SEPOLIA_TOKENS.find(t => t.symbol === "G-ETTO1");
export const DEFAULT_TO_TOKEN = SEPOLIA_TOKENS.find(t => t.symbol === "G-ETTO2");
