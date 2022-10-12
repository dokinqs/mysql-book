import express from "express";
// import mysql from "mysql";
// solves mysql pw auth problem code: 'ER_NOT_SUPPORTED_AUTH_MODE'
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
  const q = "INSERT INTO books (`title`, `desc`, `img`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.img];
  // have to put brackets around [values]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created.");
  });
});

app.listen(9000, () => {
  console.log("Connected to backend.");
});
