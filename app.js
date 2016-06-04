var express = require('express'); //using express
var app = express();

app.use(express.static(__dirname + "/public"));

var YQL = require('yql'); //loading YQL

app.get('/cityInfo/:cityName', function (req, res) {
    var cityName = req.params.cityName; // cityName param for query

    var query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + cityName + '")');

    query.exec(function (err, data) {
        var result = {
            condition: data.query.results.channel.item.condition,
            location: data.query.results.channel.location,
            item: data.query.results.channel.item,
            atmosphere: data.query.results.channel.atmosphere,
            astronomy: data.query.results.channel.astronomy,
            wind: data.query.results.channel.wind,
            units: data.query.results.channel.units
        };
        return res.json(result); //parsing all data to JSON and return it
    });
});
app.listen(3000); // for localhost:3000

