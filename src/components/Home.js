import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homepage">
      <h1>Want Pizza?</h1>
      <ul className="navbar">
        <li>
          <Link to="/pizza">Order Now</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
