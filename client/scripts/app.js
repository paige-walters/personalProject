var globaldata = [];
var map;

$(document).ready(function(){
    console.log("Up and running!");

    initMap();
    getData();
    geolocationBtn();


});

function getData(){
    $.ajax({
        type: "GET",
        url: "/data",
        dataType: 'json',
        success: function(data){
            globaldata = data;
            console.log("I got the data", globaldata);

            addDataToMap(globaldata);
            //dropDownList(globaldata);

        }
    })

}


function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.87608, lng: -93.329406},
        zoom: 10
    });

}
//
//
//function dropDownList(stationsOnMap){
//
//
//    for(var i = 0; i < stationsOnMap.features.length; i++){
//        $('#dropdownlist').append("<option>" + i + " - " + stationsOnMap.features[i].properties.name + "</option>");
//
//    }
//
//
//
//    $('select').material_select();
//
//}
function addDataToMap(data) {
    for(var i=0; i < data.length; i++){
        console.log("in le loop", data[i]);
        map.data.addGeoJson(data[i]);
    }


    console.log("Look at me! This is the format the data is in when the annotations on the map are loaded", data);

    // global infowindow
    var infowindow = new google.maps.InfoWindow();

    // When the user clicks, open an infowindow
    map.data.addListener('click', function(event) {
        var myHTML = event.feature.getProperty("name");
        var myHTML2 = event.feature.getProperty("address");
        infowindow.setContent("<div style='width:150px; text-align: center;'>"+myHTML+ " <br>"+myHTML2+"</div>");
        infowindow.setPosition(event.feature.getGeometry().get());
        infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
        infowindow.open(map);
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
                map.setZoom(12);
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






