$(document).ready(function(){
    getData();

});



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
            clientData(clientAddedStations);
        }
    })

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


//displaying everything in the stations Database on the DOM
function adminData (stationsInDB) {
    for(var i = 0; i < stationsInDB[0].features.length; i++){
        //console.log(stationsInDB[0].features[i].properties.name);
        $('#station').append("<tr class='content'></tr>" + "<td>" + i + "</td>" + "<td>" + stationsInDB[0].features[i].properties.name + "</td>" +
            "<td>" + stationsInDB[0].features[i].properties.address + "</td>" +
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
        "<td>" + clientAddedStations[i].number + "</td>" + "<td><button class='waves-#00897b teal darken-1'><i class='material-icons'>check_box</i></button>" +
            "<td><button class='delete #b71c1c red darken-4' data-id='" +
            clientAddedStations[i]._id + "'><i class='material-icons'>delete</i></button>");

    }

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