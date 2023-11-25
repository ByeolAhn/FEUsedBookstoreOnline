import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { register } from "../../datasource/api-user";
import { authenticate } from "./auth-helper.js";

const Register = () => {
  const { state } = useLocation();
  const { from } = state || { from: { pathname: "/" } };
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  //Defines a registration form with input fields for username, email, password, and role.
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
//Handles form changes, submission, and displays error messages if registration fails.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Utilizes the register function from the api-user module to interact with the backend.
    register(user)
      .then((data) => {
        if (data && data.success) {
<<<<<<< HEAD
          
=======
>>>>>>> 88a7240b41764f5c3b3bda41085430c09ca881e6
          window.alert("Registered User Successfully To Our Database");
          //Upon successful registration, alerts the user and triggers authentication.
          authenticate(data.token, () => {
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
          <h1>Registration</h1>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="usernameTextField">Username</label>
              <input
                type="text"
                className="form-control"
                id="usernameTextField"
                placeholder="Enter your username"
                name="username"
                value={user.username || ""}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="emailTextField">Email</label>
              <input
                type="email"
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
            <div className="form-group">
              <label htmlFor="roleSelectField">Role</label>
              <select
                className="form-control"
                id="roleSelectField"
                name="role"
                value={user.role || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="seller">seller</option>
                <option value="buyer">buyer</option>
              </select>
            </div>
            <br />
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
