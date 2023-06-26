//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Token is ERC20,Ownable {

    constructor() ERC20("Gym","GYM"){
        _mint(msg.sender,1000000);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    } 

    // mappings 
    // 1. Money transfer 
    // 2. Electricity Transfer 

    struct transaction{
        address from;
        address to;
        uint dt;
    }

    uint256 public i = 1;
    uint256 public j = 1;

    
    mapping(uint => transaction) public money;
    mapping(uint => transaction) public electricity;

    function exchange(address to, uint256 amt) public {

        _transfer(owner(),to,amt*1000);
        
    }

    function buy(address from, address to, uint256 amt) public {

        require(balanceOf(from) > amt, "User Balance is Low");
        require(from != owner(), "You Cannot Buy from Contract Deployer");
        require(to != owner(), "Contract Deployer Cannot Buy ");


        _transfer(from,to,amt);

        money[i] = transaction(from,to,amt);
        i++;
    }

    function electricityTranfer(address from, address to, uint256 amt) public {
        electricity[j] = transaction(from,to,amt);
        j++;
    }


}

