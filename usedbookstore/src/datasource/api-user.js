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
    let response = await fetch(apiURL + `/users/getByUserId/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteUserAccount = async (userId, token) => {
  try {
    let response = await fetch(`${apiURL}/users/remove/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (userId, user, token) => {
  const response = await fetch(`${apiURL}/users/edit/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return await response.json();
};

export { signin, register, getByUserId, deleteUserAccount, updateUser };
