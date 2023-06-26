const express = require("express");
const { userConfig } = require("hardhat");
const router = express.Router();
const sellReq = require("../models/sellReqModel");


router.route("/createSellReq").post((req, res) => {
    const sellerID = req.body.sellerID;
    const units = req.body.units;
    const price = req.body.price;
    const metalog = req.body.metalog;

    const newSellReq = new sellReq({
        sellerID,
        units,
        price,
        metalog
    });

    newSellReq.save();

})

router.route("/allSellReq").get((req, res) => {
    sellReq.find({sellerID: {$ne : req.query.sellerID}})
           .then(foundSellReq => res.json(foundSellReq))
})

router.route("/mySellReq").get((req, res) => {
    sellReq.find({sellerID: req.query.sellerID})
           .then(foundSellReq => res.json(foundSellReq))
})

module.exports = router;