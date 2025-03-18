const express = require('express');
const https = require("https");
const app = express();

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=9c4e445b1c53589821cb95c2684b57a9";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            res.write("The temperature in Bengaluru is " + temp + " degrees\n");
            res.write("The weather description is " + description);
            res.send();
        });
    });
});

app.listen(3060, function(){
    console.log("server is running at 3060");
});