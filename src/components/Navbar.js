import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../feature/employeeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  return (
    <nav className="navbar navbar-dark bg-dark text-white">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          CrudAPP
        </Link>

        <Link to="/" className="nav-link">
          New Employee
        </Link>
        <Link to="/Read" className="nav-link">
           Employee{/* All Post {allUsers.length} */}
        </Link>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Employee Name"
            aria-label="Search"
            onChange={(e) => setSearchData(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;


