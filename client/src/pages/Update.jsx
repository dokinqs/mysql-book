import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Update.css";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    img: "",
  });

  const navigate = useNavigate();

  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="update-div">
      <button className="link-books">
        <Link to="/">Home</Link>
      </button>
      <form className="form-update" onSubmit={handleClick}>
        <h1>Update Book Info</h1>
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
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default Update;
