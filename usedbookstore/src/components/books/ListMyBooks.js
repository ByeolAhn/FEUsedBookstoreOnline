import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mylist } from "../../datasource/api-books";
import { isAuthenticated } from "../auth/auth-helper";

const ListMyBooks = () => {
    const [myBooks, setMyBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
        history.push("/login");
        return;
      }
  
      const userId = isAuthenticated().user._id;
      myList(userId)
        .then((data) => {
          setMyBooks(data || []);
          setIsLoading(false);
        })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <h1>My Books</h1>
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
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myBooks.map((book, index) => (
                  <tr key={index}>
                    <td>{book.isbn}</td>
                    <td>{book.category}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.condition}</td>
                    <td>{book.price}</td>
                    <td>{book.description}</td>
                    <td>
                      <Link
                        to={`/books/update/${book.isbn}`}
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
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

export default ListMyBooks;