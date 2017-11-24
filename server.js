// Dependencies
const express = require("express");
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
// const mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
const request = require("request");
const cheerio = require("cheerio");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Database configuration
const databaseUrl = "scraper";
const collections = ["scrapedData"];

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scraper", {
  useMongoClient: true
});

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Require in models
const db = require('./models');

app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//Require in routes
require("./routing/routes.js")(app);

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });