import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

const Form = () => {
  const [formState, setFormState] = useState({
    name: "",
    size: "",
    Pepperoni: false,
    Sausage: false,
    Onions: false,
    Olives: false,
    instructions: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    Pepperoni: "",
    Sausage: "",
    Onions: "",
    Olives: "",
    instructions: "",
  });

  const [serverError, setServerError] = useState("");

  const [order, setOrder] = useState([]);

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };
  const formSubmit = (e) => {
    e.preventDefault(); //prevents the attempt to submit the form to the server
    console.log("form submitted");
    axios
      .post("https://reqres.in/api/order", formState)
      .then((res) => {
        console.log("Your order:", res.data); // Verify using a `console.log()` that you are receiving a successful response back from POST request

        //using spread to add new members to array

        // update state with value from API to display in <pre>
        setOrder([...order, res.data]);

        console.log("order", order);
        // if successful request, clear any server errors
        setServerError(null);

        //clear state

        setFormState({
          name: "",
          size: "",
          Pepperoni: false,
          Sausage: false,
          Onions: false,
          Olives: false,
          instructions: "",
        });
      })
      .catch((err) => {
        setServerError("There was an error retreiving data");
        console.log(err);
      });
  };

  const inputChange = (e) => {
    e.persist();
    console.log("input changed", e.target.value);
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e);
    setFormState(newFormData);
  };

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters."),
    size: yup.string().oneOf(["small", "medium", "large"]),
    Pepperoni: yup.bool(),
    Sausage: yup.bool(),
    Onions: yup.bool(),
    Olives: yup.bool(),
    instructions: yup.string(),
  });
  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
      setButtonDisabled(!isValid);
    });
  }, [formState]);
  return (
    <form onSubmit={formSubmit}>
      {serverError ? <p className="error">{serverError}</p> : null}
      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <div className="formElement">
        <label htmlFor="name">
          <h3>Name</h3>
          <input
            data-cy="name"
            className="input"
            id="name"
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </label>
        <div className="formElement">
          <label htmlFor="size">
            <h3>Size</h3>
            <select
              data-cy="size"
              id="size"
              name="size"
              onChange={inputChange}
              value={formState.size}
            >
              <option> Choose your size</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
            {errors.size.length > 0 ? (
              <p className="error">{errors.size}</p>
            ) : null}
          </label>
        </div>
        <div className="toppings">
          <h3>Toppings</h3>
          <label htmlFor="toppings">
            Pepperoni:{" "}
            <input
              className="checkbox"
              name="Pepperoni"
              input
              id="Pepperoni"
              type="checkbox"
              checked={formState.Pepperoni}
              onChange={inputChange}
            />
          </label>
          <label>
            Sausage:{" "}
            <input
              id="Sausage"
              name="Sausage"
              type="checkbox"
              checked={formState.Sausage}
              onChange={inputChange}
            />
          </label>
          <label>
            Onions:{" "}
            <input
              id="Onions"
              name="Onions"
              type="checkbox"
              checked={formState.Onions}
              onChange={inputChange}
            />
          </label>
          <label>
            Olives:{" "}
            <input
              className="checkbox"
              name="Olives"
              input
              id="Olives"
              type="checkbox"
              checked={formState.Olives}
              onChange={inputChange}
            />
          </label>
        </div>
        <div className="formElement">
          <h3>Instructions</h3>
          <label htmlFor="instructions">
            <textarea
              id="instructions"
              name="instructions"
              value={formState.instructions}
              onChange={inputChange}
            ></textarea>
          </label>
        </div>
        <div className="submit">
          <button data-cy="submit" disabled={buttonDisabled} type="submit">
            Add to Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
