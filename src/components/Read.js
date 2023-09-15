import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "../feature/employeeSlice";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();
  const { users, isLoading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isLoading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  // Check if searchData is defined before using it
  const filteredUsers = users
    ? users.filter((user) =>
        (user.FirstName + " " + user.LastName)
          .toLowerCase()
          .includes(searchData.toLowerCase())
      )
    : [];

  const handleDeleteUser = (id) => {
    // Dispatch the deleteUser action and pass the user ID
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h2 className="text-center mt-3">Employee List</h2>
      <table className="table table-bordered table-hover">
        <thead className="table">
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {user.FirstName} {user.LastName}
              </td>
              <td>{user.DOB}</td>
              <td>{user.StartDate}</td>
              <td>{user.EndDate}</td>
              <td>{user.Description}</td>
              <td>
                <Link to={`/user/${user.id}`} className="btn btn-success mx-1">
                  View
                </Link>
                <Link to={`/edit/${user.id}`} className="btn btn-primary mx-1">
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="btn btn-danger mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
