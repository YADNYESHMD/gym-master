const mongoose = require("mongoose");

const sellRequestsSchema = {
    sellerID: String,
    units: Number,
    price: Number,
    metalog: String
}

const sellReq = mongoose.model("sellReq", sellRequestsSchema);

module.exports = sellReq;