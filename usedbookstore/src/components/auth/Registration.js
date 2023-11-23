import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/api/register", formData);
      console.log(response.data);
      navigate("/signin");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response && error.response.data ? error.response.data.message : "An error occurred during registration.");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1>Registration</h1>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="usernameField">Username</label>
              <input
                type="text"
                className="form-control"
                id="usernameField"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="emailField">Email</label>
              <input
                type="email"
                className="form-control"
                id="emailField"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="passwordField">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordField"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="confirmPasswordField">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPasswordField"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <br />
            <button className="btn btn-primary" type="submit">
              <i className="fas fa-user-plus"></i>
              Register
            </button>
       
            <Link to="/users/signin" className="btn btn-secondary">
              <i className="fas fa-sign-in-alt"></i>
              Sign In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
