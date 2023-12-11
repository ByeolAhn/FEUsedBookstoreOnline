import React from "react";
import { Link } from "react-router-dom";
import ContactUsImage from "../assets/Contact-us.jpg";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <div className="row">
        <div className="col-md-6">
          {/* Image */}
          <img
            src={ContactUsImage}
            alt="Contact"
            className="img-fluid"
            b
            style={{ paddingTop: "90px" }}
          />
        </div>
        <div className="col-md-6" style={{ paddingTop: "80px" }}>
          {" "}
          {/* Add padding top */}
          {/* Contact Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Contact;
