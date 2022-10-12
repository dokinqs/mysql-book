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
      } catch (e) {
        console.log(e);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book Club</h1>
      <div className="books-container">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.img && <img src={book.img} alt={book.id} />}
            {/* <div> */}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
