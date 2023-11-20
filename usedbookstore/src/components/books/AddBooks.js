import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create } from "../../datasource/api-books";
import BookModel from "../../datasource/booksModel"; // Make sure the path is correct
import './addBookStyles.css';

const condition = ["New", "Used", "Worn"];
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
  // Add more categories as needed
];

const AddBooks = () => {
  let navigate = useNavigate();
  let [product, setProduct] = useState(new BookModel('', '', '', '', 'new', 0, ''));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let newProduct = {
      id: product.id,
      item: product.item,
      qty: product.qty,
      tags: product.tags.toString(),
      status: product.status,
      size: {
        h: product.size_h,
        w: product.size_w,
        uom: product.size_uom,
      },
    };

    create(newProduct)
      .then((data) => {
        if (data && data.id) {
          alert("Item added with the id " + data.id);
          navigate("/inventory/list");
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
          <h1>Add a new Book</h1>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="conditionField">Condition:</label>
              <select
                className="form-control"
                id="conditionField"
                name="condition"
                value={product.condition || "New"}
                onChange={handleChange}
                required
              >
                {condition.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
  <label htmlFor="priceField">Price:</label>
  <input
    type="number"
    className="form-control"
    id="priceField"
    placeholder="Enter the Price"
    name="price"
    value={product.price || 0}
    onChange={handleChange}
    min={0} // Set the minimum value to 0
    required
  />
</div>
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
            <Link to="/books/list" className="btn btn-warning">
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