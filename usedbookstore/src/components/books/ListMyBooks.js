import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mylist } from "../../datasource/api-books";
import { getToken, isAuthenticated2 } from "../auth/auth-helper";
import { jwtDecode } from "jwt-decode";

const ListMyBooks = () => {
    const navigate = useNavigate();
    const [myBooks, setMyBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        const token = getToken();
        const userId = token ? jwtDecode(token).id : null;

        if (!userId) {
            navigate("/users/signin");
            return;
        }
        mylist(userId)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setMyBooks(data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    const hasExpired = (expiryDateString) => {
        const expiryDate = new Date(expiryDateString);
        return currentDate > expiryDate;
      };


    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <h1>My Books</h1>
                <div className="table-responsive">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : myBooks.length === 0 ? (
                        <p>Your List is empty</p>
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
                                    <th>Availability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myBooks.books.map((book, index) => (
                                    <tr key={index} style={hasExpired(book.expiryDate) ? { color: 'red', textDecoration: 'line-through' } : {}}>
                                        <td style={hasExpired(book.expiryDate) ? { color: 'red' } : {}}>{book.isbn}</td>
                                        <td style={hasExpired(book.expiryDate) ? { color: 'red' } : {}}>{book.category}</td>
                                        <td style={hasExpired(book.expiryDate) ? { color: 'red' } : {}}>{book.title}</td>
                                        <td style={hasExpired(book.expiryDate) ? { color: 'red' } : {}}>{book.author}</td>
                                        <td style={hasExpired(book.expiryDate) ? { color: 'red' } : {}}>{book.condition}</td>
                                        <td style={hasExpired(book.expiryDate) ? { color: 'red' } : {}}>{book.price}</td>
                                        <td style={hasExpired(book.expiryDate) ? { color: 'red' } : {}}>{book.description}</td>
                                        <td style={hasExpired(book.expiryDate) ? { color: 'red' } : {}}>{hasExpired(book.expiryDate) ? "Expired" : "Available"}</td>
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