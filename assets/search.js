$(document).ready(function() {

let searchUI = {

    "cb-cnty" : false,
    "cb-lcl" : false,
    "cb-st" : false,
    "cb-fd" : false,

    getAddressValues: function() {

        console.log($("#search-address1").val());
        console.log($("#search-address2").val());
        console.log($("#search-city").val());
        console.log($("#search-zipcode").val());
        //console.log($("cb-cnty").prop('checked'));
        //console.log($("cb-lcl").prop('checked'));
        //console.log($("cb-st").prop('checked'));
        //console.log($("cb-fd").is(':checked'));

    }

};

su = searchUI;

/*
$("#states-dd").click(function(event) {
    console.log(event.innerHTML);

});*/

$('#cb-cnty').on('change', function() {
    event.preventDefault();
    if ($(this).is(':checked')) {
    //su.
    }

});



$("#search-btn").click(function(event) {
    event.preventDefault();
    //if inputValidation == Successfull kick off process
    //false show errors
    su.getAddressValues();

});

function initialState() { 
    console.clear();
}

initialState();
});
