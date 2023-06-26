import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage.js";
import Success from "./Success.js"

export default function Sell(props){
    
    const { user, isAuthenticated } = useAuth0();
    
    const[units,setUnits] = useState();
    const[price,setPrice] = useState();
    const[msg,setMsg] = useState("");
    const[error,setError] = useState("");




    const hUnits = (event) => {setUnits(event.target.value);}
    const hPrice = (event) => {setPrice(event.target.value);}


    function handleSubmit(event){
        event.preventDefault();
        const newSellReq = {
            sellerID: user.email,
            units: units,
            price: price,
            metalog: props.walletAddress
        }

        let urladd = "http://localhost:3001/createSellReq";
        axios.post(urladd, newSellReq).then(res => {setMsg(res);
        console.log(res);}).catch(err => {setError(err)});
        setMsg("Request Successfully added")
        setUnits("");
        setPrice("");

    }

    return(
        
        isAuthenticated &&
        <>
        
        <form className="m-4" onSubmit={handleSubmit}>
            <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
                <main className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-gray-700 text-center">
                    Sell Electricity
                </h1>
                <br />
                <div className="">
                    <div className="my-3">
                    <label>Enter Units To Be Sold</label>
                    <input
                        required
                        onChange={hUnits}
                        name="units"
                        value={units}
                        type="number"
                        className="input input-bordered block w-full focus:ring focus:outline-none"
                        placeholder="Eg 10 or 20"
                    />
                    </div>
                    <div className="my-3">
                    <label>Enter Price Per Watt In GYM</label>
                    <input
                        required
                        onChange={hPrice}
                        name="price"
                        value={price}
                        type="number"
                        className="input input-bordered block w-full focus:ring focus:outline-none"
                        placeholder="Enter only a number"
                    />
                    </div>
                </div>
                </main>
                
                <footer className="p-4">
                <button
                    type="submit"
                    className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                >
                    Post request
                </button>
                </footer>
            </div>
        </form>
        
        <br />
        <ErrorMessage message={error} />
        <Success txs={msg} />
        <br />
        
        </>
    
    
    )
}