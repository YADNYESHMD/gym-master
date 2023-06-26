const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

//connect to mongoose
var conn_str = "mongodb+srv://mitalirathod:Mitali123@cluster0.9q3z7mf.mongodb.net/p2p?retryWrites=true&w=majority";

mongoose.connect(conn_str, {
	useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(`No connection`);
})

//require route
app.use("/", require("./routes/Route"));

app.listen(3001, function(){
    console.log("Express server is running on port 3001");
})

//npx hardhat --network localhost run scripts/deploy.js