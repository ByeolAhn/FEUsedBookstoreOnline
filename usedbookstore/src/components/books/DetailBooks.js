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
  "Nursing",
];

// Functional component for editing book details
const DetailBooks = () => {
  let navigate = useNavigate();
  console.log("useParams", useParams());
  let { isbn } = useParams();

  let [product, setProduct] = useState(new BooksModel());

  // Fetching book details based on ISBN when the component mounts
  useEffect(() => {
    read(isbn)
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
  }, [isbn]);
  // Handling changes in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  // Handling form submission to update book details
  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      id: product.id,
      isbn: product.isbn,
      category: product.category,
      title: product.title,
      author: product.author,
      condition: product.condition,
      price: product.price,
      description: product.description,
    };
    // Invoking the update API function
    update(isbn, newProduct)
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
          <h1 style={{ paddingTop: 40 }}>Details of a Book:</h1>

          <form
            onSubmit={handleSubmit}
            className="form"
            style={{ paddingTop: 40 }}
          >
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



      {/* Comments */}

 {/* DESCRIPTION */}
 <div className="form-group">
              <label htmlFor="commentField">Comment:</label>
              <textarea
                className="form-control"
                id="commentField"
                placeholder="Enter yout comment"
                name="description"
                //value={product.description || ""}
                //onChange={handleChange}

              ></textarea>
            </div>



      <div class="row">
		<div class="col-md-12">
		    <div class="blog-comment">
				<h3 class="text-success">Comments</h3>
                <hr/>
				<ul class="comments">
				<li class="clearfix">
				  <img src="https://bootdey.com/img/Content/user_1.jpg" class="avatar" alt=""></img>
				  <div class="post-comments">
				      <p class="meta">Dec 18, 2014 <a href="#">JohnDoe</a> says : <i class="pull-right"><a href="#"><small>Reply</small></a></i></p>
				      <p>
				          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				          Etiam a sapien odio, sit amet
				      </p>
				  </div>
				</li>
				<li class="clearfix">
				  <img src="https://bootdey.com/img/Content/user_2.jpg" class="avatar" alt=""></img>
				  <div class="post-comments">
				      <p class="meta">Dec 19, 2014 <a href="#">JohnDoe</a> says : <i class="pull-right"><a href="#"><small>Reply</small></a></i></p>
				      <p>
				          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				          Etiam a sapien odio, sit amet
				      </p>
				  </div>
				
				  <ul class="comments">
				      <li class="clearfix">
				          <img src="https://bootdey.com/img/Content/user_3.jpg" class="avatar" alt=""></img>
				          <div class="post-comments">
				              <p class="meta">Dec 20, 2014 <a href="#">JohnDoe</a> says : <i class="pull-right"><a href="#"><small>Reply</small></a></i></p>
				              <p>
				                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				                  Etiam a sapien odio, sit amet
				              </p>
				          </div>
				      </li>
				  </ul>
				</li>
				</ul>
			</div>
		</div>
	</div>
    </div>




  );
};
export default DetailBooks;
