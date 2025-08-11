import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contractABI = JSON.parse(import.meta.env.VITE_CONTRACT_ABI || '[]');

function App() {
  const [account, setAccount] = useState();
  const [stake, setStake] = useState('');
  const [txStatus, setTxStatus] = useState('');
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    if (account) {
      updateBalance();
    }
  }, [account]);

  async function connectWallet() {
    if (!window.ethereum) {
      alert('Wallet not found');
      return;
    }
    const [addr] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(addr);
  }

  function getContract(signer) {
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  async function updateBalance() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const bal = await provider.getBalance(account);
    setBalance(ethers.formatEther(bal));
  }

  async function createOrJoin() {
    if (!stake) return;
    setTxStatus('pending');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.createOrJoinMatch({ value: ethers.parseEther(stake) });
      await tx.wait();
      setTxStatus('success');
      updateBalance();
    } catch (err) {
      console.error(err);
      setTxStatus('error');
    }
  }

  async function handleEndGame(winner) {
    setTxStatus('pending');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      let tx;
      if (winner) {
        tx = await contract.declareWinner(winner);
      } else {
        tx = await contract.refundDraw();
      }
      await tx.wait();
      setTxStatus('success');
      updateBalance();
    } catch (err) {
      console.error(err);
      setTxStatus('error');
    }
  }

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Account: {account}</p>
          <p>Balance: {balance} ETH</p>
          <input
            placeholder="Stake in ETH"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
          />
          <button onClick={createOrJoin}>Create/Join Match</button>
          <button onClick={() => handleEndGame(account)}>Declare Winner</button>
          <button onClick={() => handleEndGame(null)}>Refund Draw</button>
          <p>Transaction status: {txStatus}</p>
        </div>
      )}
    </div>
  );
}

export default App;

