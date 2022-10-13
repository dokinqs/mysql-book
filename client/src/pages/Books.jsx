import React, { useState, useEffect } from "react";
import axios from "axios";
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

      <div className="books-container">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.img && <img src={book.img} alt={book.id} />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>${book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            {/* <button className="update">Update</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
