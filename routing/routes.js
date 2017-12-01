const db = require("../models");
const express = require("express");

// Require request and cheerio. This makes the scraping possible
const request = require("request");
const logger = require("morgan");
const cheerio = require("cheerio");

module.exports = function (app) {

    //Homepage route
    app.get('/', function (req, res) {
        res.render("index", { title: "home" })
    })

    //Route to display all articles scraped 
    app.get('/view', function (req, res){
        db.Article.find({})
        .populate('notes')
        .then((articles) => {
            console.log("am i here yet??")
            console.log(articles)
            res.render("viewArticles", {article: articles})
        })        
    })
    
    
    // // Show how to delete an entry with db.[COLLECTION_NAME].remove()
    // db.places.remove({"country":"Morocco"})

    // // Show how to empty a collection with db.[COLLECTION_NAME].remove()
    // db.places.remove({})

    //Delete this article
    app.delete('/delete/:id', function(req, res){
        console.log(req.params.id)
        db.Article.findByIdAndRemove(req.params.id)
        .then(function(){
            console.log("delete article success")
        })
    })

    //Delete this article
    app.delete("/deleteNote/:id", function(req, res){
        db.Note.findByIdAndRemove(req.params.id)
        .then(function(){
            console.log("delete note success")
        })
    })

    //Route to add note
    app.post("/addNote/:id", function(req, res){             
        //create a new note and pass the req.body to the entry
        console.log(req.body)
        db.Note
            .create({body: req.body.addThisNote})
            .then(function(dbNote){                   
                console.log(dbNote)       
               return db.Article.findOneAndUpdate( 
                {_id: req.params.id}, 
                { $push: { notes: dbNote._id } }, 
                {new: true});
            })
            .then(function(dbArticle){                       
                console.log(dbArticle)
                res.json(dbArticle);
            })
            .catch(function(err){
                // If an error occurred, send it to the client
                res.json(err);
            });
        });
    
    //Route to find all notes for an article
    app.get('/readNotes/:id', function(req, res){        
        db.Article.findOne({_id: req.params.id})
        .populate("notes")
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err);
        });
    });
    
    //Route to scrape NPR Articles
    app.get('/scrape', function (req, res, next) {
        // First, we grab the body of the html with request 
        const createArticlesPromises = [];
        request("https://www.npr.org/", function (error, response, html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(html);

            //For each element with a story-text class    
            $(".story-text").each(function (i, each) {
                // const newArticle = {};      

                let thisHeadline = $(this).text().replace(/\s\s+/g, '');
                let thisSummary = $(this).find("a:nth-child(2)").text().trim();
                let thisArticleLink = $(this).find("a:nth-child(2)").attr("href")
                let thisWebsiteSection = $(this).find(".slug-wrap").find(".slug").find("a").text().replace(/\s\s+/g, '');

                // console.log(newArticle)
                newArticle = {
                    headline: thisHeadline,
                    summary: thisSummary,
                    articleLink: thisArticleLink,
                    websiteSection: thisWebsiteSection
                }

                createArticlesPromises.push(db.Article.create(newArticle));             
            });

            Promise.all(createArticlesPromises)
                .then(savedArticles => {
                    res.json(savedArticles);                                                                    
                })
                .catch(err => {
                    res.json(err);
                })
            })
        })

} //End of module.exports

