"use strict";
const express = require('express'), path = require('path');
const PORT = process.env.PORT || 4000;
const app = express();
console.log(`Server running on Port: ${PORT}`);
// Initializing app uses
app.use(express.static('./public'));
// Index Page
app.route("/")
    .get((req, res) => res.sendFile(path.join(__dirname, "../html/index.html")))
    .post((req, res) => res.send("YOU POSTED SOMETHING"));
app.listen(PORT);
