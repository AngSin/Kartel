import { ethers } from "hardhat";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

// const addresses: string[] = require("./wlAddresses.json");
const addresses: string[] = [
  "0xE03E3F9aD56862184594F95811bD18cDC0Bab495",
  "0x1D7d2aA3282d5f70598Aac7A3972a092D7743ef0", // Berk's wallets
  "0x4b42AA2c55E7CB2E89539aBe9F2780D9c23Bf222" // Argo's wallet
];

export const deployContract = async (name: string) => {
  const contractFactory = await ethers.getContractFactory(name);
  return await contractFactory.deploy();
};

export const createNewTree = (newAddresses: string[]) => {
  const leaves = [...addresses, ...newAddresses].map((address) => [address]);
  return StandardMerkleTree.of(leaves, ["address"]);
};
