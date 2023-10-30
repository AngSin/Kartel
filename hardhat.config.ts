import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL!!,
      accounts: [process.env.PRIVATE_KEY!!],
    },
    homestead: {
      url: process.env.RPC_URL!!,
      accounts: [process.env.PRIVATE_KEY!!],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY!!,
  },
};

export default config;
