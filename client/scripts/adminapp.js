$(document).ready(function() {
    getData();
    $('#searchAdmin').submit(searchKeyword);
});


function searchKeyword() {
    console.log("why the fuck can't I do this?!");

    event.preventDefault();
    var values = {};

    $.each($(this).serializeArray(), function (i, field) {
        console.log("field in searchKeyword", field);
        values[field.name] = field.value;
    });

    console.log("this is values in searchKeyword", values);

    $.ajax({
        type: "GET",
        url: "/search",
        data: values,
        success: function (results) {
            console.log("Data back from search keyword", results);
            displaySearchResults(results);
        }
    });

}

function displaySearchResults (results) {
    //if results is empty what do?
    //if results doesn't match anything what do?
    //when the close button on the search bar is clicked all stations are displayed again

    console.log("I've made it to the search results function! Meow  display this shit!", results);
    $('#station').empty();
    for(var i = 0; i < results.length; i++){
        //console.log(stationsInDB[0].features[i].properties.name);
        $('#station').append("<tr class='content'></tr>" + "<td>" + i + "</td>" + "<td>" + results[i].properties.name + "</td>" +
            "<td>" + results[i].properties.address + "</td>" +
            "<td><button class='delete #b71c1c red darken-4' id='deleteStation'><i class='material-icons'>delete</i></button>");

    }

}


function getData(){
    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data){
            console.log(data);
            var stationsInDB = data;
            adminData(stationsInDB);
        }
    });

    $.ajax({
        type: "GET",
        url: "/admin",
        success: function(data){
            console.log(data);
            var clientAddedStations = data;
            console.log(clientAddedStations);
            clientData(clientAddedStations);

        }
    });


}


function deleteStation () {
    $('.delete').on('click', function(){
        console.log("clicked, clickedy, click!");

        var deletedId = {"id" : $(this).data("id")};

        console.log("Meaningful Log: ", deletedId);

        $.ajax({
            type: "DELETE",
            url: "/delete",
            data: deletedId,
            success: function(data){
                console.log("Deleted successfully bitches!");
                $('#station').empty();
                getData();

            }
        })
    });
}

function stationApproval () {

    $('.check').on('click', function () {

        console.log("Did I do thaaaat?");

        //getting the id of the object that check button was clicked on setting it to a var to pass to the ajax call
        var approvalid = {"id" : $(this).data("id")};
        console.log(approvalid);

        //get call for the individual object,
        // upon success will call a function to change data format and add to stations collection
        $.ajax({
            type: "GET",
            url: "/adminadded",
            data: approvalid,
            success: function(data){
                console.log("Ajax call in stationApproval", data);
            }
        });
});
}


//displaying everything in the stations Database on the DOM
function adminData (stationsInDB) {
    for(var i = 0; i < stationsInDB.length; i++){
        //console.log(stationsInDB[0].features[i].properties.name);
        $('#station').append("<tr class='content'></tr>" + "<td>" + i + "</td>" + "<td>" + stationsInDB[i].properties.name + "</td>" +
            "<td>" + stationsInDB[i].properties.address + "</td>" +
            "<td><button class='delete #b71c1c red darken-4' id='deleteStation'><i class='material-icons'>delete</i></button>");

    }

}
//displaying any new client added stations on the DOM
function clientData (clientAddedStations) {
    for(var i = 0; i < clientAddedStations.length; i++){
        //console.log(clientAddedStations[i].name);
        $('#station').append("<tr class='content'></tr>" + "<td>" + clientAddedStations[i].name + "</td>" +
            "<td>" + clientAddedStations[i].street + " " + clientAddedStations[i].city + " " +
            clientAddedStations[i].state + " " + clientAddedStations[i].zip +"</td>" +
        "<td>" + clientAddedStations[i].number + "</td>" + "<td><button class='check waves-#00897b teal darken-1' data-id='" +
            clientAddedStations[i]._id + "'><i class='material-icons'>check_box</i></button>" +
            "<td><button class='delete #b71c1c red darken-4' data-id='" +
            clientAddedStations[i]._id + "'><i class='material-icons'>delete</i></button>");

    }
    stationApproval();
    deleteStation();



}


//pagination not working currently

//function pagination() {
//    pageSize = 5;
//
//    showPage = function (page) {
//        $(".content").hide();
//        $(".content").each(function (n) {
//            if (n >= pageSize * (page - 1) && n < pageSize * page)
//                $(this).show();
//        });
//    };
//
//    showPage(1);
//
//    $("#pagin li a").click(function () {
//        $("#pagin li a").removeClass("current");
//        $(this).addClass("current");
//        showPage(parseInt($(this).text()))
//    });
//}