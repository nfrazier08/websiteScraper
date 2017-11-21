const db = require("../models");

// Require request and cheerio. This makes the scraping possible
const request = require("request");
const logger = require("morgan");
const cheerio = require("cheerio");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");

module.exports = function(app){

//Route to scrape NPR Articles
app.get('/scrape', function(req, res){
// First, we grab the body of the html with request
axios.get("https://www.npr.org/").then(function(response){
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);
    // Now, we grab every h2 within an article tag, and do the following:
    $(".title").each(function(i, element) {
    // Save an empty result object
    let result = {};

    result.title = $(this);

    db.Article
        .create(result)        
        .then(function(dbArticle){
            // If we were able to successfully scrape and save an Article, send a message to the client
            console.log("Scrape Complete");
            console.log(result)
            // return res.send()            
            })
        .catch(function(err) {
            // If an error occurred, send it to the client
            console.log(err);
            res.json(err);
            })
        })
    })
})







}//End of exports
