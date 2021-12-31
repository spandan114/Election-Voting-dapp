import React from 'react'

const VotingComponent = ({switchAdmin,account,electionName}) => {
    const adminAddress = "0xBE734bc0B08a7640669304a2959e78b3b27c33F0"
    return (
        <>
        <div className="card-header d-flex justify-content-between">
          <p className="election-name">
            <i className="fas fa-vote-yea fa-2x p-1"></i>{electionName}
          </p>
          {
              account === adminAddress?
              <button type="button" className="btn btn-link" onClick={()=>switchAdmin("Admin")}>
              Admin
            </button>
            :
              <p className='my-auto'>{account}</p>
          }

        </div>
        <div className="card-body">
          <div className="candidate-card d-flex justify-content-between">
            <p className="candidate-name">
              <i className="fas fa-user-tie p-1 fa-2x"></i>Candidate name (20)
            </p>
            <button type="button" className="btn btn-success">
              Vote
            </button>
          </div>
          <div className="candidate-card d-flex justify-content-between">
            <p className="candidate-name">
              <i className="fas fa-user-tie p-1 fa-2x"></i>Candidate name (20)
            </p>
            <button type="button" className="btn btn-success">
              Vote
            </button>
          </div>
        </div>
        </>
    )
}

export default VotingComponent
