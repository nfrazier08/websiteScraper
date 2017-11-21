const db = require("../models");

// Require request and cheerio. This makes the scraping possible
const request = require("request");
const logger = require("morgan");
const cheerio = require("cheerio");


module.exports = function(app){

app.get('/', function(req, res){
    res.render("index", {title: "home"})
})

//Route to scrape NPR Articles
app.get('/scrape', function(req, res){
// First, we grab the body of the html with request
    request("https://www.npr.org/", function(error, response, html){
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(html);
    //For each element with a story-text class
    $(".story-text").each(function(i, element) {
        // Save an empty result object
        let result = {};
        
        let tempTitle = $(this).text();
        let headline = '';
        if(tempTitle){
            headline = tempTitle.replace(/\s\s+/g, '');
        }

        // summary, articleLink, photoLink,
        result.headline = headline;
        result.websiteSection = $(this).find(".slug-wrap").find(".slug").find("a").text().replace(/\s\s+/g, '');
        // result.articleLink = $(this).find("a").attr("href");
        result.summary =$(this).find("a").find('.2')
        console.log(result)

        //*[@id="story561845052"]/div/div/a[2]

    // db.Article
    //     .create(result)        
    //     .then(function(dbArticle){
    //         // If we were able to successfully scrape and save an Article, send a message to the client
    //         console.log("Scrape Complete");
    //         console.log(dbArticle)
    //         res.json(dbArticle)            
    //         })
    //     .catch(function(err) {
    //         // If an error occurred, send it to the client
    //         console.log(err);
    //         res.json(err);
    //         })
        })
    })
})







}//End of exports
