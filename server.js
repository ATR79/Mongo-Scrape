//Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//Set up port
var PORT = process.env.PORT || 3000;

//Initiate Express app
var app = express();

//Set up Ex Router
var router = express.Router();

 //Designate public folder as directory
app.use(express.static(__dirname + "/public"));

//Handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Use bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));

//Go through router
app.use(router);

//deployed db or mongoHeadlines
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect mongoose
mongoose.connect(db, function(error) {
    if(error) {
        console.log(error);
    }
    else{
        console.log("mongoose connection is successful");
    }
});

//Listen on port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});
