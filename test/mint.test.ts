import { deployContract } from "./utils";
import { Kartel, VibezKartel, Vybz } from "../typechain-types";
import { ethers } from "hardhat";
import { expect } from "chai";
import { createTree } from "../scripts/createTree";

describe("Kartel mint", () => {
  it("handles Zaibatsu mint & Vibez Kartel mint", async () => {
    const [owner, owner1] = await ethers.getSigners();
    const zaibatsuContract = (await deployContract("Vybz")) as Vybz;
    const vibezKartelContract = (await deployContract(
      "VibezKartel",
    )) as VibezKartel;
    await zaibatsuContract.setCreators([owner.address, owner1.address]);
    await zaibatsuContract.mint();
    const kartelContract = (await deployContract("Kartel")) as Kartel;
    // Zaibatsu Mint
    await kartelContract.setZaibatsuAddress(zaibatsuContract.getAddress());
    await kartelContract.setMintStage(3);
    await expect(
      kartelContract.connect(owner1).zaibatsuMint([0]),
    ).to.be.revertedWith("You're not the owner of this Zaibatsu!");
    expect(await kartelContract.totalSupply()).to.equal(0);
    expect(await kartelContract.balanceOf(owner1.address)).to.equal(0);
    expect(await zaibatsuContract.ownerOf(50)).to.equal(owner1.address);
    await kartelContract.connect(owner1).zaibatsuMint([50, 51]);
    await expect(
      kartelContract.connect(owner1).zaibatsuMint([51]),
    ).to.be.revertedWith("This Zaibatsu already minted!");
    expect(await kartelContract.balanceOf(owner1.address)).to.equal(2);
    // vibez kartel mint
    await vibezKartelContract.setCost(0);
    await kartelContract.setMintStage(1);
    await kartelContract.setVibezKartelAddress(
      vibezKartelContract.getAddress(),
    );
    await vibezKartelContract.mint(3, { value: 0 });
    await vibezKartelContract.setApprovalForAll(
      kartelContract.getAddress(),
      true,
    );
    await kartelContract.vibezKartelMint([1, 2]);
    expect(await kartelContract.totalSupply()).to.equal(4); // 2 was minted via zaibatsu mint
    expect(await kartelContract.ownerOf(3)).to.equal(owner.address);
    expect(await kartelContract.ownerOf(4)).to.equal(owner.address);
    expect(await kartelContract.balanceOf(owner.address)).to.equal(2);
    // owner mint
    await kartelContract.setMaxSupply(21);
    await kartelContract.ownerMint();
    expect(await kartelContract.balanceOf(owner.address)).to.equal(19); // 2 went to owner1
    expect(await kartelContract.totalSupply()).to.equal(21); // total
  });

  it("handles FCFS & Vibez Kartel mint", async () => {
    const [owner, owner1] = await ethers.getSigners();
    const vibezKartelContract = (await deployContract(
      "VibezKartel",
    )) as VibezKartel;
    const kartelContract = (await deployContract("Kartel")) as Kartel;
    await kartelContract.setVibezKartelAddress(
      vibezKartelContract.getAddress(),
    );
    const tree = createTree(owner.address);
    // FCFS mint
    await kartelContract.setFcfsRoot(tree.root);
    await kartelContract.setMintStage(2);
    await kartelContract.fcfsMint(tree.getProof([owner.address]));
    await expect(
      kartelContract.fcfsMint(tree.getProof([owner.address])),
    ).to.be.revertedWith("You already minted!");
    // VibezKartel Mint
    await kartelContract.setMintStage(1);
    await vibezKartelContract.mint(3, { value: 0 });
    await vibezKartelContract.setApprovalForAll(
      kartelContract.getAddress(),
      true,
    );
    await expect(kartelContract.vibezKartelMint([1, 2, 3])).to.be.revertedWith(
      "You already minted!",
    );
    await kartelContract.vibezKartelMint([1, 2]);
    expect(await kartelContract.balanceOf(owner.address)).to.equal(3);
  });
});
