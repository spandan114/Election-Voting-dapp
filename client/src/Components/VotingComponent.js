import React from "react";

const VotingComponent = ({
  switchAdmin,
  account,
  electionName,
  candidateList,
  voteCandidate,
}) => {
  const adminAddress = "0xa6444D6adbfD1CD860d430CfDa9bD9b1d4343e4f";

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <p className="election-name">
          <i className="fas fa-vote-yea fa-2x p-1"></i>
          {electionName}
        </p>
        {account === adminAddress ? (
          <button
            type="button"
            className="btn btn-link"
            onClick={() => switchAdmin("Admin")}
          >
            Admin
          </button>
        ) : (
          <p className="my-auto">{account}</p>
        )}
      </div>
      <div className="card-body">
        {candidateList
          ? candidateList.map((data, i) => (
              <div
                className="candidate-card d-flex justify-content-between"
                key={i}
              >
                <p className="candidate-name">
                  <i className="fas fa-user-tie p-1 fa-2x"></i>
                  {data.name} ({data.voteCount})
                </p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => voteCandidate(i)}
                >
                  Vote
                </button>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default VotingComponent;
