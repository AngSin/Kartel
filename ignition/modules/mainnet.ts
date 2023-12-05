import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("mainnet", (m) => {
  const kartel = m.contract("Kartel");
  return { kartel };
});
