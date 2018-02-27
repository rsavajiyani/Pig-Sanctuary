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
        db.Pigs.findAll()
            .then(function (dbPig) {
                console.log(dbPig);
                var hbsObject = {
                    pig: dbPig
                };
                return res.render("admin", hbsObject);
            });
       
    });

    app.delete("/deletepig", function (req, res) {
        // We just have to specify which pig we want to destroy with "where"
        console.log("delete route hit");
        console.log(req);
        db.Pigs.destroy({
            where: {
                id: req.body.pig_id
            }
        }).then(function (dbPig) {
            res.redirect("/admin");
        });
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

    app.get("/viewcontacts", function (req, res) {
        db.People.findAll()
            .then(function (dbContact) {
                console.log(dbContact);
                var hbsObject = {
                    person: dbContact
                };
                return res.render("viewcontacts", hbsObject);
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

    app.post("/addpig", function (req, res) {
        console.log(req.body);
        db.Pigs.create({
            pigName: req.body.pigName,
            pigAge: req.body.pigAge,
            pigGender: req.body.pigGender,
            pigImage: req.body.pigImage,
            pigColor: req.body.pigColor,
            pigBio: req.body.pigBio
        })
            .then(function (dbPig) {
                console.log(dbPig);
                // res.json(dbPig);
                res.redirect("admin");
            });
    });

    app.post("/addcontact", function (req, res) {
        console.log(req.body);
        db.People.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            isVolunteer: req.body.isVolunteer,
            message: req.body.message
        })
            .then(function (dbContact) {
                console.log(dbContact);
                res.redirect("confirmation")
            });
    });

    app.get('/confirmation', function (req, res) {
        res.render("confirmation.handlebars", {});
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

    app.post('/adoptcontact', function (req, res) {
        db.Pigs.findAll({
            where: {
                id: req.body.pig_id
            }
        }).then(function (dbPig) {
            console.log(dbPig);
            var hbsObject = { pig: dbPig };
            return res.render("adoptcontact", hbsObject);
    })
});

    app.post('/contact', function (req, res) {
        console.log('contact route hit');
        db.People.update({
            contacted: true
        }, {
                where: {
                    id: req.body.contact_id
                }
            }).then(function (dbContact) {

                console.log(dbContact);
                res.redirect("viewcontacts");
            })
    });

    app.get('/search', function (req, res) {
        console.log("search route hit");
        db.Pigs.findAll({
            where: {
                pigAge: req.body.pigAge,
                pigGender: req.body.pigGender,
                pigColor: req.body.pigColor
            }
        })
            .then(function (dbPig) {
                console.log(dbPig);
                var hbsObject = {
                    pig: dbPig
                };
                return res.render("pigpage", hbsObject);
            });
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
