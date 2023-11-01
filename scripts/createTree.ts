import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

// const addresses: string[] = require("./wlAddresses.json");
// const addresses: string[] = [
// 	"0xE03E3F9aD56862184594F95811bD18cDC0Bab495",
// 	"0x1D7d2aA3282d5f70598Aac7A3972a092D7743ef0", // Berk's wallets
// 	"0x4b42AA2c55E7CB2E89539aBe9F2780D9c23Bf222" // Argo's wallet
// ];
const addresses: string[] = [
  "0xE03E3F9aD56862184594F95811bD18cDC0Bab495", // spendthat.eth
  "0x050C1C3D2E802dD6208Acee28806CC65f35F9327", // Springroll
  "0xB82C3E63A224Ff8AB687952EDc322df55EFB7248", // DreadOne
];
const leaves = [...addresses].map((address) => [address]);
const tree = StandardMerkleTree.of(leaves, ["address"]);

export const createTree = (address: string): StandardMerkleTree<string[]> => {
  const leaves = [...addresses, address].map((address) => [address]);
  return StandardMerkleTree.of(leaves, ["address"]);
};

console.log(tree.root);
