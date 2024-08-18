// server.js
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");
const User = require("./models/UserSchema");
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passport");
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mern-auth", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

app.use(
  cookieSession({
    name: "authSession",
    keys: ["rebyb-keys-auth"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Enable cookies
    methods: ["GET", "POST", "PUT", "PATCH"], //
  })
);

const port = process.env.PORT || 5000;

const client = new OAuth2Client(process.env.CLIENT_ID);

// Google OAuth endpoint
app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { sub, email, name } = ticket.getPayload();

  let user = await User.findOne({ googleId: sub });
  if (!user) {
    user = new User({
      googleId: sub,
      displayName: name,
      email: email,
    });
    await user.save();
  }

  req.login(user, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(user);
  });
});

// Routes
app.get("/api/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/api/auth/user", (req, res) => {
  res.json(req.user || null);
});

app.listen(port, () => {
  console.log("Server running on http://localhost:5000");
});
