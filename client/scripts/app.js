$(document).ready(function(){
    console.log("Up and running!");
    getData();
    initMap();
    geolocationBtn();

});

var map;
var stationsOnMap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.832683, lng: -93.300426},
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
        console.log(stationsOnMap[0].features[i].properties.name);
        $('#dropdownlist').append("<option>" + stationsOnMap[0].features[i].properties.name + "</option>");

    }
    //
    //$('.dropdown-toggle').dropdown();

}


function getData(){
    $.ajax({
        type: "GET",
        url: "/data",
        //data: data,
        success: function(data){
            //console.log(data);
            stationsOnMap = data;
            console.log(stationsOnMap[0]);
            dropDownList(stationsOnMap);
        }
    })

}
