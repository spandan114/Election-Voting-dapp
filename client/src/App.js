import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Web3 from "web3";
import Election from './contracts/Election.json'

const App = () => {

  const loadWeb3 = async () => {
    //connect web3 with http provider
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts =await web3.eth.getAccounts();
    const account = accounts[0]
    //get network id
    const networkId = await web3.eth.net.getId()
    //get network id details from abi
    const electionData = Election.networks[networkId]
    if(electionData){
      
      //connect smart contract with web3
      const election = new web3.eth.Contract(Election.abi,electionData.address);
      //await election.methods.startElection("abcd voting").send({ from: account })
      const owner =await election.methods.getAllCandidate().call()
      console.log(owner) 
    }else{
      alert("wallet not connected")
    }
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
