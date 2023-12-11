import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteUserAccount } from "../datasource/api-user";

const MyProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const token = sessionStorage.getItem("authToken");
  const apiURL = process.env.REACT_APP_APIURL;

  useEffect(() => {
    console.log(token, userId);
    if (token && userId) {
      fetch(`${apiURL}/users/getUserByUserId/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("User profile data:", response); // Log the retrieved data
          setUserProfile(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error.response);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      // Handle no token or userId condition or redirect to login
    }
  }, [token, userId]); // Include userId in the dependency array

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      "Are you sure you want to close your account?"
    );
    if (confirmation) {
      setShowConfirmation(true);
    }
  };

  const handleCloseConfirmation = async (confirmation) => {
    setShowConfirmation(false);

    if (confirmation) {
      // Implement the logic to delete the account
      try {
        const response = await deleteUserAccount(userId, token);
        console.log("Account deleted:", response);

        // Perform further actions after successful deletion if needed
      } catch (error) {
        console.error("Error deleting account:", error);
        // Handle error scenarios
      }
    }
  };
  const renderProfileForm = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (userProfile) {
      const { userId, username, email, role, phoneNumber, address, lastLogin } =
        userProfile;
      //console.log("HEREEEEE...", userId, username, email, role, phoneNumber, address, lastLogin)
      return (
        <div
          style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}
        >
          <form style={{ width: "50%" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <h1>MY PROFILE</h1>
              <div>
                <Link to={`/users/edit/${userId}`} className="btn btn-primary">
                  <i className="fas fa-user"></i> Edit Profile
                </Link>
              </div>

              {/* <label>
                <b>My Id:</b>
              </label>
              <input type="text" value={userId} disabled /> */}

              <label>
                <b>Username:</b>
              </label>
              <input type="text" value={username} disabled />

              <label>
                <b>Email:</b>
              </label>
              <input type="text" value={email} disabled />

              <label>
                <b>Role:</b>
              </label>
              <input type="text" value={role} disabled />

              <label>
                <b>Phone Number:</b>
              </label>
              <input type="text" value={phoneNumber} disabled />

              <label>
                <b>Address:</b>
              </label>
              <input type="text" value={address.street} disabled />
              <input type="text" value={address.city} disabled />
              <input type="text" value={address.country} disabled />
              <input type="text" value={address.postalCode} disabled />
              <input type="text" value={address.state} disabled />

              <label>
                <b>Last Login:</b>
              </label>
              <input
                type="text"
                value={new Date(lastLogin).toLocaleString()}
                disabled
              />
            </div>
          </form>
        </div>
      );
    } else {
      return <div>User profile not found.</div>;
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {renderProfileForm()}
      {showConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to close your account?</p>
            <button onClick={() => handleCloseConfirmation(true)}>Yes</button>
            <button onClick={() => handleCloseConfirmation(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Button to trigger account closure */}
      <button onClick={handleDeleteAccount}>Close Account</button>
    </div>
  );
};

export default MyProfile;
