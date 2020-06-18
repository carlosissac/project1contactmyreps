let  apiHandler = {

    addressAPIResp : "",
    countyAPIResp : "",
    localAPIResp : "", 
    stateAPIResp : "",
    federalAPIResp : "",

    addressResolve: function () {

        
        var queryURL = `https://us-street.api.smartystreets.com/street-address?auth-id=${this.aICity}&auth-token=${this.aTCity}&candidates=1&match=invalid&street=${this.val_add1}&street2=${this.val_add2}&city=${this.val_city}&state=${this.val_state}&zipcode=${this.val_zip}`;



        return 0;
    },

    getCivicInfo: function () {

        return 0;
    } 

}

ah = apiHandler;