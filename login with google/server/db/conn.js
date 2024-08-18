//create connection

const mongoose = require("mongoose");

const dburl = process.env.DATABASE;
mongoose
  .connect(dburl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })

  .then(() => console.log("MongoDB Connected..."))
  .catch(() => console.log("MongoDB Connect Failed"));
