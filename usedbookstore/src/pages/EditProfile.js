import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateUser } from "../datasource/api-user";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    phoneNo: "",
    address: { street: "", city: "", country: "", postalCode: "", state: "" },
    lastlogin: "",
  });

  const apiURL = process.env.REACT_APP_APIURL;
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (token && userId) {
      fetch(`${apiURL}/users/getUserByUserId/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          if (userData) {
            setUser({
              username: userData.username,
              email: userData.email,
              role: userData.role,
              phoneNo: userData.phoneNumber,
              address: userData.address || {
                street: "",
                city: "",
                country: "",
                postalCode: "",
                state: "",
              },
              lastlogin: userData.lastLogin
                ? new Date(userData.lastLogin).toLocaleString()
                : "",
            });
          } else {
            console.error("User data not found");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [userId, token, apiURL]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setUser((prevUser) => ({
        ...prevUser,
        address: { ...prevUser.address, [fieldName]: value },
      }));
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedUserResponse = await updateUser(userId, user, token);
      if (updatedUserResponse.success) {
        alert("Profile updated successfully");
        navigate(`/users/edit/${userId}`);
      } else {
        alert(updatedUserResponse.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1>Edit Profile</h1>

          {/* Back to Profile Button */}
          <Link
            to={`/users/getUserByUserId/${userId}`}
            className="btn btn-secondary"
          >
            <i className="fas fa-user"></i> Back to Profile
          </Link>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="form-group">
              <label htmlFor="userName">Username:</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="username"
                value={user.username || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={user.role || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone No */}
            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number:</label>
              <input
                type="text"
                className="form-control"
                id="phoneNo"
                name="phoneNo"
                value={user.phoneNo || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address Fields */}
            <div className="form-group">
              <label htmlFor="addressStreet">Street:</label>
              <input
                type="text"
                className="form-control"
                id="addressStreet"
                name="address.street"
                value={user.address.street || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressCity">City:</label>
              <input
                type="text"
                className="form-control"
                id="addressCity"
                name="address.city"
                value={user.address.city || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressCountry">Country:</label>
              <input
                type="text"
                className="form-control"
                id="addressCountry"
                name="address.country"
                value={user.address.country || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressPcode">Postal Code:</label>
              <input
                type="text"
                className="form-control"
                id="addressPcode"
                name="address.postalCode"
                value={user.address.postalCode || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="addressState">State:</label>
              <input
                type="text"
                className="form-control"
                id="addressState"
                name="address.state"
                value={user.address.state || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastLogin">Last Login:</label>
              <input
                type="text"
                className="form-control"
                id="lastLogin"
                name="lastlogin"
                value={user.lastlogin || ""}
                onChange={handleChange}
                disabled
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-user"></i> Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
