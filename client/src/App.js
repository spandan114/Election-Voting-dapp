import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import Election from "./contracts/Election.json";
import VotingComponent from "./Components/VotingComponent";
import AdminComponent from "./Components/AdminComponent";

const App = () => {
  const [Loader, setLoader] = useState(true);
  const [electionContract, setElectionContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [electionName, setElectionName] = useState("");
  const [candidateList, setCandidateList] = useState(null);
  const [component, setComponent] = useState("User");

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
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setAccount(account)
    //get network id
    const networkId = await web3.eth.net.getId();
    //get network id details from abi
    const electionData = Election.networks[networkId];
    if (electionData) {
      //connect smart contract with web3
      setLoader(false)
      const election = new web3.eth.Contract(
        Election.abi,
        electionData.address
      );
      setElectionContract(election)
      
      //await election.methods.startElection("abcd voting").send({ from: account })
      const candidates = await election.methods.getAllCandidate().call();
      const electionName = await election.methods.electionName().call();
      if(candidates){
        setCandidateList(candidates)
      }
      if(electionName){
        setElectionName(electionName)
      }
    } else {
      alert("wallet not connected");
    }
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const startElection= async(electionName) =>{
    await electionContract.methods.startElection(electionName)
    .send({ from: account })
    .on('transactionHash', function(hash){
      console.log("Election start")
      console.log(hash)
    })
  }

  const addCandidate= async(name,age) =>{
    await electionContract.methods.addCandidate(name,age)
    .send({ from: account })
    .on('transactionHash', function(hash){
      console.log("candidate added")
      console.log(hash)
    })
  }

  const voteCandidate= async(candidateId) =>{
    await electionContract.methods.vote(candidateId)
    .send({ from: account })
    .on('transactionHash', function(hash){
      console.log("candidate added")
      console.log(hash)
    })
    .on('error', function(error){ 
      console.log(error)
    })
  }

  if(Loader){
    return <p>Loading</p>
  }else{
  return (
    <div className="App">
      <div className="App-header">
        <div className="card ">
          {
            component === "Admin"?
            <AdminComponent 
            startElection={startElection}
            addCandidate={addCandidate}
            />
            :
            <VotingComponent 
            electionName={electionName}
            switchAdmin={setComponent}
            account={account}
            candidateList={candidateList}
            voteCandidate={voteCandidate}
            />
          }

        </div>
      </div>
    </div>
  );
        }
};

export default App;
