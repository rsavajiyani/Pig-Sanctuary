//routes.js serves as our controller/router
//we combined API and HTML routes in one file as 

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var validatePhoneNumber = require("./validator");

// Routes
// =============================================================
module.exports = function (app) {

    // index route loads index.handlebars
    app.get("/", function (req, res) {
        res.render("index", {});
    });

    // admin route loads admin.handlebars and executes a sequelize query that displays all pigs in the database
    app.get("/admin", function (req, res) {
        db.Pigs.findAll()
            .then(function (dbPig) {
                // console.log(dbPig);
                var hbsObject = {
                    pig: dbPig
                };
                return res.render("admin", hbsObject);
            });
    });

    //deletepig route deletes the pig object that matches the pig_id that's passed in the request
    //it then reloads the /admin page
    app.delete("/deletepig", function (req, res) {
        // We just have to specify which pig we want to destroy with "where"
        // console.log("delete route hit");
        // console.log(req);
        db.Pigs.destroy({
            where: {
                id: req.body.pig_id
            }
        }).then(function (dbPig) {
            res.redirect("/admin");
        });
    });

    //adoptedpigs route fetches all pigs in the table 
    //on the adoptedpigs handlebars page, if/unless handlebars helpers are used to display only the adopted pigs
    app.get("/adoptedpigs", function (req, res) {
        db.Pigs.findAll()
            .then(function (dbPig) {
                //  console.log(dbPig);
                var hbsObject = {
                    pig: dbPig
                };
                return res.render("adoptedpigs", hbsObject);
            });

    });

    //viewcontacts route finds all people in the people table and passes them to the viewcontacts handlebars page
    app.get("/viewcontacts", function (req, res) {
        db.People.findAll()
            .then(function (dbContact) {
                // console.log(dbContact);
                var hbsObject = {
                    person: dbContact
                };
                return res.render("viewcontacts", hbsObject);
            });
    });

    //pigpage route finds all pigs in the pig table and passes them to the pigpage handlebars page
    app.get("/pigpage", function (req, res) {
        db.Pigs.findAll()
            .then(function (dbPig) {
                // console.log(dbPig);
                var hbsObject = {
                    pig: dbPig
                };
                return res.render("pigpage", hbsObject);
            });
    });

    //addpig route creates a pig object using the .create sequelize call, using the parameters passed through the request
    //it then redirects to the admin handlebars page
    app.post("/addpig", function (req, res) {
        // console.log(req.body);
        db.Pigs.create({
            pigName: req.body.pigName,
            pigAge: req.body.pigAge,
            pigGender: req.body.pigGender,
            pigImage: req.body.pigImage,
            pigColor: req.body.pigColor,
            pigBio: req.body.pigBio
        })
            .then(function (dbPig) {
                // console.log(dbPig);
                // res.json(dbPig);
                res.redirect("admin");
            });
    });

    //addcontact route creates a 'people' object using the .create sequelize call, using the parameters passed through the request
    app.post("/addcontact", function (req, res) {
        isValid = validatePhoneNumber(req.body.phone);
        if (isValid) {
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
                    res.redirect("sweetalertconfirm")
                });
        } else {
            res.redirect("sweetalerterror");
            // res.status(400).jsonp({ error: 'Your phone number is invalid' });
        }

    });

    app.get("/sweetalerterror", function (req, res) {
        res.render("sweetalerterror", {});
    });

    app.get("/sweetalertconfirm", function (req, res) {
        res.render("sweetalertconfirm", {});
    });

    (event) => sweetAlert(event);

    //adopt route updates the pig object's isAdopted boolean from false to true and then redirects to admin handlebars
    app.post('/adopt', function (req, res) {
        db.Pigs.update({
            isAdopted: true
        }, {
                where: {
                    id: req.body.pig_id
                }
            }).then(function (dbPig) {
                console.log(dbPig);
                res.redirect("admin");
            })
    });

    //adoptcontact route finds the pig object that matches the id sent through the request
    //it then sends that pig object to adoptcontact handlebars, which is a form the user can use to indicate interest in adopting that specific pig
    app.post('/adoptcontact', function (req, res) {
        db.Pigs.findAll({
            where: {
                id: req.body.pig_id
            }
        }).then(function (dbPig) {
            // console.log(dbPig);
            var hbsObject = {
                pig: dbPig
            };
            return res.render("adoptcontact", hbsObject);
        })
    });

    // /contact route updates a specific "people" object's contacted boolean from false to true
    //this route allows the administrator to keep track of who they have contacted/gotten back to
    //it then redirects to the viewcontacts handlebars page, which has a table that displays user contact info
    app.post('/contact', function (req, res) {
        // console.log('contact route hit');
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

    //search route finds all pigs matching the parameters sent through the request
    //the parameters are determined by the dropdown menus on the pigpage handlebars file
    //it then returns those pigs to the pigpage handlebars file
    app.post('/search', function (req, res) {
        console.log("search route hit");
        console.log(req.body);
        db.Pigs.findAll({
            where: req.body
        })
            .then(function (dbPig) {
                // console.log(dbPig);
                var hbsObject = {
                    pig: dbPig
                };
                res.render("pigpage", hbsObject);
            });
    });

    //loads the contactus handlebars file which is a contact form for the user to enter their information
    app.get("/contactus", function (req, res) {
        res.render("contactus", {});
    });

   

    

    // app.get('/confirmation', function (req, res) {
    //     res.render("confirmation.handlebars", {});
    // });

    //ourmission route loads the ourmission handlebars page
    app.get("/ourmission", function (req, res) {
        res.render("ourmission", {});
    });

    //pigcare route loads the pigcare handlebars page
    app.get("/pigcare", function (req, res) {
        res.render("pigcare", {});
    });

    //volunteer route loads the volunteer handlebars page
    app.get("/volunteer", function (req, res) {
        res.render("volunteer", {});
    });

    //adminlogin route loads the adminlogin handlebars page
    app.get("/adminlogin", function (req, res) {
        res.render("adminlogin", {});
    });
};