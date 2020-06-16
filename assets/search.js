//Access Civic API

var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?address=1717%20SW%20Park%20Drive%2C%20Apt%201224&includeOffices=true&key=AIzaSyDYsucFLhfwF4iEpT9CrAD7rCFdUvrQ87E";
// var APIKey = "AIzaSyDYsucFLhfwF4iEpT9CrAD7rCFdUvrQ87E" 
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(JSON.stringify(response));
    $("#local").text(JSON.stringify(response));
})


//If local box checked #localCheck
//If State box checked #stateCheck
//If Federal box checked #federalCheck
