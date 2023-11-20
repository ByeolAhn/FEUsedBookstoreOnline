let apiURL = process.env.REACT_APP_APIURL || "http://localhost:3002";

// Adding / Creating a book
const create = async (product) => {
  try {
    let response = await fetch(apiURL + "/books/create/", {
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

// Reading / finding a book
const read = async (isbn) => {
  try {
    let response = await fetch(apiURL + "/books/find/" + isbn, {
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

// Updating a book with the isbn
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

// Listing / Getting a book
const list = async () => {
  try {
    let response = await fetch(apiURL + "/books/get/", {
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

// Deleting / Removing a book
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

export { list, create, read, update, remove };
