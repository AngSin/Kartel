import { deployContract } from "./utils";
import { Kartel, Vybz } from "../typechain-types";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Kartel mint", () => {
  it("should mint let owner mint the remaining supply", async () => {
    const [owner, owner1] = await ethers.getSigners();
    const zaibatsuContract = (await deployContract("Vybz")) as Vybz;
    const vibezKartelContract = (await deployContract("Vybz")) as Vybz;
    await zaibatsuContract.setCreators([owner.address, owner1.address]);
    await zaibatsuContract.mint();
    const kartelContract = (await deployContract("Kartel")) as Kartel;
    // Zaibatsu Mint
    await kartelContract.setZaibatsuAddress(zaibatsuContract.getAddress());
    await kartelContract.setMintStage(3);
    await kartelContract.connect(owner1).zaibatsuMint();
    expect(await kartelContract.totalSupply()).to.equal(1);
    expect(await kartelContract.balanceOf(owner1.address)).to.equal(1);
    // vibez kartel mint
    await vibezKartelContract.setCreators([owner.address, owner1.address]);
    await kartelContract.setMintStage(1);
    await kartelContract.setVibezKartelAddress(
      vibezKartelContract.getAddress(),
    );
    await vibezKartelContract.mint();
    await vibezKartelContract.setApprovalForAll(
      kartelContract.getAddress(),
      true,
    );
    await kartelContract.vibezKartelMint([0, 1]);
    expect(await kartelContract.totalSupply()).to.equal(3); // 1 was minted via zaibatsu mint
    expect(await kartelContract.ownerOf(2)).to.equal(owner.address);
    expect(await kartelContract.ownerOf(3)).to.equal(owner.address);
    expect(await kartelContract.balanceOf(owner.address)).to.equal(2);
    // owner mint
    await kartelContract.setMaxSupply(20);
    await kartelContract.ownerMint();
    expect(await kartelContract.balanceOf(owner.address)).to.equal(19); // 1 went to owner1
  });
});
