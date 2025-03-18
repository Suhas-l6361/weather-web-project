const express = require('express');
const https = require("https");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/try.html");
});

app.post("/", function(req, res){
    var num1 = parseFloat(req.body.num1);
    var num2 = parseFloat(req.body.num2);
    var result = num1 + num2;
    res.send("The result of the calculation is " + result);
});


app.listen(3000, function(){
    console.log("server is running at 3000");
});
