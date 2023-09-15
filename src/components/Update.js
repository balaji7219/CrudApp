import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../feature/employeeSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState();
  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = users.find((item) => item.id === parseInt(id)); // Parse id to an integer
      if (singleUser) {
        setUpdateData(singleUser);
      }
    }
  }, [id, users]);

  const handleUpdate = (e) => {
    e.preventDefault();
   
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card w-50 mx-auto shadow">
        <h2 className="card-title text-center mt-3">Update User</h2>
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="FirstName"
                className="form-control"
                value={updateData && updateData.FirstName}
                onChange={handleInputChange}
              />

              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="LastName"
                className="form-control"
                value={updateData && updateData.LastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="DOB"
                className="form-control"
                value={updateData && updateData.DOB}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="StartDate"
                className="form-control"
                value={updateData && updateData.StartDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="EndDate"
                className="form-control"
                value={updateData && updateData.EndDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Salary</label>
              <input
                type="number"
                name="CurrentSalary"
                className="form-control"
                value={updateData && updateData.CurrentSalary}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="Description"
                className="form-control"
                value={updateData && updateData.Description}
                onChange={handleInputChange}
              ></textarea>
             
            </div>

            <button type="Submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
