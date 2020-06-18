$(document).ready(function() {

let searchUI = {

    "val_add1" : "",
    "val_add2" : "",
    "val_city" : "",
    "val_state" : "",
    "val_zip" : "",

    "val-cnty" : false,
    "val-lcl" : false,
    "val-st" : false,
    "val-fd" : false,

    "cb-cnty" : false,
    "cb-lcl" : false,
    "cb-st" : false,
    "cb-fd" : false,

    "aICity" : "",
    "aTCity" : "",
    "aKG" : "",


    setKeys: function() {

        this.aICity = JSON.parse(localStorage.getItem("aICity"));
        this.aTCity = JSON.parse(localStorage.getItem("aTCity"));
        this.aKG = JSON.parse(localStorage.getItem("aKG"));

    },

    resetInputValues: function() {
        this.val_add1 = "";
        this.val_add2 = "";
        this.val_city = "";
        this.val_state = "";
        this.val_zip = "";

        this["cb-cnty"] = false;
        this["cb-lcl"] = false;
        this["cb-st"] = false;
        this["cb-fd"] = false;

    },

    setAdd1: function(add1) {
        this.val_add1 = add1;
    },

    setAdd2: function(add2) {
        this.val_add2 = add2;
    },

    setCity: function(city) {
        this.val_city = city;
    },

    setState: function(state) {
        this.val_state = state;
    },

    setZip: function(zipCode) {
        this.val_zip = zipCode;
    },

    saveCBLS: function() {
        let cn = this["cb-cnty"];
        let lcl = this["cb-lcl"];
        let st = this["cb-st"];
        let fd = this["cb-fd"];

        localStorage.setItem("cbs_cn", JSON.stringify(cn));
        localStorage.setItem("cbs_lcl", JSON.stringify(lcl));
        localStorage.setItem("cbs_st", JSON.stringify(st));
        localStorage.setItem("cbs_fd", JSON.stringify(fd));
    },

    resetCBLS: function() {
        let cn = false;
        let lcl = false;
        let st = false;
        let fd = false;

        localStorage.setItem("cbs_cn", JSON.stringify(cn));
        localStorage.setItem("cbs_lcl", JSON.stringify(lcl));
        localStorage.setItem("cbs_st", JSON.stringify(st));
        localStorage.setItem("cbs_fd", JSON.stringify(fd));
    },
    

    cntyStatusTrue: function() {
        this["cb-cnty"] = true;
    },

    cntyStatusFalse: function() {
        this["cb-cnty"] = false;
    },

    lclStatusTrue: function() {
        this["cb-lcl"] = true;
    },

    lclStatusFalse: function() {
        this["cb-lcl"] = false;
    },

    stStatusTrue: function() {
        this["cb-st"] = true;
    },

    stStatusFalse: function() {
        this["cb-st"] = false;
    },

    fdStatusTrue: function() {
        this["cb-fd"] = true;
    },

    fdStatusFalse: function() {
        this["cb-fd"] = false;
    },

    getUIInput: function() {
        this.setAdd1($("#search-address1").val());
        this.setAdd2($("#search-address2").val());
        this.setCity($("#search-city").val());
        this.setZip($("#search-zipcode").val());
        this.saveCBLS();
    },

    resolveSmartyStreets: function() {
        $("#card-row-d").html("");
        let conf = false;
        let resp = "";

        var queryURL = `https://us-street.api.smartystreets.com/street-address?auth-id=${this.aICity}&auth-token=${this.aTCity}&candidates=1&match=invalid&street=${this.val_add1}&street2=${this.val_add2}&city=${this.val_city}&state=${this.val_state}&zipcode=${this.val_zip}`;

        $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(smartyStreets) {
                //console.log(smartyStreets);
                let pre = smartyStreets[0].metadata.precision;
                let dmc = smartyStreets[0].analysis.dpv_match_code;
                let lock = false;
                //console.log(`PRECISSSIONNNNNN ${pre}`);    
                //console.log(`DMMMMMMMCCCCC ${dmc}`);
                if(dmc !== "Y") {
                    lock = false;
                }
                else {
                    lock = true;
                } 
                let addrLine1 = smartyStreets[0].delivery_line_1;
                let addrLine2 = smartyStreets[0].last_line;
                let addrReal = `${addrLine1} ${addrLine2}`;
                //console.log(addrReal);
                localStorage.setItem('smartyStreetsRealAddress', JSON.stringify(addrReal));
                //console.log(JSON.parse(localStorage.getItem('smartyStreetsRealAddress')));
                var cr = $("<div id=\"card-row\" class=\"row\">");
                var crds1 = $("<div id=\"card-row-div-sb\" class=\"col s12 m6\">");
                var crds2 = $("<div id=\"card-row-div-sb\" class=\"col s12 m6\">");
                if(lock) {
                    var crdt = $("<h6>").text(addrReal);
                    var crdb = $("<div id=\"proceed-btn\" class=\"waves-effect waves-light btn-large orange\">");
                    $(crdb).text("Srch.Rep");
                }
                else {
                    var crdt = $("<h6>").text("Address could not be Resolved");
                    $(crdt).css("color","red");
                }                
                crds1.append(crdt);
                crds2.append(crdb);
                cr.append(crds1);
                cr.append(crds2);
                $("#card-row-d").append(cr);
            });    

        return 0;
    },

    resolveCivicInformation: function() {
        //COUNTY
        let addr = JSON.parse(localStorage.getItem('smartyStreetsRealAddress'));
        let key = JSON.parse(localStorage.getItem('aKG'));
        var queryURL = `https://www.googleapis.com/civicinfo/v2/representatives?address=${addr}&includeOffices=true&key=${key}&levels=administrativeArea2`;
        console.log(queryURL);
        $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(resp_cn) {
                console.log(resp_cn);
                /////CNNNNNTY DISPLAY STARTS///////
                let cb = JSON.parse(localStorage.getItem('cbs_cn'));
                //console.log(cb);
                if(cb) {

                    let persLen = "";
                    if(!resp_cn.hasOwnProperty('officials')) {
                        persLen = "";
                    }
                    else {
                        persLen = resp_cn.officials.length;
                    }
                    let posLen = "";
                    if(!resp_cn.hasOwnProperty('offices')) {
                        posLen = "";
                    }
                    else {
                        posLen = resp_cn.offices.length;
                    }
                    //console.log(`OFFICCESSSS OFFICIALS ${persLen} ${posLen}`);
                    if((persLen) && (posLen)) { 
                        ////////////////////API HANDLER STARTS /////////////////////
                        let persLen = resp_cn.officials.length; 
                        let posLen  = resp_cn.offices.length;
                        //console.log(`${persLen}  ${posLen}`);
                        let crh = $("<div id=\"card-row\" class=\"row\">");
                        let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
                        let crdt = $("<h5>").text("Local.Reps");
                        $(crdt).css("color","blue");
                        crds.append(crdt);
                        crh.append(crds);
                        $("#card-row-d").append(crh);
                        for(var i=0;i<posLen;i++) {
                            let repOffice = resp_cn.offices[i].name;
                            let oilen = resp_cn.offices[i].officialIndices.length;
                            //console.log(`${repOffice} ${oilen}`);
                            for(var j=0;j<oilen;j++) {
                                        /////// INFO PARSE API STARTS //////////////////////////////////
                                        oi = resp_cn.offices[i].officialIndices[j];
                                        //console.log(`${repOffice} ${oilen} ${oi}`);
                                        let repName = resp_cn.officials[oi].name;
                                        let repParty = resp_cn.officials[oi].party;
                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty}`);
                                        let repPartyDisp = "";
                                        if(repParty === "Republican Party") {
                                            repPartyDisp = "(R)";
                                        }
                                        else if (repParty === "Democratic Party") {
                                            repPartyDisp = "(D)";
                                        }
                                        else if (repParty === "Nonpartisan") {
                                            repPartyDisp = "(I)";
                                        }
                                        else {
                                            console.log("NA PARTY DISP");
                                        }
                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp}`);
                                        let repEmail = "";
                                        if(!resp_cn.officials[oi].hasOwnProperty('emails')) {
                                            repEmail = "";
                                        }
                                        else {
                                            repEmail = resp_cn.officials[oi].emails[0];
                                        }
                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail}`);
                                        let repPhone = "";
                                        if(!resp_cn.officials[oi].hasOwnProperty('phones')) {
                                            repPhones = "";
                                        }
                                        else {
                                            repPhones = resp_cn.officials[oi].phones[0];
                                        }
                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail} ${repPhones}`);
                                        let repPhotoUrl = "";
                                        if(!resp_cn.officials[oi].hasOwnProperty('photoUrl')) {
                                            repPhotoUrl = "./assets/blank-person.jpg";
                                        }
                                        else {
                                            repPhotoUrl = resp_cn.officials[oi].photoUrl;
                                        }
                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail} ${repPhones} ${repPhotoUrl}`);
                                        let repAddr = "";
                                        if(!resp_cn.officials[oi].hasOwnProperty('address')) {
                                            repAddr = "";
                                        }
                                        else {
                                            repAddr = resp_cn.officials[oi].address[0].line1;
                                        }
                                        /////// INFO PARSE API ENDS //////////////////////////////////
                                        /////// LIST BUILDER STARTS //////////////////////////////////
                                        let crh = $("<div id=\"card-row\" class=\"row\">");
                                        let crds1 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                        let crds2 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                        let crds3 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                        let crdt1 = $("<h6>").text(repName+repPartyDisp);
                                        let crdt2 = $("<h6>").text(repOffice);
                                        let crdp = $("<img id=\"rep-pic\">");
                                        crdp.attr('src',repPhotoUrl);
                                        crdp.appendTo('#repPic');
                                        
                                        crds1.append(crdt1);
                                        crds2.append(crdt2);
                                        crds3.append(crdp);
                                        crh.append(crds1);
                                        crh.append(crds2);
                                        crh.append(crds3);
                                        $("#card-row-d").append(crh);
                                        /////// LIST BUILDER ENDS //////////////////////////////////
                                }
                        }
                    }
                    else {
                        let crh = $("<div id=\"card-row\" class=\"row\">");
                        let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
                        let crdt = $("<h5>").text("No.Local.Reps.Found");
                        $(crdt).css("color","blue");
                        crds.append(crdt);
                        crh.append(crds);
                        $("#card-row-d").append(crh);
                    }

                }
                /////CNNNNNTY DISPLAY ENDS/////////

                //LOCAL
                let addr = JSON.parse(localStorage.getItem('smartyStreetsRealAddress'));
                let key = JSON.parse(localStorage.getItem('aKG'));
                var queryURL = `https://www.googleapis.com/civicinfo/v2/representatives?address=${addr}&includeOffices=true&key=${key}&levels=locality`;
                console.log(queryURL);
                $.ajax({
                        url: queryURL,
                        method: "GET"
                        }).then(function(resp_lcl) {
                        console.log(resp_lcl);
                        /////LCLLLLLLLL DISPLAY STARTS///////
                        let cb = JSON.parse(localStorage.getItem('cbs_lcl'));
                        //console.log(cb);
                        if(cb) {

                            let persLen = "";
                            if(!resp_lcl.hasOwnProperty('officials')) {
                                persLen = "";
                            }
                            else {
                                persLen = resp_lcl.officials.length;
                            }
                            let posLen = "";
                            if(!resp_lcl.hasOwnProperty('offices')) {
                                posLen = "";
                            }
                            else {
                                posLen = resp_lcl.offices.length;
                            }
                            //console.log(`OFFICCESSSS OFFICIALS ${persLen} ${posLen}`);
                            if((persLen) && (posLen)) { 
                                ////////////////////API HANDLER STARTS /////////////////////
                                let persLen = resp_lcl.officials.length; 
                                let posLen  = resp_lcl.offices.length;
                                //console.log(`${persLen}  ${posLen}`);
                                let crh = $("<div id=\"card-row\" class=\"row\">");
                                let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
                                let crdt = $("<h5>").text("Local.Reps");
                                $(crdt).css("color","blue");
                                crds.append(crdt);
                                crh.append(crds);
                                $("#card-row-d").append(crh);
                                for(var i=0;i<posLen;i++) {
                                    let repOffice = resp_lcl.offices[i].name;
                                    let oilen = resp_lcl.offices[i].officialIndices.length;
                                    //console.log(`${repOffice} ${oilen}`);
                                    for(var j=0;j<oilen;j++) {
                                                /////// INFO PARSE API STARTS //////////////////////////////////
                                                oi = resp_lcl.offices[i].officialIndices[j];
                                                //console.log(`${repOffice} ${oilen} ${oi}`);
                                                let repName = resp_lcl.officials[oi].name;
                                                let repParty = resp_lcl.officials[oi].party;
                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty}`);
                                                let repPartyDisp = "";
                                                if(repParty === "Republican Party") {
                                                    repPartyDisp = "(R)";
                                                }
                                                else if (repParty === "Democratic Party") {
                                                    repPartyDisp = "(D)";
                                                }
                                                else if (repParty === "Nonpartisan") {
                                                    repPartyDisp = "(I)";
                                                }
                                                else {
                                                    console.log("NA PARTY DISP");
                                                }
                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp}`);
                                                let repEmail = "";
                                                if(!resp_lcl.officials[oi].hasOwnProperty('emails')) {
                                                    repEmail = "";
                                                }
                                                else {
                                                    repEmail = resp_lcl.officials[oi].emails[0];
                                                }
                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail}`);
                                                let repPhone = "";
                                                if(!resp_lcl.officials[oi].hasOwnProperty('phones')) {
                                                    repPhones = "";
                                                }
                                                else {
                                                    repPhones = resp_lcl.officials[oi].phones[0];
                                                }
                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail} ${repPhones}`);
                                                let repPhotoUrl = "";
                                                if(!resp_lcl.officials[oi].hasOwnProperty('photoUrl')) {
                                                    repPhotoUrl = "./assets/blank-person.jpg";
                                                }
                                                else {
                                                    repPhotoUrl = resp_lcl.officials[oi].photoUrl;
                                                }
                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail} ${repPhones} ${repPhotoUrl}`);
                                                let repAddr = "";
                                                if(!resp_lcl.officials[oi].hasOwnProperty('address')) {
                                                    repAddr = "";
                                                }
                                                else {
                                                    repAddr = resp_lcl.officials[oi].address[0].line1;
                                                }
                                                /////// INFO PARSE API ENDS //////////////////////////////////
                                                /////// LIST BUILDER STARTS //////////////////////////////////
                                                let crh = $("<div id=\"card-row\" class=\"row\">");
                                                let crds1 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                                let crds2 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                                let crds3 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                                let crdt1 = $("<h6>").text(repName+repPartyDisp);
                                                let crdt2 = $("<h6>").text(repOffice);
                                                let crdp = $("<img id=\"rep-pic\">");
                                                crdp.attr('src',repPhotoUrl);
                                                crdp.appendTo('#repPic');
                                                
                                                crds1.append(crdt1);
                                                crds2.append(crdt2);
                                                crds3.append(crdp);
                                                crh.append(crds1);
                                                crh.append(crds2);
                                                crh.append(crds3);
                                                $("#card-row-d").append(crh);
                                                /////// LIST BUILDER ENDS //////////////////////////////////
                                        }
                                }
                            }
                            else {
                                let crh = $("<div id=\"card-row\" class=\"row\">");
                                let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
                                let crdt = $("<h5>").text("No.County.Reps.Found");
                                $(crdt).css("color","blue");
                                crds.append(crdt);
                                crh.append(crds);
                                $("#card-row-d").append(crh);
                            }
                        }
                        /////LCLLLLLLLL DISPLAY ENDS/////////

                        //STATE
                        let addr = JSON.parse(localStorage.getItem('smartyStreetsRealAddress'));
                        let key = JSON.parse(localStorage.getItem('aKG'));
                        var queryURL = `https://www.googleapis.com/civicinfo/v2/representatives?address=${addr}&includeOffices=true&key=${key}&levels=administrativeArea1`;
                        console.log(queryURL);
                        $.ajax({
                                url: queryURL,
                                method: "GET"
                                }).then(function(resp_st) {
                                console.log(resp_st);
                                /////STTTATTTTTTE DISPLAY STARTS///////
                                let cb = JSON.parse(localStorage.getItem('cbs_st'));
                                //console.log(cb);
                                if(cb) {






                                    let persLen = "";
                                    if(!resp_st.hasOwnProperty('officials')) {
                                        persLen = "";
                                    }
                                    else {
                                        persLen = resp_st.officials.length;
                                    }
                                    let posLen = "";
                                    if(!resp_st.hasOwnProperty('offices')) {
                                        posLen = "";
                                    }
                                    else {
                                        posLen = resp_st.offices.length;
                                    }
                                    //console.log(`OFFICCESSSS OFFICIALS ${persLen} ${posLen}`);
                                    if((persLen) && (posLen)) { 
                                        ////////////////////API HANDLER STARTS /////////////////////
                                        let persLen = resp_st.officials.length; 
                                        let posLen  = resp_st.offices.length;
                                        //console.log(`${persLen}  ${posLen}`);
                                        let crh = $("<div id=\"card-row\" class=\"row\">");
                                        let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
                                        let crdt = $("<h5>").text("State.Reps");
                                        $(crdt).css("color","blue");
                                        crds.append(crdt);
                                        crh.append(crds);
                                        $("#card-row-d").append(crh);
                                        for(var i=0;i<posLen;i++) {
                                            let repOffice = resp_st.offices[i].name;
                                            let oilen = resp_st.offices[i].officialIndices.length;
                                            //console.log(`${repOffice} ${oilen}`);
                                            for(var j=0;j<oilen;j++) {
                                                        /////// INFO PARSE API STARTS //////////////////////////////////
                                                        oi = resp_st.offices[i].officialIndices[j];
                                                        //console.log(`${repOffice} ${oilen} ${oi}`);
                                                        let repName = "";
                                                        if(!resp_st.officials[oi].hasOwnProperty('name')) {
                                                            repName = "";
                                                        }
                                                        else {
                                                            repName = resp_st.officials[oi].name;
                                                        }
                                                        let repParty = "";
                                                        if(!resp_st.officials[oi].hasOwnProperty('party')) {
                                                            repParty = "";
                                                        }
                                                        else {
                                                            repParty = resp_st.officials[oi].name;
                                                        }
                                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty}`);
                                                        let repPartyDisp = "";
                                                        if(repParty === "Republican Party") {
                                                            repPartyDisp = "(R)";
                                                        }
                                                        else if (repParty === "Democratic Party") {
                                                            repPartyDisp = "(D)";
                                                        }
                                                        else if (repParty === "Nonpartisan") {
                                                            repPartyDisp = "(I)";
                                                        }
                                                        else {
                                                            console.log("NA PARTY DISP");
                                                        }
                                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp}`);
                                                        let repEmail = "";
                                                        if(!resp_st.officials[oi].hasOwnProperty('emails')) {
                                                            repEmail = "";
                                                        }
                                                        else {
                                                            repEmail = resp_st.officials[oi].emails[0];
                                                        }
                                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail}`);
                                                        let repPhone = "";
                                                        if(!resp_st.officials[oi].hasOwnProperty('phones')) {
                                                            repPhones = "";
                                                        }
                                                        else {
                                                            repPhones = resp_st.officials[oi].phones[0];
                                                        }
                                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail} ${repPhones}`);
                                                        let repPhotoUrl = "";
                                                        if(!resp_st.officials[oi].hasOwnProperty('photoUrl')) {
                                                            repPhotoUrl = "./assets/blank-person.jpg";
                                                        }
                                                        else {
                                                            repPhotoUrl = resp_st.officials[oi].photoUrl;
                                                        }
                                                        //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail} ${repPhones} ${repPhotoUrl}`);
                                                        let repAddr = "";
                                                        if(!resp_st.officials[oi].hasOwnProperty('address')) {
                                                            repAddr = "";
                                                        }
                                                        else {
                                                            repAddr = resp_st.officials[oi].address[0].line1;
                                                        }
                                                        /////// INFO PARSE API ENDS //////////////////////////////////
                                                        /////// LIST BUILDER STARTS //////////////////////////////////
                                                        let crh = $("<div id=\"card-row\" class=\"row\">");
                                                        let crds1 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                                        let crds2 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                                        let crds3 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                                        let crdt1 = $("<h6>").text(repName+repPartyDisp);
                                                        let crdt2 = $("<h6>").text(repOffice);
                                                        let crdp = $("<img id=\"rep-pic\">");
                                                        crdp.attr('src',repPhotoUrl);
                                                        crdp.appendTo('#repPic');
                                                        
                                                        crds1.append(crdt1);
                                                        crds2.append(crdt2);
                                                        crds3.append(crdp);
                                                        crh.append(crds1);
                                                        crh.append(crds2);
                                                        crh.append(crds3);
                                                        $("#card-row-d").append(crh);
                                                        /////// LIST BUILDER ENDS //////////////////////////////////
                                                }
                                        }
                                    }
                                    else {
                                        let crh = $("<div id=\"card-row\" class=\"row\">");
                                        let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
                                        let crdt = $("<h5>").text("No.State.Reps.Found");
                                        $(crdt).css("color","blue");
                                        crds.append(crdt);
                                        crh.append(crds);
                                        $("#card-row-d").append(crh);
                                    }
        














                                }                
                                /////STTTATTTTTTE DISPLAY ENDS/////////

                                //FEDERAL
                                let addr = JSON.parse(localStorage.getItem('smartyStreetsRealAddress'));
                                let key = JSON.parse(localStorage.getItem('aKG'));
                                var queryURL = `https://www.googleapis.com/civicinfo/v2/representatives?address=${addr}&includeOffices=true&key=${key}&levels=country`;
                                console.log(queryURL);
                                $.ajax({
                                        url: queryURL,
                                        method: "GET"
                                        }).then(function(resp_fd) {
                                        console.log(resp_fd);
                                        /////FEDERALLLL DISPLAY STARTS///////
                                        let cb = JSON.parse(localStorage.getItem('cbs_fd'));
                                        //console.log(cb);
                                        if(cb) {


                                            let persLen = "";
                                            if(!resp_fd.hasOwnProperty('officials')) {
                                                persLen = "";
                                            }
                                            else {
                                                persLen = resp_fd.officials.length;
                                            }
                                            let posLen = "";
                                            if(!resp_fd.hasOwnProperty('offices')) {
                                                posLen = "";
                                            }
                                            else {
                                                posLen = resp_fd.offices.length;
                                            }
                                            //console.log(`OFFICCESSSS OFFICIALS ${persLen} ${posLen}`);
                                            if((persLen) && (posLen)) { 
                                                ////////////////////API HANDLER STARTS /////////////////////
                                                let persLen = resp_fd.officials.length; 
                                                let posLen  = resp_fd.offices.length;
                                                //console.log(`${persLen}  ${posLen}`);
                                                let crh = $("<div id=\"card-row\" class=\"row\">");
                                                let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
                                                let crdt = $("<h5>").text("State.Reps");
                                                $(crdt).css("color","blue");
                                                crds.append(crdt);
                                                crh.append(crds);
                                                $("#card-row-d").append(crh);
                                                for(var i=0;i<posLen;i++) {
                                                    let repOffice = resp_fd.offices[i].name;
                                                    let oilen = resp_fd.offices[i].officialIndices.length;
                                                    //console.log(`${repOffice} ${oilen}`);
                                                    for(var j=0;j<oilen;j++) {
                                                                /////// INFO PARSE API STARTS //////////////////////////////////
                                                                oi = resp_fd.offices[i].officialIndices[j];
                                                                //console.log(`${repOffice} ${oilen} ${oi}`);
                                                                let repName = "";
                                                                if(!resp_fd.officials[oi].hasOwnProperty('name')) {
                                                                    repName = "";
                                                                }
                                                                else {
                                                                    repName = resp_st.officials[oi].name;
                                                                }
                                                                let repParty = "";
                                                                if(!resp_fd.officials[oi].hasOwnProperty('party')) {
                                                                    repParty = "";
                                                                }
                                                                else {
                                                                    repParty = resp_fd.officials[oi].name;
                                                                }
                                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty}`);
                                                                let repPartyDisp = "";
                                                                if(repParty === "Republican Party") {
                                                                    repPartyDisp = "(R)";
                                                                }
                                                                else if (repParty === "Democratic Party") {
                                                                    repPartyDisp = "(D)";
                                                                }
                                                                else if (repParty === "Nonpartisan") {
                                                                    repPartyDisp = "(I)";
                                                                }
                                                                else {
                                                                    console.log("NA PARTY DISP");
                                                                }
                                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp}`);
                                                                let repEmail = "";
                                                                if(!resp_fd.officials[oi].hasOwnProperty('emails')) {
                                                                    repEmail = "";
                                                                }
                                                                else {
                                                                    repEmail = resp_fd.officials[oi].emails[0];
                                                                }
                                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail}`);
                                                                let repPhone = "";
                                                                if(!resp_fd.officials[oi].hasOwnProperty('phones')) {
                                                                    repPhones = "";
                                                                }
                                                                else {
                                                                    repPhones = resp_fd.officials[oi].phones[0];
                                                                }
                                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail} ${repPhones}`);
                                                                let repPhotoUrl = "";
                                                                if(!resp_fd.officials[oi].hasOwnProperty('photoUrl')) {
                                                                    repPhotoUrl = "./assets/blank-person.jpg";
                                                                }
                                                                else {
                                                                    repPhotoUrl = resp_fd.officials[oi].photoUrl;
                                                                }
                                                                //console.log(`${repOffice} ${oilen} ${oi} ${repName} ${repParty} ${repPartyDisp} ${repEmail} ${repPhones} ${repPhotoUrl}`);
                                                                let repAddr = "";
                                                                if(!resp_fd.officials[oi].hasOwnProperty('address')) {
                                                                    repAddr = "";
                                                                }
                                                                else {
                                                                    repAddr = resp_st.officials[oi].address[0].line1;
                                                                }
                                                                /////// INFO PARSE API ENDS //////////////////////////////////
                                                                /////// LIST BUILDER STARTS //////////////////////////////////
                                                                let crh = $("<div id=\"card-row\" class=\"row\">");
                                                                let crds1 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                                                let crds2 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                                                let crds3 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
                                                                let crdt1 = $("<h6>").text(repName+repPartyDisp);
                                                                let crdt2 = $("<h6>").text(repOffice);
                                                                let crdp = $("<img id=\"rep-pic\">");
                                                                crdp.attr('src',repPhotoUrl);
                                                                crdp.appendTo('#repPic');
                                                                
                                                                crds1.append(crdt1);
                                                                crds2.append(crdt2);
                                                                crds3.append(crdp);
                                                                crh.append(crds1);
                                                                crh.append(crds2);
                                                                crh.append(crds3);
                                                                $("#card-row-d").append(crh);
                                                                /////// LIST BUILDER ENDS //////////////////////////////////
                                                        }
                                                }
                                            }
                                            else {
                                                let crh = $("<div id=\"card-row\" class=\"row\">");
                                                let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
                                                let crdt = $("<h5>").text("No.Federal.Reps.Found");
                                                $(crdt).css("color","blue");
                                                crds.append(crdt);
                                                crh.append(crds);
                                                $("#card-row-d").append(crh);
                                            }

                                        }
                                        /////FEDERALLLL DISPLAY ENDS/////////
                                });
                        });
                });
        });
        return 0;
    }

};

su = searchUI;

$(document.body).on("click", "#proceed-btn", function() {
    event.preventDefault();
    su.resolveCivicInformation();
    return 0;
});

$("#row-state-select").change(function() {
    event.preventDefault();
    su.setState($('#ddl-sel').val());
});

$("#cb-cnty").on("change", function() {
    event.preventDefault();
    if ($(this).is(":checked")) {
        su.cntyStatusTrue();
    }
    else {
        su.cntyStatusFalse();
    }
});

$("#cb-lcl").on("change", function() {
    event.preventDefault();
    if ($(this).is(":checked")) {
        su.lclStatusTrue();
    }
    else {
        su.lclStatusFalse();
    }
});

$("#cb-st").on("change", function() {
    event.preventDefault();
    if ($(this).is(":checked")) {
        su.stStatusTrue();
    }
    else {
        su.stStatusFalse();
    }
});

$("#cb-fd").on("change", function() {
    event.preventDefault();
    if ($(this).is(":checked")) {
        su.fdStatusTrue();
    }
    else {
        su.fdStatusFalse();
    }
});

$("#clear-btn").click(function(event) {
    event.preventDefault();
    $("#search-address1").val("");
    $("#search-address2").val("");
    $("#search-city").val("");
    $("#search-zipcode").val("");
    $("#ddl-sel").val('1');
    $("select").formSelect();
    $("#cb-cnty").prop("checked",false); 
    $("#cb-lcl").prop("checked",false);
    $("#cb-st").prop("checked",false); 
    $("#cb-fd").prop("checked",false);
    $("#card-row-d").html("");
    localStorage.removeItem('smartyStreetsRealAddress');
    su.resetCBLS();
});

$("#search-btn").click(function(event) {
    event.preventDefault();
    localStorage.removeItem('smartyStreetsRealAddress');
    su.getUIInput();
    su.resolveSmartyStreets();
});

function initialState() { 
    console.clear();
    su.resetInputValues();
    localStorage.removeItem('smartyStreetsRealAddress');
    /*TEMP*/
    localStorage.setItem("aICity", JSON.stringify("942ac2b5-1d6c-5c87-9c02-f7e1a6c74c32"));
    localStorage.setItem("aTCity", JSON.stringify("IGKyW6I6E1MuUTtrwWuO"));
    localStorage.setItem("aKG", JSON.stringify("AIzaSyDYsucFLhfwF4iEpT9CrAD7rCFdUvrQ87E"));
    /*TEMP*/ 
    su.setKeys();
    su.resetCBLS();
    
}

initialState();

});

