import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { register } from "../../datasource/api-user";
import { authenticate } from "./auth-helper.js";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'; // Import Bootstrap icons


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
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      country: "",
      postalCode: "",
      state: ""
    }
  });
//Handles form changes, submission, and displays error messages if registration fails.
const handleChange = (event) => {
  const { name, value } = event.target;

  if (name.startsWith('address.')) {
    const addressKey = name.split('.')[1];

    setUser(prevFormData => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [addressKey]: value
      }
    }));
  } else {
    setUser(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }
};

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // New state variable
  
  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
  // Check if passwords match immediately as the user types
  if (user.password !== value) {
    setPasswordsMatch(false);
  } else {
    setPasswordsMatch(true);
  }
};

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    // Utilizes the register function from the api-user module to interact with the backend.
    register(user)
      .then((data) => {
        if (data && data.success) {
          window.alert("Registered User Successfully To Our Database");
          //Upon successful registration, alerts the user
          navigate('/users/signin');
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
          {!passwordsMatch && (
            <div className="alert alert-danger">Passwords do not match</div>
          )}
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
           
            <div className="form-group">
            <label htmlFor="passwordTextField">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="passwordTextField"
                placeholder="Enter your password"
                name="password"
                value={user.password || ""}
                onChange={handleChange}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPasswordTextField">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${
                  !passwordsMatch ? "is-invalid" : ""
                }`}
                id="confirmPasswordTextField"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <BsFillEyeSlashFill />
                ) : (
                  <BsFillEyeFill />
                )}
              </button>
            </div>
            {!passwordsMatch && (
              <div className="invalid-feedback">Passwords do not match</div>
            )}
          </div>
            
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

            <div className="form-group">
              <label htmlFor="countryField">Country</label>
              <input
                type="text"
                className="form-control"
                id="countryField"
                placeholder="Enter your country"
                name="address.country"
                value={user.address.country || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="stateField">State</label>
              <input
                type="text"
                className="form-control"
                id="stateField"
                placeholder="Enter your state"
                name="address.state"
                value={user.address.state || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCodeField">Postal Code</label>
              <input
                type="text"
                className="form-control"
                id="postalCodeField"
                placeholder="Enter your postal code"
                name="address.postalCode"
                value={user.address.postalCode || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="streetField">Street</label>
              <input
                type="text"
                className="form-control"
                id="streetField"
                placeholder="Enter your street address"
                name="address.street"
                value={user.address.street || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cityField">City</label>
              <input
                type="text"
                className="form-control"
                id="cityField"
                placeholder="Enter your city"
                name="address.city"
                value={user.address.city || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumberField">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumberField"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={user.phoneNumber || ""}
                onChange={handleChange}
                required
              />
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