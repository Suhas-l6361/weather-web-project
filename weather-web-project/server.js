const express = require('express');
const https = require("https");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/try.html");
    console.log("GET request received");
});

app.post("/", function(req, res){
    console.log("POST request received");
    var city = req.body.city;
    console.log(`City: ${city}`);
    const appid = "9c4e445b1c53589821cb95c2684b57a9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`;
    
    https.get(url, function(response){
        console.log(`Status Code: ${response.statusCode}`);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp - 273.15; // Convert from Kelvin to Celsius
            const description = weatherData.weather[0].description;
            res.write(`The temperature in ${city} is ${temp.toFixed(2)} degrees Celsius\n`);
            res.write(`The weather description is ${description}`);
            res.send();
        });
    });
});

app.listen(3050, function(){
    console.log("Server is running at port http://localhost:3050");
});
