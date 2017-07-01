const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ArticleSchema = new Schema({
  title: {
    type: String,
    required: "Title is Required",
    trim: true
  },
  date: {
  	type: Date,
  	default: Date.now,
  	required: "Date is Required"
  },
  url: {
  	type: String,
  	required: true,
  	required: "URL is Required",
  	unique: true,
    trim: true
  }
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;