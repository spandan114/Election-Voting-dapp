import React,{useState} from "react";

const AdminComponent = ({startElection}) => {

    const [electionName, setElectionName] = useState()
    const start = (e) =>{
        e.preventDefault()
        startElection(electionName)
    }

  return (
    <div className="p-3 admin">
      <ul
        className="nav nav-pills justify-content-center"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="create-election-tab"
            data-bs-toggle="tab"
            data-bs-target="#create-election"
            type="button"
            role="tab"
            aria-controls="create-election"
            aria-selected="true"
          >
            Create election
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="add-candidate-tab"
            data-bs-toggle="tab"
            data-bs-target="#add-candidate"
            type="button"
            role="tab"
            aria-controls="add-candidate"
            aria-selected="false"
          >
            Add candidate
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="create-election"
          role="tabpanel"
          aria-labelledby="create-election-tab"
        >
          <form onSubmit={(e) => start(e)}>
            <div className="mb-3">
              <label className="form-label text-start">Election name</label>
              <input type="text" className="form-control" onChange={e=>setElectionName(e.target.value)} required/>
            </div>
            <button type="submit" className="btn btn-success btn-block">
              Create Election
            </button>
          </form>
        </div>
        <div
          className="tab-pane fade"
          id="add-candidate"
          role="tabpanel"
          aria-labelledby="add-candidate-tab"
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label text-start">Candidate name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label text-start">Candidate age</label>
              <input type="number" className="form-control" />
            </div>
            <button type="submit" className="btn btn-success btn-block">
              Add candidate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
