const express = require ("express");
const https= require("https");
const bodyParser = require("body-parser");


const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    
    res.sendFile(__dirname + "/index.html");
   
});

app.post("/", function(req,res){

    const query = req.body.cityName;
    const unit= "metric";
    const apiKey = "a018a618a9f5dad9b3809412573c7b07";
    const url="https://api.openweathermap.org/data/2.5/weather?units="+ unit+"&appid="+ apiKey+"&q="+ query;

    https.get(url,function(response){
        console.log(response.statusCode);


        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp
            const desc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl= "https://openweathermap.org/img/wn/" +icon+"@2x.png"
           res.write("<h1>The temperature in "+ query+ " is "+ temp + " degree celsius</h1>");
           res.write("<p>The weather  in "+ query + " is "+ desc + " </p>");
           res.write("<img src=" + imageUrl+">");

        })
    });
    
});


app.listen(3000,function(){
    console.log("server is running on port 3000.")
});

