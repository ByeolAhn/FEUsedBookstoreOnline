let apiURL = process.env.REACT_APP_APIURL;

const signin = async (user) => {
  try {
    let response = await fetch(apiURL + "/users/signin/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const register = async (user) => {
  try {
    let response = await fetch(apiURL + "/users/create/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getByUserId = async (userId, token) => {
  try {
    let response = await fetch(`${apiURL}/users/getUserByUserId/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    throw err; // Rethrowing the error ensures that you can catch it in the component
  }
};

const deleteUserAccount = async (userId, token) => {
  try {
    let response = await fetch(`${apiURL}/users/remove/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    throw err; // Rethrowing the error ensures that you can catch it in the component
  }
};

// const updateUser = async (id, user) => {
//   const authToken = getToken();
//   try {
//     let response = await fetch(apiURL + "/users/edit/" + id, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${authToken}`,
//       },
//       body: JSON.stringify(user),
//     });
//     return await response.json();
//   } catch (err) {
//     console.error("Error updating user:", err);
//     throw err; // Rethrow to handle it in the calling component
//   }
// };
export { signin, register, getByUserId, deleteUserAccount };
