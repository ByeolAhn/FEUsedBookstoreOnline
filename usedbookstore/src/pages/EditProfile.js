import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByUserId, updateUser } from "../datasource/api-user";

// Functional component for editing book details
const EditProfile = () => {
  let navigate = useNavigate();
  console.log("useParams", useParams());
  let { userId } = useParams();

  let [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    address: "",
    lastlogin: "",
    // Add other fields as necessary
  });

  useEffect(() => {
    getByUserId(userId)
      .then((data) => {
        console.log("Logging data", data);
        if (data) {
          setUser({
            username: data.username,
            email: data.email,
            role: data.role,
            address: data.address,
            lastlogin: data.lastlogin,
            // Populate other fields
          });
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  }, [userId]);
  // Handling changes in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  // Handling form submission to update book details
  const handleSubmit = (event) => {
    event.preventDefault();

    // Invoking the update API function
    updateUser(userId, user)
      .then((data) => {
        if (data && data.success) {
          if (data && data.success) navigate("getUserByUserId/${userId}`");
        } else {
          alert(data && data.message ? data.message : "Failed to update book.");
        }
      })
      .catch((err) => {
        console.log("Error updating profile:", err);
        alert("Error updating profile: " + err.message);
      });
  };

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1 style={{ paddingTop: 40 }}>Edit Profile:</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="authorField">Username:</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="Enter userName"
                name="author"
                value={user.username || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="authorField">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="authorField">Role:</label>
              <input
                type="text"
                className="form-control"
                id="role"
                placeholder="Enter Role"
                name="role"
                value={user.role || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="authorField">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
                name="address"
                value={user.address || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="authorField">Last Login:</label>
              <input
                type="text"
                className="form-control"
                id="lastlogin"
                name="lastlogin"
                value={user.lastlogin || ""}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
