require("dotenv").config();
const { db } = require("./db/db");
const app = require(".");

const PORT = process.env.PORT;

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
