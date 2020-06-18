let dynamicUi = {

    addressReal : "",
    addressSuccess : false,

    repOffice : "",
    repName : "",
    repParty : "",
    repPartyDisplay : "",
    repEmail : "",
    repPhone : "",
    repAddress : "",
    repPhotoUrl : "",
    
    parseAddress: function (response) {
        
        let pre = response[0][0].metadata.precision;
        let dmc = response[0][0].analysis.dpv_match_code;     
        if (dmc !== "Y") {
            lock = false;
        }
        else {
            lock = true;
        }
        let addrsLine1 = response[0][0].delivery_line_1;
        let addrsLine2 = response[0][0].last_line;
        this.addressReal = `${addrsLine1} ${addrsLine2}`;
        this.addressSuccess = lock;

    },
        
    displayResolvedAddress: function() {
        let cr = $("<div id=\"card-row\" class=\"row\">");
        if (this.addressSuccess) {
            let crds1 = $("<div id=\"card-row-div-sb\" class=\"col s12 m6\">");
            let crds2 = $("<div id=\"card-row-div-sb\" class=\"col s12 m6\">");
            var crdt = $("<h6>").text(this.addressReal);
            var crdb = $("<div id=\"proceed-btn\" class=\"waves-effect waves-light btn-large orange\">");
            $(crdb).text("Srch.Rep");
            crds1.append(crdt);
            crds2.append(crdb);
            cr.append(crds1);
            cr.append(crds2);
        }
        else {
            let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
            var crdt = $("<h6>").text("Address could not be Resolved");
            $(crdt).css("color", "red");
            crds.append(crdt);
            cr.append(crds);
        }
        $("#card-row-d").append(cr);
    },


    displayNoInfoFound: function (level) {

        let crh = $("<div id=\"card-row\" class=\"row\">");
        let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
        let crdt = $("<h5>").text(`No.${level}.Reps.Found`);
        $(crdt).css("color", "red");
        crds.append(crdt);
        crh.append(crds);
        $("#card-row-d").append(crh);
    },

    titleRowBuilder: function (level) {
        let crh = $("<div id=\"card-row\" class=\"row\">");
        let crds = $("<div id=\"card-row-div-sb\" class=\"col s12 m12\">");
        let crdt = $("<h5>").text(`${level}.Reps`);
        $(crdt).css("color", "blue");
        crds.append(crdt);
        crh.append(crds);
        $("#card-row-d").append(crh);
    },

    representativeRowBuilder: function (level) {

        let crh = $("<div id=\"card-row\" class=\"row\">");
        let crds1 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
        let crds2 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
        let crds3 = $("<div id=\"card-row-div-sb\" class=\"col s12 m4\">");
        let crdt1 = $("<h6>").text(this.repName + this.repPartyDisp);
        let crdt2 = $("<h6>").text(this.repOffice);
        let crdp = $("<img id=\"rep-pic\">");
        crdp.attr('src', this.repPhotoUrl);
        crdp.appendTo('#repPic');

        crds1.append(crdt1);
        crds2.append(crdt2);
        crds3.append(crdp);
        crh.append(crds1);
        crh.append(crds2);
        crh.append(crds3);
        $("#card-row-d").append(crh);

    },

    parseRepresentativeInfo: function (response,level) {

        //console.log(response);
        //console.log(level);
        let personsArrayLenght = "";
        if (!response[0].hasOwnProperty('officials')) {
            personsArrayLenght = "";
        }
        else {
            personsArrayLenght = response[0].officials.length;
        }

        let positionsArrayLenght = "";
        if (!response[0].hasOwnProperty('offices')) {
            positionsArrayLenght = "";
        }
        else {
            positionsArrayLenght = response[0].offices.length;
        }

        if ((personsArrayLenght) && (positionsArrayLenght)) {
            this.titleRowBuilder(level);
            for(let i=0; i<positionsArrayLenght; i++) {
                this.repOffice = response[0].offices[i].name;
                let oilen = response[0].offices[i].officialIndices.length;
                //console.log(`${this.repOffice} ${oilen}`);
                for(let j=0; j<oilen; j++) {
                    oi = response[0].offices[i].officialIndices[j];
                    //console.log(`${this.repOffice} ${oilen} ${oi}`);
                    if (!response[0].officials[oi].hasOwnProperty('name')) {
                        this.repName = "";
                    }
                    else {
                        this.repName = response[0].officials[oi].name;
                    }
                    //console.log(`${this.repOffice} ${oilen} ${oi} ${this.repName}`);
                    if (!response[0].officials[oi].hasOwnProperty('party')) {
                        this.repParty = "";
                    }
                    else {
                        this.repParty = response[0].officials[oi].party;
                    }
                    //console.log(`${this.repOffice} ${oilen} ${oi} ${this.repName} ${this.repParty}`);
                    if (this.repParty === "Republican Party") {
                        this.repPartyDisp = "(R)";
                    }
                    else if (this.repParty === "Democratic Party") {
                        this.repPartyDisp = "(D)";
                    }
                    else if (this.repParty === "Nonpartisan") {
                        this.repPartyDisp = "(I)";
                    }
                    else {
                        console.log("NA PARTY DISP");
                    }
                    if(this.repName === "VACANT") {
                        this.repPartyDisp = "";
                    }
                    //console.log(`${this.repOffice} ${oilen} ${oi} ${this.repName} ${this.repPartyDisp}`);
                    if (!response[0].officials[oi].hasOwnProperty('emails')) {
                        this.repEmail = "";
                    }
                    else {
                        this.repEmail = response[0].officials[oi].emails[0];
                    }
                    //console.log(`${this.repOffice} ${oilen} ${oi} ${this.repName} ${this.repPartyDisp} ${this.repEmail}`);
                    if (!response[0].officials[oi].hasOwnProperty('phones')) {
                        this.repPhone = "";
                    }
                    else {
                        this.repPhone = response[0].officials[oi].phones[0];;
                    }
                    //console.log(`${this.repOffice} ${oilen} ${oi} ${this.repName} ${this.repPartyDisp} ${this.repEmail} ${this.repPhone}`);
                    if (!response[0].officials[oi].hasOwnProperty('photoUrl')) {
                        this.repPhotoUrl = "./assets/blank-person.jpg";
                    }
                    else {
                        this.repPhotoUrl = response[0].officials[oi].photoUrl;;
                    }
                    //console.log(`${this.repOffice} ${oilen} ${oi} ${this.repName} ${this.repPartyDisp} ${this.repEmail} ${this.repPhone}`);
                    if (!response[0].officials[oi].hasOwnProperty('address')) {
                        this.repAddress = "";
                    }
                    else {
                        this.repAddress = response[0].officials[oi].address[0].line1;;
                    }
                    //console.log(`${this.repOffice} ${oilen} ${oi} ${this.repName} ${this.repPartyDisp} ${this.repEmail} ${this.repPhone} ${this.repPhotoUrl} ${this.repAddress}`);

                    this.representativeRowBuilder();
                }
            }
        }
        else {
            this.displayNoInfoFound(level);
        }

    }



    
};