import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

const addresses: string[] = require("../fcfsAddresses.json");

const leaves = [...addresses].map((address) => [address]);
const tree = StandardMerkleTree.of(leaves, ["address"]);

export const createTree = (address: string): StandardMerkleTree<string[]> => {
  const leaves = [...addresses, address].map((address) => [address]);
  return StandardMerkleTree.of(leaves, ["address"]);
};

console.log(tree.root);
