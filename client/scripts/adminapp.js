$(document).ready(function(){
    getData();


});



function getData(){
    $.ajax({
        type: "GET",
        url: "/data",
        //data: data,
        success: function(data){
            console.log(data);
            adminData(data);
        }
    })

}

function adminData (stationsOnMap) {
    for(var i = 0; i < stationsOnMap[0].features.length; i++){
        console.log(stationsOnMap[0].features[i].properties.name);
        $('#station').append("<tr></tr>" + "<td>" + i + "</td>" + "<td>" + stationsOnMap[0].features[i].properties.name + "</td>" + "<td>" + stationsOnMap[0].features[i].properties.address + "</td>" + "<td><button class='#b71c1c red darken-4'><i class='material-icons'>delete</i></button>");

    }

}

