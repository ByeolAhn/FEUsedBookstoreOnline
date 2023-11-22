import React from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import image_logo from '../assets/logo.png';
import { isAuthenticated, getUsername, clearJWT } from './auth/auth-helper';

const Header = () => {
  const location = useLocation();

  const signoutClick = () => {
    clearJWT();
  };

  return (
    <>
      {/* -- Main Nav bar  -- */}
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <div className="container-fluid">
          {/* -- Brand/logo -- */}
          <NavLink className="navbar-brand" to="#">
            <img src={image_logo} alt="logo" style={{ width: 40 , borderRadius: '50%' }} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar"  >
            {/* !-- Links -- */}
            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
              {/* Centered Navigation Items */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/" >
                  <i className="fas fa-home"></i> Home 
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/books/create">
                  <i className="fas fa-exchange-alt"></i> Trade Your Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  <i className="fas fa-info-circle"></i> About Us
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
               <i className="fas fa-envelope"></i> Contact Us
               </NavLink>
                 </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/books/get">
                  <i className="fas fa-book"></i> Explore Books
                </NavLink>
              </li>
              {/* End of Centered Navigation Items */}
            </ul>
            {/* Aligned to the Right */}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users/list">
                  <i className="fas fa-user"></i> Users
                </NavLink>
              </li>
              <li className="nav-item">
                {!isAuthenticated() && (
                  <NavLink className="nav-link" to="/users/signin">
                    <i className="fa-solid fa-right-to-bracket"></i> Signin
                  </NavLink>
                )}
                {isAuthenticated() && (
                  <Link className="nav-link" to="/" onClick={signoutClick}>
                    <i className="fa-solid fa-right-from-bracket"></i> Sign-out ({getUsername()})
                  </Link>
                )}
              </li>
              {/* End of Right-aligned Items */}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Header;