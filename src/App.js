import React, { useState, useEffect } from 'react';
import { JsonRpcProvider } from "ethers";
import { ethers } from "ethers";
import garetto1Abi from './abi/garetto1_abi.json';
import garetto2Abi from './abi/garetto2_abi.json';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const RPCS = [
  "https://ethereum-sepolia.publicnode.com",
  "https://rpc2.sepolia.org"
];

function App() {
  const [contracts] = useState([
    {
      name: 'G-ETTO1 Redistributor',
      address: "0x00c37F9297DFADA6b3bF1A8382b761125E2C3c7e",
      terms: "1 - 100",
      link: "https://testnet.snowtrace.io/address/0x00c37F9297DFADA6b3bF1A8382b761125E2C3c7e/tokentxns",
    },
    {
      name: 'G-ETTO2 Redistributor # 1',
      address: "0xFb5B1Dfbe1bAf3D989F94C18cc2cAe3FdcB1B1C5",
      terms: "1 - 100",
      link: "https://testnet.snowtrace.io/address/0xFb5B1Dfbe1bAf3D989F94C18cc2cAe3FdcB1B1C5/tokentxns",
    },
    {
      name: 'G-ETTO2 Redistributor # 2',
      address: "0x96bcea30Cd7eaF4548214Ec6d65a00c9731A8824",
      terms: "1 - 100",
      link: "https://testnet.snowtrace.io/address/0x96bcea30Cd7eaF4548214Ec6d65a00c9731A8824/tokentxns",
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [redistributions, setRedistributions] = useState({});

  const getContractType = (name) => {
    return name === "G-ETTO1 Redistributor" ? "getto1" : "getto2";
  };

  const getWorkingProvider = async () => {
    for (const url of RPCS) {
      const provider = new JsonRpcProvider(url);
      try {
        await provider.getBlockNumber();
        return provider;
      } catch (err) {
        console.warn(`Provider failed: ${url}`);
      }
    }
    throw new Error("No available RPC providers");
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const provider = await getWorkingProvider();
        const allEvents = [];

        for (const contract of contracts) {
          const type = getContractType(contract.name);
          const abi = type === "getto1" ? garetto1Abi : garetto2Abi;
          const contractInstance = new ethers.Contract(contract.address, abi, provider);

          let data = { ...contract, type };

          if (type === "getto2" || type === "getto1") {
            data.cycleId = (await contractInstance.cycleId()).toString();
            data.tokenBalance = (await contractInstance.tokenBalance()).toString();
          }

          const balanceRaw = await provider.getBalance(contract.address);
          data.balance = ethers.formatEther(balanceRaw);

          allEvents.push(data);
        }

        setEvents(allEvents);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };

    getEvents();
    const interval = setInterval(getEvents, 6000);
    return () => clearInterval(interval);
  }, [contracts]);

  useEffect(() => {
    const DEPLOYMENT_BLOCK = 8849656;
    const lastBlockRef = {};
    let isCancelled = false;

    const fetchRedistributionsForContract = async (contractAddress) => {
      const provider = await getWorkingProvider();
      const latestBlock = await provider.getBlockNumber();

      if (!lastBlockRef[contractAddress]) lastBlockRef[contractAddress] = DEPLOYMENT_BLOCK;
      const fromBlock = Math.max(DEPLOYMENT_BLOCK, lastBlockRef[contractAddress] + 1);
      if (fromBlock > latestBlock) return [];

      const contract = new ethers.Contract(contractAddress, garetto2Abi, provider);
      const MAX_BLOCK_RANGE = 5000;
      let start = fromBlock;
      let allRedisEvents = [];

      while (start <= latestBlock) {
        const end = Math.min(start + MAX_BLOCK_RANGE - 1, latestBlock);
        try {
          const redisChunk = await contract.queryFilter("RedistributionAttempt", start, end);
          allRedisEvents.push(...redisChunk);
        } catch (err) {
          console.warn(`Failed to fetch events from ${start} to ${end}`, err);
        }
        start = end + 1;
      }

      lastBlockRef[contractAddress] = latestBlock;

      const parsedEvents = await Promise.all(
        allRedisEvents.map(async (e) => {
          const block = e.blockNumber ? await provider.getBlock(e.blockNumber) : null;
          return {
            sender: e.args?.from || "0x0",
            random1: e.args?.random1?.toString?.() || "0",
            random2: e.args?.random2?.toString?.() || "0",
            random3: e.args?.random3?.toString?.() || "0",
            transferCount: e.args?.transfersCount?.toString?.() || "0",
            triggered: e.args?.triggered ?? false,
            profitTransferred: e.args?.transferredProfit
              ? ethers.formatEther(e.args.transferredProfit)
              : "0",
            blockNumber: e.blockNumber,
            timestamp: block?.timestamp
              ? new Date(block.timestamp * 1000).toISOString()
              : "Unknown",
            transactionHash: e.transactionHash,
          };
        })
      );

      return parsedEvents;
    };

    const fetchAllRedistributions = async () => {
      if (isCancelled) return;
      const result = {};

      for (const c of contracts) {
        try {
          const events = await fetchRedistributionsForContract(c.address);
          if (events.length > 0 || !redistributions[c.address]) {
            result[c.address] = events;
          } else {
            result[c.address] = redistributions[c.address]; // keep old events
          }
        } catch (e) {
          console.warn(`Error fetching redistributions for ${c.address}`, e);
          result[c.address] = redistributions[c.address] || [];
        }
      }

      if (!isCancelled) {
        setRedistributions(result);
      }
    };

    fetchAllRedistributions();
    const interval = setInterval(fetchAllRedistributions, 15000);
    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [contracts, redistributions]);

  return (
    <div>
      <Header />
    
      <div className='content'>
        <div className='firstBlock'> First Block</div>
          <div className='aboutBlock'>About</div>
        <div className='getto1'>G-ETTO1</div>
        <div className='getto2'>G-ETTO2</div>
        <div className='swapBlock'>SWAP</div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
