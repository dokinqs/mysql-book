import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Add.css";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    img: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-div">
      <button className="link-books">
        <Link to="/">Home</Link>
      </button>
      {/* use onSubmit on form instead of onClick on submit button to use HTML5 validation in React */}
      <form className="form-add" onSubmit={handleClick}>
        <h1>Add a New Book</h1>
        <input
          type="text"
          placeholder="Title"
          name="title"
          maxLength="45"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Description"
          name="desc"
          maxLength="255"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          min="0"
          max="99"
          maxLength="3"
          pattern="[0-9]{2}"
          onChange={handleChange}
          required
        />
        <input
          type="Text"
          placeholder="Image"
          name="img"
          maxLength="200"
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default Add;
