const db = require("../models");
const express = require("express");

// Require request and cheerio. This makes the scraping possible
const request = require("request");
const logger = require("morgan");
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function(app){

app.get('/', function(req, res){
    res.render("index", {title: "home"})
})

//Route to scrape NPR Articles
app.get('/scrape', function(req, res){
// First, we grab the body of the html with request
// error, response, html
    request("https://www.npr.org/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response);

    var articleArray = [];

    //For each element with a story-text class    

    $(".story-text").each(function(i, each){        
        const newArticle = {};        
        newArticle.headline = $(this).text().replace(/\s\s+/g, '');
        newArticle.websiteSection = $(this).find(".slug-wrap").find(".slug").find("a").text().replace(/\s\s+/g, '');
        newArticle.articleLink = $(this).find("a:nth-child(2)").attr("href")
        newArticle.summary = $(this).find("a:nth-child(2)").text().trim();

        db.Article
            .create(newArticle)
            .then(function(dbArticle){
                console.log(newArticle)   
            })        
        })
    })
})






} //End of module.exports

//Push the newArticle object to the promist array
        // createPromise.push(db.Article.create(newArticle))
        // createPromise.push(newArticle)
        // createPromise.push(db.Article.create(newArticle))
        // console.log(createPromise)

        // Promise.all(createPromise).then(articlesScraped =>{
        //     res.json(articlesScraped)
        // }).catch(err =>{
        //     console.log(err)
        //     res.json(err)
        //         })        
// ***************************************
        // db.Article
        // .create(newArticle)
        // .then(function(dbArticle){
        // //Push the newArticle object to the promise array
        // // articleArray.push(newArticle)    
        // // console.log("***ARTICLE ARRAY***")        
        // // console.log(articleArray)            
        // // return res.render('index', articleArray)
        // res.send("scrape complete")
        // ***********************
        // Promise.all(articleArray).then(function(dbArticle))
        // .then(function(dbArticle){                
        //         console.log(newArticle)
        //         res.render('index', newArticle)
        //         })  
        // .catch(function(err){
        //         res.json(err)
        //         })        
        //     );       
        // *************************
        // articleArray.push(db.Article.create(newArticle)
        // .then(function(dbArticle){
        //     Promise.all(articleArray).then(function(dbArticle){
        //         return res.json(dbArticle)                    
        //     }).catch(function(err){
        //         res.json(err)                    
        //     })
        // })
        // *******************************
        // Promise.all(createPromise).then((article) => {
        //     // console.log("***You Got Here/Article***")
        //     // console.log(article)
        //     articleObj = {
        //         callThis: createPromise
        //     }
        //     console.log("**OBJ***")
        //     console.log(articleObj)
        //     // res.render("index", articleObj)
        // }).catch((err) =>{
        //     console.log(err)
        // })
        // *******************
        // const thisPromise = db.Article.create(newArticle);
        // createPromise.push(thisPromise);
        // console.log("**This is promise***")
        // console.log(createPromise)