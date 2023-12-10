import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { list } from "../../datasource/api-books";
import { isAuthenticated } from "../auth/auth-helper";
// Functional component definition for listing books
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
        setProductList(data || []); // Set to an empty array if data is undefined
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
        <div>
          <Link to="/books/mylist" className="btn btn-primary">
            My book list
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
                </tr>
              </thead>
              <tbody>
                {productList &&
                  productList.map((product, index) => (
                    <tr key={index} style={hasExpired(product.expiryDate) ? { color: 'red', textDecoration: 'line-through' } : {}}>
                      <td style={hasExpired(product.expiryDate) ? { color: 'red' } : {}}>{product.isbn}</td>
                      <td style={hasExpired(product.expiryDate) ? { color: 'red' } : {}}>{product.category}</td>
                      <td style={hasExpired(product.expiryDate) ? { color: 'red' } : {}}>{product.title}</td>
                      <td style={hasExpired(product.expiryDate) ? { color: 'red' } : {}}>{product.author}</td>
                      <td style={hasExpired(product.expiryDate) ? { color: 'red' } : {}}>{product.condition}</td>
                      <td style={hasExpired(product.expiryDate) ? { color: 'red' } : {}}>{product.price}</td>
                      <td style={hasExpired(product.expiryDate) ? { color: 'red' } : {}}>{product.description}</td>
                      <td style={hasExpired(product.expiryDate) ? { color: 'red' } : {}}>{hasExpired(product.expiryDate) ? "Expired" : "Available"}</td>
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
