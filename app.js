// app.js
const express = require("express");
const cors = require("cors");
const mongodb = require("./mongodb/mongodb.connect");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/auth.routes"); // <-- add this

mongodb.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ Status: "OK" });
});

// Auth endpoints (register/login)
app.use("/api/auth", authRoutes);

// Book endpoints
app.use("/api/books", bookRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;
