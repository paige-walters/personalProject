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

mongoose.model('approvedStation', new Schema( { "type": String, "geometry": Object, "properties": Object, "name": String, "address": String}, {collection: 'stations'}));
var approvedStation = mongoose.model('approvedStation');

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

//get call for the stations collection in the db

app.get('/data', function(req,res){
        Station.find({}, function(err, data){
            if (err) console.log(err);
            console.log(data);
            res.json(data);
        })
    });

//get call to the client_added_stations for any new stations a client has submitted
//used to populate the table in the admin view

app.get('/admin', function(req,res){
    Stationadded.find({}, function(err, data){
        if (err) console.log(err);
        console.log(data);
        res.json(data);
    })
});
app.get('/adminadded', function(req,res){
    //console.log("this is the req.query ", req.query);

    Stationadded.findOne({"_id" : req.query.id}, function(err, data){
        if (err) console.log(err);
        console.log("Is this is the data I wanted back from my click", data);
        res.send(data);
    })
});

app.get('/search', function(req,res){
//    console.log("this is the req.query ", req.query);

    Station.find({$text: {$search: req.query.search}}, function(err, data){
        if (err) console.log(err);
        console.log("The search data", data);
        res.send(data);
    })
});

app.post('/data', function(req,res){
    //console.log(req);
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

app.post('/newStation', function(req,res){
    //console.log("this is the req", req);
    //console.log("is this a number or string?", req.body.geometry.coordinates);
    var lat = Number(req.body.geometry.coordinates[0]);
    var lng = Number(req.body.geometry.coordinates[1]);
    var cords = [lng, lat];
    //console.log(cords);

    var newStation = new approvedStation(

    {
        "type": "Feature",
            "geometry": {
            "type": "Point",
                "coordinates": cords
        },
        "properties": {
            "name": req.body.properties.name,
                "address": req.body.properties.address

        }
    });


    newStation.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});


app.delete('/delete', function(req,res){
    //console.log('The delete call made it to the server');
    //console.log(req.body.id);

    Stationadded.findByIdAndRemove({"_id" : req.body.id}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });


});

app.delete('/deleteAfterApproval', function(req,res){
    console.log('The delete call made it to the server');
    console.log(req.body._id);

    Stationadded.findByIdAndRemove({"_id" : req.body._id}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });


});

app.delete('/deleteStation', function(req,res){
    //console.log('The delete call made it to the server');
    //console.log(req.body.id);

    Station.findByIdAndRemove({"_id" : req.body.id}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });


});



app.get('/*', function(req, res){
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file));
});

app.listen(app.get('port'), function(){
    console.log("Meow listening to port: ", app.get('port'));
});


module.exports = app;