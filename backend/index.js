import express from "express";
// mysql2 solves mysql pw auth problem code: 'ER_NOT_SUPPORTED_AUTH_MODE'
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "meSQLCRUD1",
  database: "test",
});

// so can send json with thunderclient
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, I'm the backend.");
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  // MySQL ? for binding params, avoids SQL injection
  const q = "INSERT INTO books (`title`, `desc`, `price`, `img`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.price, req.body.img];

  // brackets around [values] column name reserved word, explicitly declares an object name
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created.");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc`= ?, `price`= ?, `img` = ? WHERE id = ? ";
  const values = [req.body.title, req.body.desc, req.body.price, req.body.img];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated.");
  });
});

app.listen(9000, () => {
  console.log("Connected to backend.");
});
