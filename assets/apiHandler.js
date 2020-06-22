let apiHandler = {

    addressAPIResp : "",
    countyAPIResp : "",
    localAPIResp : "", 
    stateAPIResp : "",
    federalAPIResp : "",
    keySmarty : "",
    appIDSmarty : "",
    authTokenSmarty : "",
    appIDGoogle : "",
    du : dynamicUi, 

    loadApiKeys: function () {
        this.keySmarty = `15268446145831291`;
        this.appIDSmarty = JSON.parse(localStorage.getItem("appIDSmartyStreets"));
        this.authTokenSmarty = JSON.parse(localStorage.getItem("authTokenSmartyStreets"));
        this.appKeyGoogle = JSON.parse(localStorage.getItem("appKeyGoogle"));
    },

    async addressResolve() {
        let keyS = this.keySmarty;
        let add1 = JSON.parse(localStorage.getItem("add1"));
        let add2 = JSON.parse(localStorage.getItem("add2"));
        let city = JSON.parse(localStorage.getItem("city"));
        let state = JSON.parse(localStorage.getItem("state"));
        let zip = JSON.parse(localStorage.getItem("zip"));

        //Local Host URL 
        //let queryURL = `https://us-street.api.smartystreets.com/street-address?auth-id=${this.appIDSmarty}&auth-token=${this.authTokenSmarty}&candidates=1&match=invalid&street=${add1}&street2=${add2}&city=${city}&state=${state}&zipcode=${zip}`;

        //Public Website URL
        let queryURL = `https://us-street.api.smartystreets.com/street-address?candidates=1&match=invalid&street=${encodeURIComponent(add1)}&street2=${encodeURIComponent(add2)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&zipcode=${encodeURIComponent(zip)}&key=${encodeURIComponent(keyS)}`;

        let promise = await Promise.all([
            $.ajax({
                url: queryURL,
                method: "GET"
            })
        ]);

        console.log(promise);

        this.du.parseAddress(promise);
        this.du.displayResolvedAddress();
        
        return 0;
    },

    async civicInfoResolve() {

        let selectCounty = JSON.parse(localStorage.getItem("cbs_cn"));
        let selectLocal = JSON.parse(localStorage.getItem("cbs_lcl"));
        let selectState = JSON.parse(localStorage.getItem("cbs_st"));
        let selectFederal = JSON.parse(localStorage.getItem("cbs_fd"));
        
        if(selectCounty) {
            let queryUrlCounty = `https://www.googleapis.com/civicinfo/v2/representatives?address=${encodeURIComponent(this.du.addressReal)}&includeOffices=true&key=${encodeURIComponent(this.appKeyGoogle)}&levels=administrativeArea2`;
            
            let promiseCounty = await Promise.all([
                $.ajax({
                    url: queryUrlCounty,
                    method: "GET"
                })
            ]);
            this.du.parseRepresentativeInfo(promiseCounty,"County");
        }

        if(selectLocal) {
            let queryUrlLocal = `https://www.googleapis.com/civicinfo/v2/representatives?address=${encodeURIComponent(this.du.addressReal)}&includeOffices=true&key=${encodeURIComponent(this.appKeyGoogle)}&levels=locality`;
            
            let promiseLocal = await Promise.all([
                $.ajax({
                    url: queryUrlLocal,
                    method: "GET"
                })
            ]);
            this.du.parseRepresentativeInfo(promiseLocal,"Local");
        }

        if(selectState) {
            let queryUrlState = `https://www.googleapis.com/civicinfo/v2/representatives?address=${encodeURIComponent(this.du.addressReal)}&includeOffices=true&key=${encodeURIComponent(this.appKeyGoogle)}&levels=administrativeArea1`;
            
            let promiseState = await Promise.all([
                $.ajax({
                    url: queryUrlState,
                    method: "GET"
                })
            ]);
            this.du.parseRepresentativeInfo(promiseState,"State");
        }

        if(selectFederal) {
            let queryUrlFederal = `https://www.googleapis.com/civicinfo/v2/representatives?address=${encodeURIComponent(this.du.addressReal)}&includeOffices=true&key=${encodeURIComponent(this.appKeyGoogle)}&levels=country`;
            
            let promiseFederal = await Promise.all([
                $.ajax({
                    url: queryUrlFederal,
                    method: "GET"
                })
            ]);
            this.du.parseRepresentativeInfo(promiseFederal,"Federal");
        }
    }
}

function apiKeySet() {
    /*TEMP*/
    localStorage.setItem("appIDSmartyStreets", JSON.stringify("030789af-7de7-e378-4479-a86c83c31546"));
    localStorage.setItem("authTokenSmartyStreets", JSON.stringify("tG3l4uhIF7ryeu53qeLq"));
    localStorage.setItem("appKeyGoogle", JSON.stringify("AIzaSyDYsucFLhfwF4iEpT9CrAD7rCFdUvrQ87E"));
    /*TEMP*/
}

apiKeySet();