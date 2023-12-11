import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { findUserById } from "../../datasource/api-user";
import UserModel from "../../datasource/usersModel";
import { isAuthenticated } from "../auth/auth-helper";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(new UserModel({}));
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const auth = isAuthenticated();
    if (auth && auth.user) {
      const userId = auth.user._id;
      const authToken = auth.token;
      fetchUserData(userId, authToken);
    }
  }, []);

  const fetchUserData = async (userId, authToken) => {
    try {
      const data = await findUserById(userId, authToken);
      if (data && data.user) {
        setUser(new UserModel(data.user));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrorMsg("Failed to fetch user data");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <h1>User Profile</h1>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Account Created: {user.created.toDateString()}</p>
          <p>Last Updated: {user.updated.toDateString()}</p>

          {/* Edit User Link */}
          <Link
            to={`/users/edit/${user._id}`}
            className="btn btn-primary btn-sm"
          >
            <i className="fas fa-pencil-alt"></i> Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
