// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    mapping( address => bool ) blocked_users;
    uint256 totalWaves;
    constructor() payable {
        console.log("Hi, it's me Mahesh");
    }

    event gotWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waveFrom;
        string message;
        uint256 timestamp;
    }


    Wave[] waves;

    function wave(string memory _message) public {
        if(blocked_users[msg.sender] == true){
            console.log("Ahh...! this user is blocked, sorry bro :)");
            return;
        }
        totalWaves += 1;
        console.log("%s has been waved at you ;)",msg.sender);
        waves.push(Wave(msg.sender,_message,block.timestamp));

        emit gotWave(msg.sender, block.timestamp, _message);


        uint256 prizeAmount = 0.0001 ether;
    require(
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has."
    );
    (bool success, ) = (msg.sender).call{value: prizeAmount}("");
    require(success, "Failed to withdraw money from contract.");
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have total %d waves !!!!!!!", totalWaves);
        return totalWaves;
    }

    function block_user() public {
        blocked_users[msg.sender] = true;
        console.log("Blocked user %s",msg.sender);
    }

    function check_blocked() public view returns(bool) {
        console.log("User %s is blocked ?! %s", msg.sender, blocked_users[msg.sender]);
        return blocked_users[msg.sender];
    }

    function unblock_user() public {
        blocked_users[msg.sender] = false;
        console.log("Unblocked user %s",msg.sender);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}