const db = require("../models");
const express = require("express");

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

        const createPromise = [];
        const newArticle = {};
        
        newArticle.headline = $(this).text().replace(/\s\s+/g, '');
        newArticle.websiteSection = $(this).find(".slug-wrap").find(".slug").find("a").text().replace(/\s\s+/g, '');
        newArticle.articleLink = $(this).find("a:nth-child(2)").attr("href")
        newArticle.summary = $(this).find("a:nth-child(2)").text().trim();

        //Are we getting articles in an object? YES!!
        // console.log("***Articles***")
        // console.log(newArticle)
        
        //Push the newArticle object to the promist array
        // createPromise.push(db.Article.create(newArticle))
        // createPromise.push(newArticle)
        createPromise.push(db.Article.create(newArticle))
        console.log(createPromise)

        // Promise.all(createPromise).then(articlesScraped =>{
        //     res.json(articlesScraped)
        // }).catch(err =>{
        //     console.log(err)
        //     res.json(err)
        //         })        
            })
        })
    })
}
