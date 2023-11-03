import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

export default buildModule("Argo", (m) => {
  const vibezKartel = m.contract("VibezKartel");
  const kartel = m.contract("Kartel");
  const zaibatsu = m.contract("Vybz");

  // Zaibatsu mint
  m.call(zaibatsu, "setCreators", [
    [
      "0x050C1C3D2E802dD6208Acee28806CC65f35F9327", // Springroll's wallets
      "0x1D7d2aA3282d5f70598Aac7A3972a092D7743ef0", // Argo's wallet
    ],
  ]);
  const addresses: string[] = [
    "0xE03E3F9aD56862184594F95811bD18cDC0Bab495", // spendthat.eth
    "0x050C1C3D2E802dD6208Acee28806CC65f35F9327", // Springroll
    "0x1D7d2aA3282d5f70598Aac7A3972a092D7743ef0", // Argo
  ];
  const leaves = [...addresses].map((address) => [address]);
  const tree = StandardMerkleTree.of(leaves, ["address"]);
  m.call(zaibatsu, "mint");

  // setters
  m.call(kartel, "setVibezKartelAddress", [vibezKartel]);
  m.call(kartel, "setZaibatsuAddress", [zaibatsu]);
  m.call(kartel, "setFcfsRoot", [tree.root]);

  // transferring ownership to Argo
  m.call(kartel, "transferOwnership", [
    "0x1D7d2aA3282d5f70598Aac7A3972a092D7743ef0",
  ]);
  m.call(zaibatsu, "transferOwnership", [
    "0x1D7d2aA3282d5f70598Aac7A3972a092D7743ef0",
  ]);
  m.call(vibezKartel, "transferOwnership", [
    "0x1D7d2aA3282d5f70598Aac7A3972a092D7743ef0",
  ]);

  return { kartel, vibezKartel };
});
