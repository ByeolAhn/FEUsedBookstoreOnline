import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { read, update } from "../../datasource/api-books";
import BooksModel from "../../datasource/booksModel";

const conditionOptions = ["New", "Like new", "Used", "Worn"];

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
const EditBooks = () => {
  let navigate = useNavigate();
  console.log("useParams", useParams());
  let { isbn } = useParams();

  let [book, setBook] = useState(new BooksModel());

  // Fetching book details based on ISBN when the component mounts
  useEffect(() => {
    read(isbn)
      .then((data) => {
        console.log("Logging data", data);
        if (data) {
          setBook(
            new BooksModel(
              data.id,
              data.isbn,
              data.category,
              data.title,
              data.author,
              data.condition,
              data.price,
              data.description,
              data.expiryDate,
              data.postedBy,
              data.active
            )
          );
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  }, [isbn]);
  // Handling changes in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name !== 'postedBy') {
      setBook((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };
  // Handling form submission to update book details
  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedBook = {
      id: book.id,
      isbn: book.isbn,
      category: book.category,
      title: book.title,
      author: book.author,
      condition: book.condition,
      price: book.price,
      description: book.description,
      expiryDate: book.expiryDate,
      active: book.active,
    };
    // Invoking the update API function
    update(isbn, updatedBook)
      .then((data) => {
        if (data && data.success) {
          alert(data.message);
          navigate("/books/get");
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
          <h1 style={{ paddingTop: 40 }}>Edit A Book:</h1>

          <form
            onSubmit={handleSubmit}
            className="form"
            style={{ paddingTop: 40 }}
          >
            <div className="form-group">
              <input type="hidden" name="id" value={book.id || ""} />

              {/* ISBN */}
              <label htmlFor="isbnField">ISBN:</label>
              <input
                type="text"
                className="form-control"
                id="isbnField"
                placeholder="Enter the ISBN"
                name="isbn"
                value={book.isbn || ""}
                onChange={handleChange}
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
                value={book.category || ""}
                onChange={handleChange}
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
                value={book.author || ""}
                onChange={handleChange}
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
                value={book.condition || ""}
                onChange={handleChange}
                required
              >
                <option value="">Choose a condition</option>
                {conditionOptions.map((condition, index) => (
                  <option key={index} value={condition}>
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
                value={book.price || ""}
                onChange={handleChange}
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
                value={book.description || ""}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* EXPIRY DATE */}
          <div className="form-group">
            <label htmlFor="expiryDateField">Expiry Date:</label>
            <input
              type="date"
              className="form-control"
              id="expiryDateField"
              name="expiryDate"
              value={book.expiryDate || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* ACTIVE */}
          <div className="form-group">
            <label htmlFor="activeField">Active:</label>
            <select
              className="form-control"
              id="activeField"
              name="active"
              value={book.active || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Active Status</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>

            {/* SUBMIT BUTTON */}
            <button className="btn btn-primary" type="submit">
              <i className="fas fa-edit"></i>
              Submit
            </button>

            {/* CANCEL BUTTON */}
            <Link to="/books/get" className="btn btn-warning">
              <i className="fas fa-undo"></i>
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditBooks;
