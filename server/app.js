var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost/opptane_stations');
mongoose.model('Station', new Schema({ "name": String, "address": String}, {collection: 'stations'}));
var Station = mongoose.model('Station');

mongoose.model('Stationadded', new Schema({ "name": String, "street": String, "city": String, "state": String, "zip": String, "number": String}, {collection: 'client_added_stations'}));
var Stationadded = mongoose.model('Stationadded');

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));


app.get('/data', function(req,res){
        Station.find({"type": "FeatureCollection"}, function(err, data){
            if (err) console.log(err);
            console.log(data);
            res.json(data);
        })
    });


app.post('/data', function(req,res){
    console.log(req);
    var addedStation = new Stationadded({
        "name" : req.body.station_name,
        "street" : req.body.station_street,
        "city" : req.body.station_city,
        "state" : req.body.station_state,
        "zip" : req.body.station_zip,
        "number" : req.body.station_number
    });

    addedStation.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});


//app.post('/data', function(req,res){
//    console.log(req);
//    console.log(res);
//});

app.get('/*', function(req, res){
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file));
});

app.listen(app.get('port'), function(){
    console.log("Meow listening to port: ", app.get('port'));
});


module.exports = app;