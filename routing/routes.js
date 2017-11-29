const db = require("../models");
const express = require("express");

// Require request and cheerio. This makes the scraping possible
const request = require("request");
const logger = require("morgan");
const cheerio = require("cheerio");
var axios = require("axios");


module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render("index", { title: "home" })
    })

    app.get('/view', function (req, res){
        db.Article.find({})
        // .populate
        .then((articles) => {
            console.log("am i here yet??")
            console.log(articles)
            res.render("viewArticles", {article: articles})
        })        
    })



    //Route to scrape NPR Articles
    app.get('/scrape', function (req, res, next) {
        // First, we grab the body of the html with request
        // error, response, html

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

