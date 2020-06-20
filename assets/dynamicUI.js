let dynamicUi = {

    addressReal : "",
    addressSuccess : false,

    hash : "",
    repOrdIndex : "",
    repLevel : "",
    repOffice : "",
    repName : "",
    repParty : "",
    repPartyDisplay : "",
    repEmail : "",
    repPhone : "",
    repAddress : "",
    repPhotoUrl : "",
    
    lsObjectHandler: function () {

        if(localStorage.getItem('repDirectoryLS')) {
            let buffer = JSON.parse(localStorage.getItem('repDirectoryLS'));
            let i=0;
            for(i=0; i<buffer.length; i++) {
                this.hash = buffer[i].hash;
                this.repOrdIndex = buffer[i].repOrdIndex;
                this.repLevel = buffer[i].repLevel;
                this.repOffice = buffer[i].repOffice;
                this.repName = buffer[i].repName;
                this.repParty= buffer[i].repParty;
                this.repPartyDisplay = buffer[i].repPartyDisplay;
                this.repEmail = buffer[i].repEmail;
                this.repPhone = buffer[i].repPhone;
                this.repAddress = buffer[i].repAddress;
                this.repPhotoUrl = buffer[i].repPhotoUrl;
                /*console.log(`${this.hash} ${this.repOrdIndex} ${this.repLevel} ${this.repOffice} ${this.repName} ${this.repParty} ${this.repPartyDisplay} ${this.repEmail} ${this.repPhone} ${this.repPhotoUrl} ${this.repAddress}`);*/
                this.representativeRowBuilder();
                }
                if(i=== buffer.length) {
                    return 0;
                }
        }
        else {
            this.displayLsEmpty();
            return 1;
            //hide Clear button
        }
    },

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
        let cr = $("<div id='card-row' class='row'>");
        if (this.addressSuccess) {
            let crds1 = $("<div id='card-row-div-sb' class='col s12 m6'>");
            let crds2 = $("<div id='card-row-div-sb' class='col s12 m6'>");
            var crdt = $("<h6>").text(this.addressReal);
            var crdb = $("<div id='proceed-btn' class='waves-effect waves-light btn-large orange'>");
            $(crdb).text("Show");
            crds1.append(crdt);
            crds2.append(crdb);
            cr.append(crds1);
            cr.append(crds2);
        }
        else {
            let crds = $("<div id='card-row-div-sb' class='col s12 m12'>");
            var crdt = $("<h6>").text("Address could not be Resolved");
            $(crdt).css("color", "red");
            crds.append(crdt);
            cr.append(crds);
        }
        $("#card-row-d").html(cr);
    },

    displayLsEmpty: function (level) {
        let crh = $("<div id='card-row' class='row'>");
        let crds = $("<div id='card-row-div-sb' class='col s12 m12'>");
        let crdt = $("<h5>").text(`No Contacts Saved`);
        $(crdt).css("color", "red");
        crds.append(crdt);
        crh.append(crds);
        $("#card-row-d").append(crh);
    },

    displayNoInfoFound: function (level) {
        let crh = $("<div id='card-row' class='row'>");
        let crds = $("<div id='card-row-div-sb' class='col s12 m12'>");
        let crdt = $("<h5>").text(`No ${level} Reps Found`);
        $(crdt).css("color", "red");
        crds.append(crdt);
        crh.append(crds);
        $("#card-row-d").append(crh);
    },

    titleRowBuilder: function (level) {
        let crh = $("<div id='card-row' class='row'>");
        let crds = $("<div id='card-row-div-sb' class='col s12 m12'>");
        let crdt = $("<h5>").text(`${level} Reps`);
        $(crdt).css("color", "blue");
        crds.append(crdt);
        crh.append(crds);
        $("#card-row-d").append(crh);
    },

    representativeRowBuilder: function (level) {
        let tr = $("<div id='card-row-rep' class='row'>");
        $(tr).attr("hash",this.hash); 
        $(tr).attr("rep-ord-idx",this.repOrdIndex);
        $(tr).attr("rep-level",this.repLevel);
        $(tr).attr("rep-office",this.repOffice);
        $(tr).attr("rep-name",this.repName);
        $(tr).attr("rep-party",this.repParty);
        $(tr).attr("rep-party-display",this.repPartyDisplay);
        $(tr).attr("rep-email",this.repEmail);
        $(tr).attr("rep-phone",this.repPhone);
        $(tr).attr("rep-photo-url",this.repPhotoUrl);
        $(tr).attr("rep-address",this.repAddress);
        let crds1 = $("<div id='card-row-div-sb' class='col s12 m4'>");
        let crds2 = $("<div id='card-row-div-sb' class='col s12 m4'>");
        let crds3 = $("<div id='card-row-div-sb' class='col s12 m4'>");
        let crdt1 = $("<h6>").text(this.repName + this.repPartyDisplay);
        let crdt2 = $("<h6>").text(this.repOffice);
        let crdp = $("<img id='rep-pic'>");
        crdp.attr('src', this.repPhotoUrl);
        crdp.appendTo('#repPic');
        crds1.append(crdt1);
        crds2.append(crdt2);
        crds3.append(crdp);
        tr.append(crds1);
        tr.append(crds2);
        tr.append(crds3);
        $("#card-row-d").append(tr);
    },

    parseRepresentativeInfo: function (response,level) {
        this.repLevel = level;
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
                for(let j=0; j<oilen; j++) {
                    oi = response[0].offices[i].officialIndices[j];
                    this.repOrdIndex = oi;
                    if (!response[0].officials[oi].hasOwnProperty('name')) {
                        this.repName = "";
                    }
                    else {
                        this.repName = response[0].officials[oi].name;
                    }
                    if (!response[0].officials[oi].hasOwnProperty('party')) {
                        this.repParty = "";
                    }
                    else {
                        this.repParty = response[0].officials[oi].party;
                    }
                    if (this.repParty === "Republican Party") {
                        this.repPartyDisplay = "(R)";
                    }
                    else if (this.repParty === "Democratic Party") {
                        this.repPartyDisplay = "(D)";
                    }
                    else if (this.repParty === "Nonpartisan") {
                        this.repPartyDisplay = "(I)";
                    }
                    else {
                        console.log("NA PARTY DISP");
                    }
                    if(this.repName === "VACANT") {
                        this.repPartyDisplay = "";
                    }
                    if (!response[0].officials[oi].hasOwnProperty('emails')) {
                        this.repEmail = "";
                    }
                    else {
                        this.repEmail = response[0].officials[oi].emails[0];
                    }
                    if (!response[0].officials[oi].hasOwnProperty('phones')) {
                        this.repPhone = "";
                    }
                    else {
                        this.repPhone = response[0].officials[oi].phones[0];;
                    }
                    if (!response[0].officials[oi].hasOwnProperty('photoUrl')) {
                        this.repPhotoUrl = "./assets/blank-person.jpg";
                    }
                    else {
                        this.repPhotoUrl = response[0].officials[oi].photoUrl;
                    }
                    if (!response[0].officials[oi].hasOwnProperty('address')) {
                        this.repAddress = "";
                    }
                    else {
                        this.repAddress = response[0].officials[oi].address[0].line1 + " " +response[0].officials[oi].address[0].city + " " + response[0].officials[oi].address[0].state + " " + response[0].officials[oi].address[0].zip;
                    }
                    this.representativeRowBuilder();
                }
            }

        }
        else {
            this.displayNoInfoFound(level);
        }

    }
    
};