const express = require('express');
const {db} = require('./backend/db/connection')
const app = express();


const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    
    app.listen(PORT, () => {
      db.sync();
      console.log(`Server listening at http://localhost:${PORT}`);
    });

    app.get('/', (req, res) => {
      res.send('Hello, TypeScript Express!');
    });
  } catch (error) {
    console.error('Error starting server:', error)
  }
};

init();
