const apiURL = process.env.REACT_APP_APIURL || "http://localhost:3000";

const create = async (product) => {
  try {
    let response = await fetch(`${apiURL}/books/create/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async () => {
  try {
    let response = await fetch(`${apiURL}/books/get/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (isbn) => {
  try {
    let response = await fetch(apiURL + "/books/get/" + isbn, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch book data.");
    }

    return await response.json();
  } catch (err) {
    const errorMessage =
      err?.message || "An error occurred while fetching book data.";
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};

const update = async (isbn, item) => {
  try {
    let response = await fetch(apiURL + "/books/update/" + isbn, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer ' + credentials
      },
      body: JSON.stringify(item),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (isbn) => {
  try {
    let response = await fetch(apiURL + "/books/delete/" + isbn, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer ' + credentials.t
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, read, update, remove, list };
