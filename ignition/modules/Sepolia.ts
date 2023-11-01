import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Sepolia -> Springroll", (m) => {
  const vibezKartel = m.contract("VibezKartel");
  const kartel = m.contract("Kartel");
  const zaibatsu = m.contract("Vybz");

  // Zaibatsu mint
  m.call(zaibatsu, "setCreators", [
    "0x1D7d2aA3282d5f70598Aac7A3972a092D7743ef0", // Berk's wallets
    "0x4b42AA2c55E7CB2E89539aBe9F2780D9c23Bf222", // Argo's wallet
  ]);
  m.call(zaibatsu, "mint");

  m.call(kartel, "setVibezKartelAddress", [vibezKartel]);
  m.call(kartel, "setZaibatsuAddress", [zaibatsu]);

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
