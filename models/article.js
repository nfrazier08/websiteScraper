//Model for the article collection
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String, 
        trim: true, 
        // unique: true
    },
    summary: {
        type: String, 
        trim: true
    }, 
    articleLink: {
        type: String,
        trim: true        
    }, 
    photoLink: {
        type: String, 
        trim: true
    }, 
    websiteSection: {
        type: String,
        trim: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the User model
module.exports = Article;