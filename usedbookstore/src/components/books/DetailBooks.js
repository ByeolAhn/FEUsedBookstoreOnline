import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readBook, update, readComments, createComment, createReply } from "../../datasource/api-books";
import { getToken, isAuthenticated2 } from "../auth/auth-helper";
import { jwtDecode } from "jwt-decode";
import "./addDetailBookStyles.css";

const condition = ["New", "Like new", "Used", "Worn"];

// Predefined list of categories
const categories = [
    "Fiction",
    "Non-fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Horror",
    "Romance",
    "Biography",
    "Self-Help",
    "Historical",
    "Cooking",
    "Travel",
    "Poetry",
    "Fashion",
    "Nursing",
];

// Functional component for editing book details
const DetailBooks = () => {
    let navigate = useNavigate();
    let { isbn } = useParams();
    let [product, setProduct] = useState([]);
    let [comments, setComments] = useState([]);
    let [comment, setComment] = useState({ isbn: '', user: '', comment: '' });
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [userIdBook, setUserIdBook] = useState('');
    const [replyTexts, setReplyTexts] = useState({});


    const fetchAndSetComments = () => {
        readComments(isbn)
            .then((data) => {
                if (data) {
                    setComments(data);
                    console.log(data);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    };


    const postComment = async () => {
        try {
            const newComment = {
                isbn: product.isbn,
                user: username,
                comment: comment.comment,
            };
            // console.log(newComment);
            // Invoking the update API function
            createComment(newComment)
                .then((data) => {
                    if (data && data.success) {
                        alert(data.message);
                        alert(newComment.isbn);
                        fetchAndSetComments();
                        console.log(product);
                    } else {
                        alert(data && data.message ? data.message : "Failed to update book.");
                    }
                })
                .catch((err) => {
                    alert(err.message);
                    console.log(err);
                });
        } catch (error) {
            // Handle errors
            alert(error.message);
            console.error(error);
        }
    };


    const postReplyComment = async (idComment) => {
        try {

            const newComment = {
                isbn: product.isbn,
                comment_id: idComment,
                user: username,
                comment: replyTexts[idComment] || '',
            };
            console.log(newComment);


            setReplyTexts((prevReplyTexts) => ({
                ...prevReplyTexts,
                [idComment]: '',
            }));
            // Invoking the update API function
            createReply(newComment)
                .then((data) => {
                    if (data && data.success) {
                        alert(data.message);
                        alert(newComment.isbn);
                        alert("New Comment inserted");

                    }
                })
                .catch((err) => {
                    alert(err.message);
                    console.log(err);
                });
        } catch (error) {
            // Handle errors
            alert(error.message);
            console.error(error);
        }
    };
    // Fetching book details based on ISBN when the component mounts
    useEffect(() => {
        // Retrieve the username from sessionStorage
        const token = getToken();
        const userId = token ? jwtDecode(token).id : null;

        if (userId) {
            setUserId(userId);
        }
        const username = sessionStorage.getItem('username');
        // Update the state with the retrieved username
        if (username) {
            setUsername(username);
        }

        readBook(isbn)
            .then((data) => {
                if (data) {
                    // Accessing properties within postedBy
                    setUserIdBook(data.postedBy.id);
                    setProduct(data);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });

        fetchAndSetComments();
        console.log("book", product);
    }, [userIdBook]);


    const handleChangeInput = (event, commentId) => {
        const { value } = event.target;
        setReplyTexts((prevReplyTexts) => ({
            ...prevReplyTexts,
            [commentId]: value,
        }));
    };


    // Handling changes in form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevFormData) => ({ ...prevFormData, [name]: value }));
        setComment((prevComment) => ({ ...prevComment, [name]: value }));
    };

    // Handling form submission to update book details
    const handleSubmit = (event) => {
        event.preventDefault();
        postComment();
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1 style={{ paddingTop: 40 }}>Details of a Book:</h1>

                    <form
                        // onSubmit={handleSubmit}
                        className="form"
                        style={{ paddingTop: 40 }}
                    >
                        <div className="form-group">
                            <input type="hidden" name="isbn" value={comment.isbn || ""} />
                            <input type="hidden" name="id" value={product.id || ""} />

                            {/* ISBN */}
                            <label htmlFor="isbnField">ISBN:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="isbnField"
                                placeholder="Enter the ISBN"
                                name="isbn"
                                value={product.isbn || ""}
                                onChange={handleChange}
                                disabled
                                required
                            />
                        </div>

                        {/* CATEGORY */}
                        <div className="form-group">
                            <label htmlFor="categoryField">Category:</label>
                            <select
                                className="form-control"
                                id="categoryField"
                                name="category"
                                value={product.category || ""}
                                onChange={handleChange}
                                disabled
                                required
                            >
                                <option value="">Select a Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* AUTHOR */}
                        <div className="form-group">
                            <label htmlFor="authorField">Author:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="authorField"
                                placeholder="Enter the Author"
                                name="author"
                                value={product.author || ""}
                                onChange={handleChange}
                                disabled
                                required
                            />
                        </div>

                        {/* CONDITION */}
                        <div className="form-group">
                            <label htmlFor="conditionField">Condition:</label>
                            <select
                                className="form-control"
                                id="conditionField"
                                name="condition"
                                value={product.condition || ""}
                                onChange={handleChange}
                                disabled
                                required
                            >
                                <option value="">Choose a condition</option>
                                {condition.map((condition) => (
                                    <option key={condition} value={condition}>
                                        {condition}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* PRICE */}
                        <div className="form-group">
                            <label htmlFor="priceField">Price:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="priceField"
                                placeholder="Enter the Price"
                                name="price"
                                value={product.price || ""}
                                onChange={handleChange}
                                disabled
                                required
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div className="form-group">
                            <label htmlFor="descriptionField">Description:</label>
                            <textarea
                                className="form-control"
                                id="descriptionField"
                                placeholder="Enter the Description"
                                name="description"
                                value={product.description || ""}
                                onChange={handleChange}
                                disabled
                                required
                            ></textarea>
                        </div>

                        {/* COMMENTS */}

                        {/* COMMENTS BOX */}
                        <div className="form-group">
                            <label htmlFor="commentField">Comment:</label>
                            <textarea
                                className="form-control"
                                id="commentField"
                                placeholder="Enter yout comment"
                                name="comment"
                                value={comment.comment}
                                onChange={handleChange}

                            ></textarea>
                        </div>
                        <button className="btn btn-primary" onClick={() => postComment()}>
                            <i className="fas fa-comment"></i>
                            Comment
                        </button>

                        {/* COMMENTS */}

                        {/* COMMENTS LIST */}



                        <div className="row">
                            <h3 className="text-success">Comments</h3>
                            <hr />
                        </div>
                        <div className="container mt-1 d-flex justify-content-center">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <ul className="list-unstyled">
                                            {comments.map((comment) => (

                                                <li className="media">
                                                    <br></br>
                                                    <div className="row">
                                                        <div className="col-md-1">
                                                            <span className="round pt-2">
                                                                <img
                                                                    src="https://img.icons8.com/bubbles/100/000000/groups.png"
                                                                    className="imgcomment align-self-start mr-3"
                                                                    alt="icon"
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <div className="media-body">
                                                                <div className="row d-flex">
                                                                    <h6 className="user pt-2">{comment.user || 'Anonymous'}</h6>
                                                                    <div className="ml-auto">
                                                                        <p className="text">{comment.createdAt}</p>
                                                                    </div>
                                                                </div>
                                                                <p className="text">Comment: {comment.comment}</p>

                                                                {comment.commentDetails.map((subComment) => (
                                                                    <div className="row">
                                                                        <div className="col-md-2">
                                                                            <div className="media mt-3 comment"> <a href="#"><img src="https://img.icons8.com/bubbles/100/000000/lock-male-user.png" className="imgcomment align-self-center mr-1" /></a>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-8">
                                                                            <div className="media-body">
                                                                                <br></br>
                                                                                {subComment.comment}
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                ))}

                                                                {userIdBook == userId && (

                                                                    <div className="row">
                                                                        <div className="col-md-2">
                                                                            <div className="media mt-3 comment"> <a href="#"><img src="https://img.icons8.com/bubbles/100/000000/lock-male-user.png" className="align-self-center mr-1" /></a>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-8">
                                                                            <div className="media-body">
                                                                                <br></br>
                                                                                <p className="reply">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id={"reply_" + comment._id}
                                                                                        key={comment._id}
                                                                                        placeholder="Reply the comment"
                                                                                        name="author"
                                                                                        value={replyTexts[comment._id] || ''}
                                                                                        onChange={(event) => handleChangeInput(event, comment._id)} />

                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-2">
                                                                            <br></br>
                                                                            <button className="btn btn=primary"
                                                                                onClick={() => postReplyComment(comment._id)}
                                                                            >Send</button>
                                                                        </div>
                                                                    </div>

                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>


                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>




    );
};
export default DetailBooks;
