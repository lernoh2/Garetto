import { FusionSDK, NetworkEnum, PrivateKeyProviderConnector } from '@1inch/fusion-sdk';
import { ethers } from 'ethers';
import { G_ETTO1, G_ETTO2 } from './tokens.js';

export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

const privateKey = '243333d1d3399b3479cc6ee6b00680751957c8d2e70b703c6aba587b1b80a8fd';
const providerUrl = 'https://rpc.ankr.com/eth_sepolia';
const fusionApiKey = 'PzC8BIDcIHJTk497EHR0JN8WGzlhGh7i';

export async function swapTokens(fromTokenAddress, toTokenAddress, amountInDecimal, decimals) {
  const connector = new PrivateKeyProviderConnector(
    privateKey,
    new ethers.providers.JsonRpcProvider(providerUrl)
  );

  const sdk = new FusionSDK({
    url: 'https://api.1inch.dev/fusion',
    network: NetworkEnum.SEPOLIA,
    authKey: fusionApiKey,
    connector: connector,
  });

  const amount = ethers.utils.parseUnits(amountInDecimal.toString(), decimals).toString();

  const order = await sdk.placeOrder({
    fromTokenAddress,
    toTokenAddress,
    amount,
    walletAddress: connector.address,
    validUntil: Math.floor(Date.now() / 1000) + 1800,
  });

  console.log('Order placed:', order);
}
