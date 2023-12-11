import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { signin } from "../../datasource/api-user";
import { authenticate } from "./auth-helper.js";

//Defines a sign-in form with input fields for email and password.
const Signin = () => {
  const { state } = useLocation();
  const { from } = state || { from: { pathname: "/" } };
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //Handles form changes, submission, and displays error messages if sign-in fails.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Utilizes the signin function from the api-user module to interact with the backend.
    signin(user)
      .then((data) => {
        if (data && data.success) {
          authenticate(data.token, () => {
            console.log(data.user.id);
            sessionStorage.setItem("userId", data.user.userId);
            sessionStorage.setItem("authToken", data.token);
            navigate(from, { replace: true });
          });
        } else {
          setErrorMsg(data.message);
        }
      })
      .catch((err) => {
        setErrorMsg(err.message);
        console.log(err);
      });
  };

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1>Sign In</h1>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="emailTextField">Email</label>
              <input
                type="email" // Changed from "text" to "email"
                className="form-control"
                id="emailTextField"
                placeholder="Enter your email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="passwordTextField">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordTextField"
                placeholder="Enter your password"
                name="password"
                value={user.password || ""}
                onChange={handleChange}
                required
              />
            </div>
            <br />

            <button className="btn btn-primary" type="submit">
              <i className="fas fa-sign-in-alt"></i> Sign In
            </button>

            <Link to="/" className="btn btn-warning">
              <i className="fas fa-undo"></i> Cancel
            </Link>
            <br />
            <Link to="/users/create" className="btn btn-link">
              Don't have an account? Register here
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
