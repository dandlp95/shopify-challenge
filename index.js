const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const path = require("path");


mongoose.connect(process.env.MONGO_URI).then(() => {

  app
    // Middleware to process requests.
   .use(cors())
   .use(express.json())
   // the backend URI is used to communicate with the server.
   .use("/backend", require("./routes"));

  if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));

    })

  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

