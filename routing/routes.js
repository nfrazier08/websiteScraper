// const db = require("../models");

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
    $(".story-text").each(function(i, each){
        let result = {};

        result.headline = $(this).text().replace(/\s\s+/g, '');
        result.websiteSection = $(this).find(".slug-wrap").find(".slug").find("a").text().replace(/\s\s+/g, '');
        result.articleLink = $(this).find("a:nth-child(2)").attr("href")
        result.summary = $(this).find("a:nth-child(2)").text().trim();
        console.log(result)

      

    // db.Article
    //     .create(result)        
    //     .then(function(dbArticle){
    //         // If we were able to successfully scrape and save an Article, send a message to the client
    //         console.log("Scrape Complete");
    //         console.log(dbArticle)
    //         res.json(dbArticle)  
    //ADD A RETURN RES.JSON OR JUST A RETURN          
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


// const createPromise = []
// articles.forEach(()=>)
// const new Article {{}}

// createPromist.push(db.Article.create(newArticle)
// )

// Promise.all(createPromists).then(articlesCreated =>){
//     res.json(articlesCreated)
// }.catch()