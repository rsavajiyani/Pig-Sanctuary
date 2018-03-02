var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");

var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Sets up the Express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());


app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM

// Static directory to be served
app.use(express.static("./public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views/partials')
);



// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Here we introduce HTML routing to serve different HTML files
require("./routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
// app.listen(PORT, function () {
//     console.log("App listening on PORT " + PORT);
// });

db.sequelize.sync().then(function () {
    app.listen(PORT);
    console.log("listening on port:" + PORT);
})