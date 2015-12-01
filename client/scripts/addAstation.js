$(document).ready(function() {
 $('#addStationForm').submit(addSomeone);
});


function addSomeone() {
    event.preventDefault();
    var values = {};

    $.each($(this).serializeArray(), function (i, field) {
        console.log(field);
        values[field.name] = field.value;

    });

    console.log(values);
    $.ajax({
        type: "POST",
        url: "/data",
        data: values,
        success: function(data){
            console.log("Post complete!", data);
        }
    });
}


