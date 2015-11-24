$(document).ready(function(){
    console.log("Up and running!");
    getData();
    initMap();
});

var map;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.832683, lng: -93.300426},
        zoom: 10
    });
}

function getData(){
    $.ajax({
        type: "GET",
        url: "/data",
        //data: values,
        success: function(data){
            console.log(data);
        }
    })

}
