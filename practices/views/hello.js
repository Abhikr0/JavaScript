const express = require("express");
const app = express();

var data = [1,2,3,4,5,6]
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');

app.get("/",function(req,res,next){
    try{
        res.send(hey)
    }catch(err){
        next(err)
    }
})

app.post("/data/:number",function(req,res){
    data.push(parseInt(req.params.number))
    res.send(data)
})

app.use((err,req,res,next)=>{
    res.status(500).send(err.message)
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});