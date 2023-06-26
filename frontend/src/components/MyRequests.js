import './table.css';
import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
 
export default function Buy(){
    
    
    const {user, isAuthenticated } = useAuth0();
    
    const [sellReqs, setSellReqs]= useState([{
        sellerID:'',
        units:'',
        price:''
    }]);

    
    
    useEffect(() => {
        const urladd = "http://localhost:3001/mySellReq";
        axios
        .get(urladd, { params: { sellerID: user.email } })
        .then(res => {
            setSellReqs(res.data)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [])

    return(
        
        isAuthenticated &&
        <center>
        <div>
            <br /><br />
            <table class="table-auto">
                <thead>
                <tr>
                    <th>Seller ID</th>
                    <th>Units in kiloWatts</th>
                    <th>Price Gym Token</th>
                    <th>Delete</th>
                </tr>
                {sellReqs.map(oneSellReq =>
                    <tr>
                        <td>{oneSellReq.sellerID}</td>
                        <td>{oneSellReq.units}</td>
                        <td>{oneSellReq.price}</td>
                        <td><button class="btn btn-outline btn-error">Delete</button></td>
                    </tr>
                    )
                }
                
                </thead>

            </table>
        
        </div>
        </center>


    )
}

