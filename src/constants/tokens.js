export const ETHEREUM_TOKENS = [
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    decimals: 18,
    logoURI: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
    chainId: 1,
  },

  {
    symbol: "USDT",
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
    logoURI: "https://tokens.1inch.io/0xdAC17F958D2ee523a2206206994597C13D831ec7.png",
    chainId: 1,
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
    logoURI: "https://tokens.1inch.io/0x6B175474E89094C44Da98b954EedeAC495271d0F.png",
    chainId: 1,
  },

  {
    symbol: "G-ETTO1",
    name: "Garetto1",
    address: "0x6eD4a1B8efDe6438C1AE6E92820D2aB981aA90E2",
    decimals: 18,
    logoURI: "logo192.png",
    chainId: 1,
  },
  {
    symbol: "G-ETTO2",
    name: "Garetto2",
    address: "0xD682aC73f93628FbB78B1400163c286b23635808",
    decimals: 18,
    logoURI: "logo192.png",
    chainId: 1,
  },
];

export const DEFAULT_FROM_TOKEN = ETHEREUM_TOKENS.find(t => t.symbol === "G-ETTO1");
export const DEFAULT_TO_TOKEN = ETHEREUM_TOKENS.find(t => t.symbol === "G-ETTO2");