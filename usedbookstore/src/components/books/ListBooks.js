import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { list, remove } from "../../datasource/api-books";
import { isAuthenticated } from "../auth/auth-helper";
// Functional component definition for listing books
const ListBooks = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // useEffect hook to fetch the list of books when the component mounts
  useEffect(() => {
    list()
      .then((data) => {
        setProductList(data || []); // Set to an empty array if data is undefined
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);
 // to handle book removal
  const handleRemove = (isbn) => {
    if (!isAuthenticated())     
      window.alert('You are not authenticated. Please, sign-in first.')
    else if(window.confirm('Are you sure you want to delete this book?')) {
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList &&
                  productList.map((product, index) => (
                    <tr key={index}>
                      <td>{product.isbn}</td>
                      <td>{product.category}</td>
                      <td>{product.title}</td>
                      <td>{product.author}</td>
                      <td>{product.condition}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>
                        <table className="table">
                          <tbody>
                            <tr>
                               <td>
                                <Link
                                  to={`/books/details/${product.isbn}`}
                                  className="btn btn-warning btn-sm"
                                >
                                  <i className="fas fa-eye-alt"></i>
                                </Link>
                              </td>
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
