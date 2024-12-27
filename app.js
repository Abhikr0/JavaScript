const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))


app.post("/createFile", function(req,res,next){
        
    // get data form create page 
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send("Both title and description are required.");
    }

        // get date form system 
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        var date = `${day}-${month}-${year}.txt`;

        fs.writeFile(`./files/${date}`,req.body.title,function(err){
            if(err) return res.send(err);
        })

        fs.appendFile(`./files/${date}`,"\r\n"+req.body.description,function(err){
            if(err) return res.send(err);

        })
        res.redirect("/")
})


app.get("/create", function(req,res,next){
    res.render("create");
})

app.get("/", function(req,res,next){
    fs.readdir(`./files`,function(err,files){
        res.render("home",{files});
    })
})

app.get("/edit/:filename", function(req,res,next){
        fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
            if(err) return res.send(err);
            res.render("edit",{data,filename:req.params.filename})
        })
    // res.send("this is the main page");
})

app.get("/view/:filename", function(req,res,next){

    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        if(err) return res.send(err);

        res.render("view",{data,filename:req.params.filename})
        
    })
// res.send("this is the main page");
})

app.post("/update/:filename", function(req,res,next){
    fs.writeFile(`./files/${req.params.filename}`,req.body.details,function(err){
        if(err) return res.send(err);
        res.redirect("/")
    })

})

app.get("/delete/:filename", function(req,res,next){
    fs.unlink(`./files/${req.params.filename}`,function(err){
        if(err) return res.send(err);
        res.redirect("/")
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
    