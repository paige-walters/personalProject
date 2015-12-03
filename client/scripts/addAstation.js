$(document).ready(function() {
 $('#addStationForm').submit(addSomeone);
});


function addSomeone() {
    event.preventDefault();
    var values = {};

    $.each($(this).serializeArray(), function (i, field) {
        console.log("this is the field", field);
        values[field.name] = field.value;

    });

    $('#addStationForm').find("input[type=text]").val("");

    console.log(values);
    $.ajax({
        type: "POST",
        url: "/data",
        data: values,
        success: function(data){
            console.log("Post complete!", data);
            thanksMessage();


        }
    });
}


function thanksMessage () {
    $('#infop').append("<p class='flow text' id='thanks'>Thank you for your contribution!</p>");
}