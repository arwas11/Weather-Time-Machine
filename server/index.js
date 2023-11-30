// const express = require("express");
// const dotenv = require("dotenv");
const { db } = require("./db/connection");
const app = require("./app");
// app = express();

// dotenv.config();
const PORT = 3000;

const init = async () => {
  try {
    app.listen(PORT, () => {
      db.sync();
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

init();
