import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readBook, update, readComments, createComment } from "../../datasource/api-books";
import BooksModel from "../../datasource/booksModel";

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
    let [product, setProduct] = useState(new BooksModel());
    let [comments, setComments] = useState([]);
    let [comment, setComment] = useState({ isbn: '', user: '', comment: '' });
    const [username, setUsername] = useState('');


    const fetchAndSetComments = () => {
        readComments(isbn)
          .then((data) => {
            if (data) {
              setComments(data);
              console.log("comments", data);
            }
          })
          .catch((err) => {
            alert(err.message);
            console.log(err);
          });
      };

    // Fetching book details based on ISBN when the component mounts
    useEffect(() => {
        // Retrieve the username from sessionStorage
        const username = sessionStorage.getItem('username');

        // Update the state with the retrieved username
        if (username) {
            setUsername(username);
        }

        readBook(isbn)
            .then((data) => {
                console.log("Logging data", data);
                if (data) {
                    setProduct(
                        new BooksModel(
                            data.id,
                            data.isbn,
                            data.category,
                            data.title,
                            data.author,
                            data.condition,
                            data.price,
                            data.description
                        )
                    );
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });

        fetchAndSetComments();

    }, [isbn]);




    // Handling changes in form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevFormData) => ({ ...prevFormData, [name]: value }));
        setComment((prevComment) => ({ ...prevComment, [name]: value }));
    };

    // Handling form submission to update book details
    const handleSubmit = (event) => {
        event.preventDefault();

        const newComment = {
            isbn: product.isbn,
            user: username,
            comment: comment.comment,
        };

        // Invoking the update API function
        createComment(newComment)
            .then((data) => {
                if (data && data.success) {
                    alert(data.message);
                    alert(newComment.isbn);
                    fetchAndSetComments();
                   
                } else {
                    alert(data && data.message ? data.message : "Failed to update book.");
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1 style={{ paddingTop: 40 }}>Details of a Book:</h1>

                    <form
                        onSubmit={handleSubmit}
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
                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-comment"></i>
                            Comment
                        </button>

                        {/* COMMENTS */}

                        {/* COMMENTS LIST */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="blog-comment">
                                    <h3 className="text-success">Comments</h3>
                                    <hr />
                                    <ul className="comments">
                                        {comments.map((comment) => (
                                            <li key={comment._id} className="clearfix">
                                                <img src={comment.avatar} className="avatar" alt=""></img>
                                                <div className="post-comments">
                                                    <p className="meta">
                                                        {comment.createdAt} <a href="#">{comment.user || 'Anonymous'}</a> says :{' '}
                                                        <i className="pull-right">
                                                            <a href="#">
                                                                <small>Reply</small>
                                                            </a>
                                                        </i>
                                                    </p>
                                                    <p>{comment.comment}</p>
                                                    {/* Add nested comments if available
                  {comment.comments && comment.comments.length > 0 && (
                    <ul className="comments">
                      {comment.comments.map((nestedComment) => (
                        <li key={nestedComment.id} className="clearfix">
                          <img src={nestedComment.avatar} className="avatar" alt=""></img>
                          <div className="post-comments">
                            <p className="meta">
                              {nestedComment.date} <a href="#">{nestedComment.author}</a> says :{' '}
                              <i className="pull-right">
                                <a href="#">
                                  <small>Reply</small>
                                </a>
                              </i>
                            </p>
                            <p>{nestedComment.content}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )} */}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
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
