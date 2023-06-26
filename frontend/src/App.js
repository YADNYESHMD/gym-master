import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import { useAuth0 } from "@auth0/auth0-react";


import {
  BrowserRouter,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Contract Import 
import TokenArtifact from "./contracts/Token.json";
import contractAddress from "./contracts/contract-address.json";

// import components
import Metabar from "./components/Metabar.js";
import Exchange from "./components/Exchange.js";
import MyAccount from "./components/MyAccount.js";
import Buy from "./components/Buy.js";
import Sell from "./components/Sell.js";
import MyRequests from "./components/MyRequests.js";



function App() {

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const [errorMessage, setErrorMessage] = useState(null);
	const [ethBal, setEthBal] = useState(null);
	const [gymBal, setGymBal] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [msg,setMsg] = useState("");
  const [error,setError] = useState("");

  const updateBal = async() => {
    provider.getBalance(walletAddress)
    .then(balanceResult => {
      setEthBal(ethers.utils.formatEther(balanceResult));
    });

    contract.balanceOf(walletAddress)
    .then(res => {
      console.log(res);
      res.toNumber()
      setGymBal(res.toNumber());
      
    })
    .catch(err => console.log(err));
  }
  const connectWallet = async() => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        // set ethers provider
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider); 

        await _provider.send("eth_requestAccounts", []);
        const _signer = _provider.getSigner();
        setSigner(_signer);

        const _add = await _signer.getAddress();
        setWalletAddress(_add);

        const _contract = new ethers.Contract(
          contractAddress.Token,
          TokenArtifact.abi,
          _signer
        );
        setContract(_contract);

        
        
      } 
      catch (err) {
        setErrorMessage(err.message);
      }
    } else {
      /* MetaMask is not installed */
      setErrorMessage("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setWalletAddress(accounts[0]); 
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      setEthBal("");
      setGymBal("");

      console.log("MetaMask Disconnected");
    }
  };

  const exchangeTok = async(amt) => {
    try {

      const tx = await signer.sendTransaction({
        to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        value: ethers.utils.parseEther(amt)
      });

      tx.wait().then(res => {
        if(res.status == 1)
        {
          setMsg("We got your Money");
        } 
      }).catch(err => {
        setError(err);
      });
  
      let tok = parseInt(amt);
      const txn = await contract.exchange(walletAddress,tok);
      txn.wait().then(res => {
        if(res.status == 1)
        {
          setMsg("Token have been sent to your wallet");
        }
      }).catch(err => setError(err));
  
      updateBal().then(res => {console.log("Balance Updates")}).catch(err => {"Could Not Update Balance"});
      
    } catch (error) {
      setError(error.message.slice(0,25));
    }
  }
  
  


  return (
    <div className="App"> 
      
      <BrowserRouter>
      {isAuthenticated ? (
  <>
      <div className="navbar bg-neutral text-white ">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Hello User</a> 
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/"} >
              MyAccount
            </Link>
          </a>
          </li>
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/exchange"} >
              Exchange
            </Link>
            </a>
          </li>
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/buy"} >
              Buy
            </Link>
            </a>
          </li>
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/sell"} >
              Sell
            </Link>
            </a>
          </li>
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/myrequests"} >
              MyRequests
            </Link>
            </a>
          </li>
          <li>
          <button className="btn btn-ghost normal-case text-xl" onClick={() => logout({ returnTo: window.location.origin })}>
                            LOG OUT
          </button>
          </li>
        </ul>
      </div>
      </div>
      <Metabar walletAddress={walletAddress} ethBal={ethBal} gymBal={gymBal} setEthBal={setEthBal} setGymBal={setGymBal}
      connectWallet={connectWallet} getCurrentWalletConnected={getCurrentWalletConnected} 
      addWalletListener={addWalletListener} provider={provider} contract={contract} />
      
</>
  ) : (
  <>
   <div className="navbar-center bg-neutral text-white ">
   <div className="flex-1">
      <button className="btn btn-ghost normal-case text-xl" onClick={() => loginWithRedirect()}>
          LOG IN or SIGN UP
      </button>
    </div>
      
    </div>
  </>
  )
  }
      <Routes>
        <Route 
          path = "/"
          element = {<MyAccount />}
        />
        <Route 
          path = "/exchange"
          element = {<Exchange exchangeTok={exchangeTok} error={error} msg={msg} setError={setError} setMsg={setMsg} />}
        />
        <Route 
          path = "/buy"
          element = {<Buy walletAddress={walletAddress} contract={contract} connectWallet={connectWallet} />}
        />
        <Route 
          path = "/sell"
          element = {<Sell walletAddress={walletAddress}/>}
        />
        <Route 
          path = "/myrequests"
          element = {<MyRequests />}
        />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
