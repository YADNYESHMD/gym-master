import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage.js";
import Success from "./Success.js";
import { useAuth0 } from "@auth0/auth0-react";


function Exchange(props){

  const [amt, setAmt] = useState("");
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    props.setError("");
    props.setMsg("");
  
  }, []);


  const hAmt = (event) => {setAmt(event.target.value);}

  const handleSubmit = async(e) => {
    e.preventDefault();
    await props.exchangeTok(amt)
  }
    
    return(
    isAuthenticated &&
    <>
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                name="ether"
                type="number"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
                onChange={hAmt}
                value = {amt}
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          <ErrorMessage message={props.error} />
          <Success txs={props.msg} />
        </footer>
      </div>
    </form>
    </>
    );
}
export default Exchange;