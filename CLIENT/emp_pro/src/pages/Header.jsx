import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css'; // Ensure this import is correct

function Header() {
  const logout = () => {
    sessionStorage.removeItem("token");
    toast.success("Logout Successful");
    // navigate('/login'); // Redirect to the login page after logout
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          WorkHive
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addemployee">
                Add Employee
              </Link>
            </li>
            <li className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle"
    id="accountDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Account
  </a>
  <ul className="dropdown-menu" aria-labelledby="accountDropdown">
  <li>
      <Link className="dropdown-item" to="/profile">
        Profile
      </Link>
    </li>
    
   
    <li>
      <Link className="dropdown-item" to="/register">
        Register
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/login">
        Login
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/login"  onClick={logout}>
        Logout
      </Link>
    </li>
  </ul>
</li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
