$(document).ready(function(){
    initMap();
    console.log("Up and running!");
    getData();
    geolocationBtn();


});

//var mapPositions;

var stationsOnMap;


var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.87608, lng: -93.329406},
        zoom: 10
    });


}

function geolocationBtn() {

    $("#currentLocation").on("click", function () {
        console.log("click happened");
        var infoWindow = new google.maps.InfoWindow({map: map});

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('I spy with my 20,000 satellites...');
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

    });

}


function dropDownList(stationsOnMap){


    for(var i = 0; i < stationsOnMap[0].features.length; i++){
        //console.log(stationsOnMap[0].features[i].properties.name);
        $('#dropdownlist').append("<option>" + i + " - " + stationsOnMap[0].features[i].properties.name + "</option>");

    }
    $('select').material_select();

}


function getData(){
    $.ajax({
        type: "GET",
        url: "/data",
        //data: data,
        success: function(data){
            stationsOnMap = data;
            dropDownList(stationsOnMap);
        }
    })

}
//
//function mapMarkers (stationsOnMap) {
//
//
//
//    for (var i = 0; i < stationsOnMap[0].features.length; i++) {
//        //console.log(stationsOnMap[0].features[i].geometry.coordinates);
//
//        for (var p = 0; p < stationsOnMap[0].features[i].geometry.coordinates.length; p++) {
//            var temp = (stationsOnMap[0].features[i].geometry.coordinates[0]);
//            var temp2 = (stationsOnMap[0].features[i].geometry.coordinates[1]);
//        }
//            var tempObj = {lat: temp, lng: temp2};
//            mapPositions = tempObj;
//            console.log(mapPositions);
//
//
//    }
//
//
//}


