import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { read, update } from "../../datasource/api-books";
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
];

const EditBooks = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [product, setProduct] = useState(new BooksModel());

  useEffect(() => {
    read(id)
      .then((data) => {
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
  }, [id]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevFormData) => ({ ...prevFormData, [name]: value }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    let newProduct = {
      id: product.id,
      isbn: product.isbn,
      category: product.category,
      title: product.title,
      author: product.author,
      condition: product.condition,
      price: product.price,
      description: product.description,
    };
  
    update(id, newProduct)
      .then((data) => {
        if (data && data.success) {
          alert(data.message);
          navigate("/books/get");
        } else {
          if (data && data.message) {
            alert(data.message);
          } else {
            alert("Failed to update book."); // Show a generic error message
          }
        }
      })
      .catch((err) => {
        alert(err.message); // Show any error caught during the API call
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
                placeholder="Enter the Price"
                name="price"
                value={product.price || 0}
                onChange={handleChange}
                min={0} // Set the minimum value to 0
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
