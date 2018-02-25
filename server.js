var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var app = express();
var path = require("path");

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

// Static directory to be served
app.use(express.static("./public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.engine('html', require('handlebars').__express);
// app.set('views', __dirname + '/views/*');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'handlebars');


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