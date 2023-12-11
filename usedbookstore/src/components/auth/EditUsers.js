import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findUserById, updateUser } from "../../datasource/api-user";
import UserModel from "../../datasource/usersModel";
import { isAuthenticated } from "../auth/auth-helper";

const EditUser = () => {
  const { userId } = useParams(); // Extracting userId from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState(new UserModel({}));
  const [errorMsg, setErrorMsg] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const auth = isAuthenticated();
      if (auth && auth.user) {
        const authToken = auth.token;
        try {
          const data = await findUserById(userId, authToken);
          if (data && data.user) {
            setUser(new UserModel(data.user));
            setUpdatedDetails({
              username: data.user.username,
              email: data.user.email,
              role: data.user.role,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setErrorMsg("Failed to fetch user data");
        }
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (updatedDetails.password !== updatedDetails.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    const auth = isAuthenticated();
    if (auth && auth.user) {
      const authToken = auth.token;
      try {
        const data = await updateUser(userId, updatedDetails, authToken);
        if (data && data.success) {
          navigate(`/users/profile/${userId}`);
        } else {
          setErrorMsg(data.message);
        }
      } catch (error) {
        setErrorMsg("Failed to update user");
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1>Edit User Profile</h1>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <form onSubmit={handleSubmit} className="form">
            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={updatedDetails.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={updatedDetails.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role Field */}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                name="role"
                value={updatedDetails.role}
                onChange={handleChange}
                required
              >
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>

            {/* Password Fields */}
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={updatedDetails.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={updatedDetails.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
