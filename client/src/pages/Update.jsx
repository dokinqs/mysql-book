import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Update.css";

const Update = ({ bookToEdit }) => {
  // const [book, setBook] = useState({
  //   title: "",
  //   desc: "",
  //   price: null,
  //   img: "",
  // });
  const [book, setBook] = useState({
    title: bookToEdit.title,
    desc: bookToEdit.desc,
    price: bookToEdit.price,
    img: bookToEdit.img,
  });

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

  // const getEdit = (book.id) => {
  //   let editedBook = books.filter((book) => book.id == bookId);
  //   console.log(editedBook);
  //   setBook(editedBook);
  // }

  // const [book, setBook] = useState(editedBook)
  // const handleEditing = (e) => {
  //   setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //   book.onChange(e.target.value)
  // }
  // useEffect(() => {
  //   setBook(editedBook)
  // }, [editedBook])

  // <input value={value} onChange={handleEditing} />;

  return (
    <div className="update-div">
      <button className="link-books">
        <Link to="/">Home</Link>
      </button>

      {/* <form className="form-update" onSubmit={handleClick}> */}
      {/* <UpdateForm key={book.id} book={book} /> */}
      <form className="form-update">
        {/* {books
          .filter((book) => book.id == bookId)
          .map((book) => ( */}
        <div key={book.id}>
          <h1>Update Book Info</h1>
          <input
            type="text"
            value={book.title}
            name="title"
            maxLength="45"
            onChange={(e) => {
              setBook((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            required
          />
          <input
            type="text"
            name="desc"
            value={book.desc}
            maxLength="255"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder={book.price}
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
            placeholder={book.img}
            name="img"
            maxLength="200"
            onChange={handleChange}
          />
        </div>
        {/* ))} */}

        <button type="submit" onClick={handleClick}>
          Update Book
        </button>
        {/* <button type="submit">Update Book</button> */}
      </form>
    </div>
  );
};

export default Update;
