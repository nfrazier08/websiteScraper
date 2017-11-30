//Model for the article collection
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String, 
        trim: true, 
        //Not supposed to have same article in the database twice, but when I add this, I keep getting this error:
            //E11000 duplicate key error collection: scraper.articles index: headline_1 dup key: { : null }',
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
    websiteSection: {
        type: String,
        trim: true
    }, 
    notes: [
        {
          // Store ObjectIds in the array
          type: Schema.Types.ObjectId,
          // The ObjectIds will refer to the ids in the Note model
          ref: "Note"
        }
      ]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the User model
module.exports = Article;