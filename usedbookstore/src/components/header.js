import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import image_logo from "../assets/logo.png";
import { isAuthenticated, getUsername, clearJWT } from "./auth/auth-helper";

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
            <img src={image_logo} alt="logo" style={{ width: 40 }} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            {/* !-- Links -- */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <i className="fas fa-home"></i> Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa-solid fa-barcode"></i> Books
                </Link>

                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/books/get">
                      <i className="fa-regular fa-rectangle-list"></i> Books
                      List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/books/create">
                      <i className="fa-solid fa-square-plus"></i> Add a new Book
                    </NavLink>
                  </li>
                </ul>
              </li>

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
                    <i className="fa-solid fa-right-from-bracket"></i> Sign-out
                    ({getUsername()})
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Header;
