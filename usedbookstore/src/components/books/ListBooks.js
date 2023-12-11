import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { list, remove } from "../../datasource/api-books";
import { isAuthenticated } from "../auth/auth-helper";

const ListBooks = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    list()
      .then((data) => {
        setProductList(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleRemove = (isbn) => {
    if (!isAuthenticated())
      window.alert("You are not authenticated. Please, sign-in first.");
    else if (window.confirm("Are you sure you want to delete this book?")) {
      remove(isbn)
        .then(() => {
          setProductList((prevProductList) =>
            prevProductList.filter((product) => product.isbn !== isbn)
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const hasExpired = (expiryDateString) => {
    const expiryDate = new Date(expiryDateString);
    console.log("Expiry Date:", expiryDate);
    console.log("Current Date:", currentDate);
    return currentDate > expiryDate;
  };

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <h1>Book Inventory</h1>
        <div>
          <Link to="/books/create" className="btn btn-primary">
            Add a new Book
          </Link>
        </div>

        <div className="table-responsive">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Category</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Condition</th>
                  <th>Price &nbsp;(CAD)&nbsp;</th>
                  <th>Description</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList &&
                  productList.map((product, index) => (
                    <tr
                      key={index}
                      style={
                        hasExpired(product.expiryDate)
                          ? { color: "red", textDecoration: "line-through" }
                          : {}
                      }
                    >
                      <td
                        style={
                          hasExpired(product.expiryDate) ? { color: "red" } : {}
                        }
                      >
                        {product.isbn}
                      </td>
                      <td
                        style={
                          hasExpired(product.expiryDate) ? { color: "red" } : {}
                        }
                      >
                        {product.category}
                      </td>
                      <td
                        style={
                          hasExpired(product.expiryDate) ? { color: "red" } : {}
                        }
                      >
                        {product.title}
                      </td>
                      <td
                        style={
                          hasExpired(product.expiryDate) ? { color: "red" } : {}
                        }
                      >
                        {product.author}
                      </td>
                      <td
                        style={
                          hasExpired(product.expiryDate) ? { color: "red" } : {}
                        }
                      >
                        {product.condition}
                      </td>
                      <td
                        style={
                          hasExpired(product.expiryDate) ? { color: "red" } : {}
                        }
                      >
                        {product.price}
                      </td>
                      <td
                        style={
                          hasExpired(product.expiryDate) ? { color: "red" } : {}
                        }
                      >
                        {product.description}
                      </td>
                      <td
                        style={
                          hasExpired(product.expiryDate) ? { color: "red" } : {}
                        }
                      >
                        {hasExpired(product.expiryDate)
                          ? "Expired"
                          : "Available"}
                      </td>
                      <td>
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>
                                <Link
                                  to={`/books/update/${product.isbn}`}
                                  className="btn btn-primary btn-sm"
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </Link>
                              </td>
                              <td>
                                <button
                                  onClick={() => handleRemove(product.isbn)}
                                  className="btn btn-danger btn-sm"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListBooks;
