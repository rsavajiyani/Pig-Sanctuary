//test html-routes page

// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads index.handlebars
    app.get("/", function (req, res) {
        res.render("index", {});
    });

    // admin route loads admin.handlebars
    app.get("/admin", function (req, res) {
        res.render("admin", {});
    });

     app.get("/adoptedpigs", function (req, res) {
         db.Pigs.findAll()
             .then(function (dbPig) {
                 console.log(dbPig);
                 var hbsObject = {
                     pig: dbPig
                 };
                 return res.render("adoptedpigs", hbsObject);
             });
         
     });

    app.get("/pigpage", function (req, res) {
        db.Pigs.findAll()
            .then(function (dbPig) {
                console.log(dbPig);
                var hbsObject = { pig: dbPig };
                return res.render("pigpage", hbsObject);
            });
    });

    app.get("/contactus", function (req, res) {
        res.render("contactus", {});
    });

    app.post('/adopt', function (req, res) {
        db.Pigs.update({
            isAdopted: true
        }, {
            where: {
                id: req.body.pig_id
            }
        }).then(function (dbPig) {
            console.log(dbPig);
            res.redirect("pigpage");
        })
    });

    app.get("/ourmission", function (req, res) {
        res.render("ourmission", {});
    });

    app.get("/pigcare", function (req, res) {
        res.render("pigcare", {});
    });

    app.get("/volunteer", function (req, res) {
        res.render("volunteer", {});
    });

};
