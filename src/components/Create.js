import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { creatUser } from "../feature/employeeSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [users, setUsers] = useState({});

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(users);
    dispatch(creatUser(users))
      .then(() => {
        navigate("/read");
      })
      .catch((error) => {
        // Handle the error here if needed
      });
  };
  return (
    <div className="container d-flex justify-content-center align-items-center m-4">
      <div className="card w-75 mx-auto shadow">
        <h2 className="card-title text-center mt-3">
          Employee Registration Form
        </h2>
        <div className="card-body">
          <form onSubmit={handleOnSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  className="form-control"
                  onChange={getUserData}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  className="form-control"
                  onChange={getUserData}
                  required
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="DOB"
                  className="form-control"
                  onChange={getUserData}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  name="StartDate"
                  className="form-control"
                  onChange={getUserData}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  name="EndDate"
                  className="form-control"
                  onChange={getUserData}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  name="CurrentSalary"
                  className="form-control"
                  onChange={getUserData}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="Description"
                className="form-control"
                onChange={getUserData}
                style={{
                  fontSize: "14px",
                  textTransform: "capitalize",
                  fontStyle: "italic",
                }}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
