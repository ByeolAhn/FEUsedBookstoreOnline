import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create } from "../../datasource/api-books";
import BookModel from "../../datasource/booksModel";
import "./addBookStyles.css";

// Predefined list of categories for books
const condition = ["New", "Like new", "Used", "Worn"];

// Predefined list of categories for books
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

//Functional component for adding books
const AddBooks = () => {
  let navigate = useNavigate();
  let [product, setProduct] = useState(
    new BookModel("", "", "", "", "", 0, "")
  );

//Event handler to update the state on form input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
//Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Extract relevant book details from the state
    let newProduct = {
      isbn: product.isbn,
      category: product.category,
      title: product.title,
      author: product.author,
      condition: product.condition,
      price: product.price,
      description: product.description,
    };
    // Invokes the API function to add a new book.
    create(newProduct)
      .then((data) => {
        if (data && data.id) {
          alert("Item added with the id " + data.id);
          navigate("/books/get");
        } else {
          alert(data.message);
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
          <h1 style={{ paddingTop: 40 }}>Add a Book:</h1>

          <form
            onSubmit={handleSubmit}
            className="form"
            style={{ paddingTop: 40 }}
          >
            {/* ISBN */}
            <div className="form-group">
              <input type="hidden" name="id" value={product.id || ""}></input>
              <label htmlFor="isbnField">ISBN:</label>
              <input
                type="text"
                className="form-control"
                id="isbnField"
                placeholder="Enter the ISBN"
                name="isbn"
                value={product.isbn || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* TITLE */}
            <div className="form-group">
              <label htmlFor="titleField">Book Title:</label>
              <input
                type="text"
                className="form-control"
                id="titleField"
                placeholder="Enter the title of the book"
                name="title"
                value={product.title || ""}
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
                value={product.category || ""}
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
                value={product.author || ""}
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
                value={product.condition || ""}
                onChange={handleChange}
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
                placeholder="Enter the Price (e.g., 19.99)"
                name="price"
                value={product.price || ""}
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
                value={product.description || ""}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button className="btn btn-primary" type="submit">
              <i className="fas fa-edit"></i>
              Submit
            </button>

            <Link to="/books/" className="btn btn-warning">
              <i className="fas fa-undo"></i>
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddBooks;
