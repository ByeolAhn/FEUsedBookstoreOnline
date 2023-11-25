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

export { authenticate, isAuthenticated, getToken, getUsername, clearJWT }