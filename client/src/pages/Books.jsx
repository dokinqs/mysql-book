import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:9000/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="books-div">
      <h1>Book Club</h1>
      <button className="link-add">
        <Link to="/add">+ Add Book</Link>
      </button>
      <div className="books-container">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <div className="img-container">
              {book.img && <img src={book.img} alt={book.id} />}
              {!book.img && (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                  alt="no img"
                />
              )}
            </div>
            <h3>{book.title}</h3>
            <p className="desc">{book.desc}</p>
            <span>${book.price}</span>
            <div className="clearfix">
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${book.id}`}>Update</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
