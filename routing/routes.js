const db = require("../models");
const express = require("express");

// Require request and cheerio. This makes the scraping possible
const request = require("request");
const logger = require("morgan");
const cheerio = require("cheerio");
var axios = require("axios");


module.exports = function(app){

app.get('/', function(req, res){
    res.render("index", {title: "home"})
})

//Route to scrape NPR Articles
app.get('/scrape', function(req, res, next){
// First, we grab the body of the html with request
// error, response, html
    request("https://www.npr.org/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(html);

    createPromise = [];

    //For each element with a story-text class    
    $(".story-text").each(function(i, each){        
        const newArticle = {};      

        newArticle.headline = $(this).text().replace(/\s\s+/g, '');
        newArticle.websiteSection = $(this).find(".slug-wrap").find(".slug").find("a").text().replace(/\s\s+/g, '');
        newArticle.articleLink = $(this).find("a:nth-child(2)").attr("href")
        newArticle.summary = $(this).find("a:nth-child(2)").text().trim();
        
        createPromise.push(db.Article.create(newArticle).then(function(dbArticle){
                Promise.all(createPromise).then(function(dbArticle, err){
                    if (err){
                        return res.send();
                    }
                    res.render("index")                          
                        });                
                    })
                )
            })
        })
    })
       
} //End of module.exports

