import './table.css';
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage.js"
import Success from "./Success.js"

function Buy(props){

    const { user, isAuthenticated } = useAuth0();

    const [error, setError] = useState("");
    const [amt, setAmt] = useState("");
    const [msg, setMsg] = useState("");
    
    const [sellReqs, setSellReqs]= useState([{
        sellerID:'',
        units:'',
        price:'',
        metalog: ''
    }]);

    useEffect(() => {
        let urladd = "http://localhost:3001/allSellReq";
        axios
        .get(urladd, { params: { sellerID: user.email } })
        .then(res => {
            setSellReqs(res.data);
            console.log(res)
        })
        .catch(err =>{
            setError(err)
        });
    }, []);

    const Purchase = async(add, price, units) => {

        setError("");
        let amt = parseInt(price*units);
        const txn = await props.contract.buy(props.walletAddress,add,amt);
        txn.wait()
        .then(res => {
            if(res.status == 1){
                setMsg("Transaction Successfull");
            }
        })
        .catch(err => setError(err));

        await props.connectWallet();
    };

    return(
    isAuthenticated &&
    <>
    <div>
    <center>
        <br />
        <ErrorMessage message={error} />
        <Success txs={msg} />
        <br />
        <table>
        <thead>
            <tr>
                <th>Seller ID</th>
                <th> Address </th>
                <th>Units in kiloWatts</th>
                <th>Price per Unit in GYM</th>
                <th>Total Payable GYM Token</th>
                <th>Buy</th>
            </tr>
        </thead>
            {sellReqs.map(oneSellReq =>
            <tr>
                <td>{oneSellReq.sellerID}</td>
                <td>{"****"+oneSellReq.metalog.toString().slice(38,42)}</td>
                <td>{oneSellReq.units}</td>
                <td>{oneSellReq.price}</td>
                <td>{oneSellReq.price * oneSellReq.units}</td>
                <td><button className="btn btn-outline btn-success" 
                    onClick = {(e) => {e.preventDefault(); 
                        console.log(oneSellReq.metalog,oneSellReq.price,oneSellReq.units);
                        Purchase(oneSellReq.metalog,oneSellReq.price,oneSellReq.units);
                    }}>Purchase</button>
                </td>
            </tr>
            )}
                
                

            </table>
            </center>
        </div>
    </>
    );
}
export default Buy;