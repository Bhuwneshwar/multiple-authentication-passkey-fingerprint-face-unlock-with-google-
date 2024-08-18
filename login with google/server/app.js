require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 6005;

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
require("./db/conn");
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
