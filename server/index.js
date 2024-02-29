const { db } = require("./db/connection");
const app = require("./app");

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
