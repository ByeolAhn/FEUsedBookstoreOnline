import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { list, remove } from "../../datasource/api-books";
const ListBooks = () => {
  let [bookList, setBookList] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    list()
      .then((data) => {
        if (data) {
          setBookList(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  }, []);

  const handleRemove = (isbn) => {
    // if (!isAuthenticated())
    //     window.alert('You are not authenticated. Please, proceed with sign-in first.')
    // else
    if (window.confirm("Are you sure you want to delete this item?")) {
      remove(isbn)
        .then((data) => {
          if (data && data.success) {
            const newList = bookList.filter((product) => product.isbn !== isbn);
            setBookList(newList);
          }
        })
        .catch((err) => {
          alert(err.message);
          console.log(err);
        });
    }
  };

  return (
    //   -- Main Content --
    <main className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <h1>Book List</h1>

        <div>
          <Link
            to="/books/create"
            className="btn btn-primary align-self-end"
            role="button"
          >
            <i className="fas fa-plus-circle"></i>
            Add a new Book
          </Link>
        </div>
        <br />
        <br />
        <div className="table-responsive">
          {isLoading && <div>Loading...</div>}
          {!isLoading && (
            <table className="table table-bordered table-striped table-hover">
              <thead>
                {/* -- Header Row-- */}
                <tr>
                  <th className="text-center">Isbn</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Title</th>
                  <th className="text-center">Author</th>
                  <th className="text-center">Condition</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Description</th>
                  <th className="text-center" colSpan="3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* -- Repeatable Template Row -- */}
                {bookList.map((product, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center"> {product.isbn || ""} </td>
                      <td className="text-center">
                        {" "}
                        {product.category || ""}{" "}
                      </td>
                      <td className="text-center"> {product.title || ""} </td>
                      <td className="text-center"> {product.author || ""} </td>
                      <td className="text-center">
                        {" "}
                        {product.condition || ""}{" "}
                      </td>
                      <td className="text-center"> {product.price || ""} </td>
                      <td className="text-center">
                        {" "}
                        {product.description || ""}{" "}
                      </td>

                      <td className="text-center">
                        <Link
                          className="btn bg-primary btn-primary btn-sm"
                          to={"/books/update/" + product.isbn}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                      </td>

                      <td className="text-center">
                        <button
                          className="btn bg-danger btn-danger btn-sm"
                          onClick={() => handleRemove(product.isbn)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default ListBooks;
