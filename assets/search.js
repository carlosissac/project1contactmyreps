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

///////////////

// event listner for search button.


$(document).ready(function() {




$("#search-btn").click(function(event) {
    event.preventDefault();
    //if inputValidation == Successfull kick off process
    //false show errors
    //su.getAddressValues();

    console.log($("#search-address1").val()); 
     //$("#search-address1").val() >>>>>>> this statement is for reading from the textbox
    //$("#search-address1").val("address on is required"); >>>>>> this statement is for writting to the textbox

    if($("#search-address1").val() === "") {
        // console.log("TEEEEEEXT INPUT IS EMPTY");
        $("#search-address1").val("Address one is required");
        $("#search-address1").css("color", "red");
    }
    else {
        console.log("TEEEEEEXT INPUT IS OK");
    }
//city search box 
    if($("#search-city").val() === "") {
        // console.log("TEEEEEEXT INPUT IS EMPTY");
        $("#search-city").val("required");
        $("#search-city").css("color", "red");
    }
    else {
        console.log("TEEEEEEXT INPUT IS OK");
    }

//zipcode box
if($("#search-zipcode").val() === "") {
    // console.log("TEEEEEEXT INPUT IS EMPTY");
    $("#search-zipcode").val("required");
    $("#search-zipcode").css("color", "red");
}
else {
    
    console.log("TEEEEEEXT INPUT IS OK");
}

//checkbox

});

function initialState() { 
    console.clear();
}

initialState();
});

