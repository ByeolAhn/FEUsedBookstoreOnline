import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Contact from "./pages/contact";
import About from "./pages/about";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/js/all.min.js";

import AddBooks from "./components/books/AddBooks";
import EditBooks from "./components/books/EditBooks";
import DetailsBooks from "./components/books/DetailBooks";
import ListBooks from "./components/books/ListBooks";
import Footer from "./components/Footer";
import Signin from "./components/auth/signin";
import Registration from "./components/auth/Registration";
import PrivateRoute from "./components/auth/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="books/create" element={
          <PrivateRoute>
            <AddBooks /> 
          </PrivateRoute>} />
          <Route path="/books/update/:isbn" element={
          <PrivateRoute>
            <EditBooks />
          </PrivateRoute>} />
          <Route path="/books/details/:isbn" element={
          <PrivateRoute>
            <DetailsBooks />
          </PrivateRoute>} />
          <Route path="/books/get" element={<ListBooks />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/users/signin" element={<Signin />} />
          <Route path="/users/create" element={<Registration />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
