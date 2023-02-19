const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var city = req.body.cityName;
  const apiKey = "eeaf798e0c0b551ae0f6ecf009710584";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=" +
    units +
    "&appid=" +
    apiKey;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherReport = JSON.parse(data);
      const temp = weatherReport.main.temp;
      const weather = weatherReport.weather[0].description;
      const country = weatherReport.sys.country;
      const icon = weatherReport.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>Country Code: " + country + "</p>");
      res.write("<p>The current weather is " + weather + ".</p>");
      res.write(
        "<h1>The Tempreture in " +
        city +
        " is " +
        temp +
        " degree Celsius.</h1>"
      );
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
