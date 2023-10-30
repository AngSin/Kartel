// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vybz is ERC721A, Ownable {
    address[2] creators = [0xB82C3E63A224Ff8AB687952EDc322df55EFB7248, 0x050C1C3D2E802dD6208Acee28806CC65f35F9327];
    string baseURI = "https://maroon-elderly-sturgeon-206.mypinata.cloud/ipfs/QmbPPveQhiae9LnZXTUJyhv6fDFHcgXG9iMDC5VnTMY5Qr/";

    constructor() ERC721A("Vybz", "VYBZ") Ownable(msg.sender) {}

    function setCreators(address[2] calldata _creators) public onlyOwner {
        creators = _creators;
    }

    function setBaseURI(string calldata __baseURI) public onlyOwner {
        baseURI = __baseURI;
    }

    function mint() public onlyOwner {
        require(super.totalSupply() == 0, "Collection already minted!");
        for (uint256 i = 0; i < creators.length; i++) {
            super._safeMint(creators[i], 50);
        }
    }

    function _baseURI() override internal view virtual returns (string memory) {
        return baseURI;
    }
}
