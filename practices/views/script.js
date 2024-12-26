const express = require("express");
const app = express();
const expressSession = require('express-session')
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

app.set('view engine','ejs');
// app.use(cookieParser())

app.use(expressSession({
    secret: "random stuff",
    resave: false,
    saveUninitialized: false
}))

// app.use(flash())

// app.use(function(req,res,next){
//     console.log("this is middleware");
//     next();
// })

// app.get("/error", function(req,res,next){
//     let message = req.flash('error');
//     res.send(message);
// })

app.get("/",function(req,res){
    // req.flash("error","Invalid Credentials")
    // res.redirect("/error")
    res.render("index")
})

app.get("/about/:username",function(req,res){
    res.send(`this page belongs to the Admin of the page ${req.params.username}`);
})



app.get("/banned",function(req,res,next){
    res.cookie("name","Abhishek")
    res.send("Banned form the page");
})

app.get("/create",function(req,res,next){
    // req.session.polo =true;
    res.send("Done");
})

// app.get("/check",function(req,res,nest){
//     console.log(req.cookies.banned);
//     res.send("this is cookies")
// })

// app.get("*",function(req,res){
//     res.send("Mai toh hoon hi");
// })

app.listen(3000);