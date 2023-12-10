import { jwtDecode } from "jwt-decode";

//Saves the token and username in sessionStorage. Invokes a callback function.
const authenticate = (token, cb)=>{
  if (typeof window !== "undefined") {
    sessionStorage.setItem('token', token);

    let decoded = jwtDecode(token);
    sessionStorage.setItem('username', decoded.username)
  }
  cb();
}
//Checks if a user is authenticated based on the presence of a token in sessionStorage.
const isAuthenticated = ()=>{
  if (typeof window === "undefined") {
    return false;
  }
  return !!sessionStorage.getItem('token');
}

const isAuthenticated2 = ()=>{
  if (typeof window === "undefined") {
    return false;
  }
  if (!sessionStorage.getItem('token')) {
    return false;
  }
  const decoded = jwtDecode(sessionStorage.getItem('token'));
  return { user: decoded };
}

//Retrieves the token, username from sessionStorage.
const getToken = ()=>{
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('token');
}

const getUsername = ()=>{
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('username');
}

//Removes the token and username from sessionStorage.
const clearJWT = ()=>{
  if (typeof window !== "undefined") {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  }
}

export { authenticate, isAuthenticated, isAuthenticated2, getToken, getUsername, clearJWT }