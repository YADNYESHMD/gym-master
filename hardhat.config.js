require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "G-eSGxCNX9XyXpvVDV6JZPhT9TfdTp24";
const POLYGON_PRIVATE_KEY = "89685c8b4a7afc7ae5c24c0ab24283c57126205d871c0e07ecd6d89039b30051";

module.exports = {
  solidity: "0.8.17",

  networks:{
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      chainId: 80001,
      accounts: [`${POLYGON_PRIVATE_KEY}`],
    },
  }
};
