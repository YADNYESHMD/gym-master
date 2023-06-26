import {useEffect} from "react";
import { ethers } from "ethers";


function Metabar(props) {
    
    let meta = "";
    let eth = "";
    let gym = "";

    if(props.walletAddress != ""){
        meta = props.walletAddress;
        eth = parseInt(props.ethBal);
        gym = parseInt(props.gymBal);
    }

    else{
        meta = "Connect Wallet";
        eth = "---";
        gym = "---";
    }
    
    useEffect(() => {

        props.connectWallet();
        props.getCurrentWalletConnected();
        props.addWalletListener();
        
    }, []);

    useEffect(() => {
        const func = async() => {
            if(props.walletAddress){
                props.provider.getBalance(props.walletAddress).then(balanceResult => {
                props.setEthBal(ethers.utils.formatEther(balanceResult));
            })
            }
        }
        func();
    }, [props.walletAddress , props.ethBal]);
    
    useEffect(() => {
        const func = async() => {
            if(props.contract){
                const _gymBal = await props.contract.balanceOf(props.walletAddress);
                props.setGymBal(_gymBal.toNumber());
            }
        }
        func();
    }, [props.contract, props.gymBal, props.walletAddress]);
    


    return(
        <>
            <div className="navbar bg-base-100 bg-warning">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl" onClick={()=>{props.connectWallet()}}>MetaMask</a>
                <a className="btn btn-ghost normal-case " onClick={(e)=>{
                    e.preventDefault();
                    props.connectWallet();
                    }}>{meta}</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                <li><a className="btn btn-ghost normal-case ">Matic : {eth} </a></li>
                <li><a className="btn btn-ghost normal-case ">GYM : {gym} </a></li>
                </ul>
            </div>
            </div>
        </>
    )

}
export default Metabar;