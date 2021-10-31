import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light ps-5 mb-5">
          <NavLink className="navbar-brand" to="/">
            Vidly
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link active" to="/movies">
                Movies
              </NavLink>
              <NavLink className="nav-item nav-link" to="/costumers">
                Customers
              </NavLink>
              <NavLink className="nav-item nav-link" to="/rentals">
                Rentail
              </NavLink>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
