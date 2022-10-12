import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  // console.log(book);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/books", book);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="add-div">
      <form className="form-add">
        <h1>Add a New Book</h1>
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="desc"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          onChange={handleChange}
        />
        <input
          type="Text"
          placeholder="Image"
          name="img"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleClick}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Add;
