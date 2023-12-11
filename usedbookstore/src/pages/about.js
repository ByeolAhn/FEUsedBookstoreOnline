import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "../assets/About-us.png";
const About = () => {
  return (
    <div className="container">
      <div className="col-md-6">
        {/* Image */}
        <img
          src={aboutImage}
          alt="About Us"
          className="img-fluid"
          style={{ paddingTop: "100px" }}
        />
      </div>
      <h1>About Used Books Web Application</h1>
      <p>
        Welcome to UsedBooks, a platform designed for individuals to either give
        away or sell their used books. Owned and managed by the innovative
        software engineering group, Algorithm Avengers, we strive to create a
        community-driven space for book enthusiasts.
      </p>

      <h2>About Algorithm Avengers:</h2>
      <p>
        Algorithm Avengers is a dynamic team of talented individuals passionate
        about technology and its impact on society. Our group is comprised of:
      </p>
      <ul>
        <li>Aniebonam Vivianzzzz</li>
        <li>Sarjo Manneh</li>
        <li>Oladega Farouk</li>
        <li>Sua Cha</li>
        <li>Byeol Ahn</li>
      </ul>

      <p>
        Our mission is to revolutionize the way people access and share
        knowledge. UsedBooks is our brainchild, born out of the desire to create
        a sustainable ecosystem where books find new homes and individuals
        discover the joy of sharing stories.
      </p>

      <p>
        We envision a future where every book contributes to someone's growth
        and learning journey. Join us in this endeavor as we aim to foster a
        culture of sharing and learning through the pages of pre-loved books.
      </p>

      <p>Thank you for being a part of our community!</p>
    </div>
  );
};

export default About;
