// Create a server.js file and save all this code in that folder:
// REQUIRING PACKAGES
const express = require("express");
const bodyParser = require("body-parser");
const expressHandlebars = require("express-handlebars");
const mongoose = require("mongoose");

// SERVER PORT
var PORT = 3000;

// INSTANTIATING THE EXPRESS SERVER (LIKE ADDING WATER TO OATMEAL!)
var app = express();

// SPECIFIES THE DIRECTORY (FOLDER) FOR STATIC FILE
app.use(express.static(__dirname + "/public"));

// BODY PARSER MIDDLEWARE
// parse various different custom JSON types as JSON 
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer 
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string 
app.use(bodyParser.text({ type: 'text/html' }))

// parse application/json 
app.use(bodyParser.json())

// HANDLE THE "/" ROUTE BEING REQUESTED BY THE USER
app.get("/", function(req, res) {
    res.sendFile("./index.html");
});

// THE HOUSE ADDRESS OF WHERE THE SERVER IS LOCATED WHEN INITIATED
app.listen(PORT, function() {
    console.log("Listening at port: " + PORT);
});

// MONGOOOSE 
var db = mongoose.connection;

db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
});

db.once('open', function() {
    console.log('Mongoose connection successful.');
});

app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
})

// GET API
app.get('/api/saved', function(req, res) {

    Article.find({})
        .exec(function(err, doc) {

            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        })
});

// POST API
app.post('/api/saved', function(req, res) {

    var newArticle = new Article({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    });

    // NEW ARTICLE
    newArticle.save(function(err, doc) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(doc);
        }
    });

});

// DELETE 
app.delete('/api/saved/:id', function(req, res){

  Article.find({'_id': req.params.id}).remove()
    .exec(function(err, doc) {
      res.send(doc);
  });

});

