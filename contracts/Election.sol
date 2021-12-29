// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct Candidate{
   string name;
   uint age;
   uint voteCount;
}

struct Voter{
    string name;
    uint age;
    uint vote;
    bool voted;
}

contract Election{

    address public owner;
    string public electionName;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    uint public totalVotes;

    modifier ownerOnly{
        require(msg.sender == owner,"You dont have rights to perform this operation !");
        _;
    }


    function startElection(string memory _electionName) public {
        owner = msg.sender;
        electionName=_electionName;
    }

    function addCandidate(string memory _name,uint _age) ownerOnly public {
         candidates.push(Candidate(_name,_age,0));
    }

    function vote(uint _voteIndex,uint _age,string memory _name) public {
        require(_age > 18,"You are not eligible for vote !");
        require(!voters[msg.sender].voted,"You are alredy voted !");

        voters[msg.sender].age = _age;
        voters[msg.sender].name = _name;
        voters[msg.sender].vote = _voteIndex;
        voters[msg.sender].voted = true;
        candidates[_voteIndex].voteCount += 1; 
        totalVotes +=1;
    }


    function selectWinner() public view returns (uint selectWinner_){
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                selectWinner_ = p;
            }
        }
    }

    function winnerName() public view returns(string memory winnerName_){
        winnerName_ = candidates[selectWinner()].name;
    }

}

