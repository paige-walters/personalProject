var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/opptane_stations');
mongoose.model('Station', new Schema({ "name": String, "address": String}, {collection: 'stations'}));
var Station = mongoose.model('Station');

app.set('port', process.env.PORT || 5000);


app.get('/data', function(req,res){
        Station.find({}, function(err, data){
            if (err) console.log(err);
            console.log(data);
            res.send(data);
        })
    });

app.get('/*', function(req, res){
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file));
});

app.listen(app.get('port'), function(){
    console.log("Listening to port: ", app.get('port'));
});