import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../feature/employeeSlice";
import { useParams, Link } from "react-router-dom"; // Import Link from React Router

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.app);

  console.log("data..", users);

  // Use a separate state to store the selected user
  const selectedUser = useSelector((state) =>
    state.app.users.find((user) => user.id === parseInt(id))
  );

  useEffect(() => {
    if (id && !selectedUser) {
      // Fetch the user only if it's not already in the state
      dispatch(getUserById(parseInt(id)));
    }
  }, [id, dispatch, selectedUser]);

  if (!selectedUser) {
    return <h2 className="text-center">Loading user details...</h2>;
  }

  return (
    <div>
      <h2 className="card-title text-center mt-3">User Details</h2>
      <div className="container w-50">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Name:</strong> {selectedUser.FirstName}{" "}
                  {selectedUser.LastName}
                </h5>
                <div className="info-container">
                  <p className="info-item">
                    <strong>DOB:</strong> {selectedUser.DOB}
                  </p>
                  <p className="info-item">
                    <strong>Start Date:</strong> {selectedUser.StartDate}
                  </p>
                  <p className="info-item">
                    <strong>End Date:</strong> {selectedUser.EndDate}
                  </p>
                  <p className="info-item">
                    <strong>Current Salary:</strong>{" "}
                    {selectedUser.CurrentSalary}
                  </p>
                  <p className="info-item">
                    <strong>Description:</strong> {selectedUser.Description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/read" className="btn btn-primary mt-3 ">
          Back to Read Page
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
