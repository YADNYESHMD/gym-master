import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorMessage from "./ErrorMessage.js";
 
export default function MyAccount(props){
    const { user, isAuthenticated } = useAuth0();
    return(
        isAuthenticated &&
        <div>
           <br/>
            <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
                <h1 className="text-xl font-semibold text-gray-700 text-center">
                    Account Details
                </h1>
                <br/>
                <button
                    type="submit"
                    className="btn btn-info submit-button focus:ring focus:outline-none w-full"
                >
                    Email Id: {user.email}
                </button>
                <br/><br/>
                <button
                    type="submit"
                    className="btn btn-info submit-button focus:ring focus:outline-none w-full"
                >
                    Smart Meter: XXXXXXXXXXX
                </button>
                <br/><br/>
                <button
                    type="submit"
                    className="btn btn-info submit-button focus:ring focus:outline-none w-full"
                >
                    Grid Code: 1010101010
                </button>
                
            </div>
            <ErrorMessage message={props.error} />
        </div>
    )
}
    