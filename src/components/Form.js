import React from "react";
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <form>
      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <div className="formElement">
        <label>
          <h3>Name</h3>
          <input id="name" type="text" />
        </label>
        <div className="formElement">
          <label>
            <h3>Size</h3>
            <select id="size">
              <option> Choose your size</option>
              <option>small</option>
              <option>medium</option>
              <option>large</option>
            </select>
          </label>
        </div>
        <div className="toppings">
          <h3>Toppings</h3>
          <label>
            Pepperoni: <input className="checkbox" input id="Pepperoni" type="checkbox" />
          </label>
          <label>
            Sausage: <input id="Sausage" type="checkbox" />
          </label>
          <label>
            Onions: <input id="Onions" type="checkbox" />
          </label>
          <label>
            Olives: <input className="checkbox" input id="Olives" type="checkbox" />
          </label>
        </div>
        <div className="formElement">
          <h3>Instructions</h3>
          <textarea></textarea>
        </div>
        <div className="submit">
          <button>Add to Order</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
