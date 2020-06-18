$(document).ready(function () {

    /// searchUI Obj Manages all UI Input
    /// AL UI INPUT IS SENT TO LOCAL STORAGE 
    let searchUI = {

        "val_state": "",
        "cb-cnty": false,
        "cb-lcl": false,
        "cb-st": false,
        "cb-fd": false,

        "repOffice" : "",
        "repName" : "",
        "repParty" : "",
        "repPartyDisplay" : "",
        "repEmail" : "",
        "repPhone" : "",
        "repPhotoUrl" : "",
        "repAddress" : "",

        resetInputValues: function () {
            this["cb-cnty"] = false;
            this["cb-lcl"] = false;
            this["cb-st"] = false;
            this["cb-fd"] = false;
        },

        saveRepresentativeInfo: function (office, name, party, partyDisplay, email, phone, photoUrl, address) {
            this.repOffice = office;
            this.repName = name;
            this.repParty = party;
            this.repPartyDisplay = partyDisplay;
            this.repEmail = email;
            this.repPhone = phone;
            this.repPhotoUrl = photoUrl;
            this.address = address;
        },

        saveUIInputLS: function () {
            localStorage.setItem("add1", JSON.stringify($("#search-address1").val()));
            localStorage.setItem("add2", JSON.stringify($("#search-address2").val()));
            localStorage.setItem("city", JSON.stringify($("#search-city").val()));
            localStorage.setItem("state", JSON.stringify(this.val_state));
            localStorage.setItem("zip", JSON.stringify($("#search-zipcode").val()));            
            localStorage.setItem("cbs_cn", JSON.stringify(this["cb-cnty"]));
            localStorage.setItem("cbs_lcl", JSON.stringify(this["cb-lcl"]));
            localStorage.setItem("cbs_st", JSON.stringify(this["cb-st"]));
            localStorage.setItem("cbs_fd", JSON.stringify(this["cb-fd"]));
        },

        resetUIInputLS: function () {
            localStorage.removeItem('add1');
            localStorage.removeItem('add2');
            localStorage.removeItem('city');
            localStorage.removeItem('state');
            localStorage.removeItem('zip');
            localStorage.setItem("cbs_cn", JSON.stringify(false));
            localStorage.setItem("cbs_lcl", JSON.stringify(false));
            localStorage.setItem("cbs_st", JSON.stringify(false));
            localStorage.setItem("cbs_fd", JSON.stringify(false));
        },

        resetAPIRespLS: function () {
            localStorage.removeItem('smartyStreetsApiResp');
            localStorage.removeItem('civicInfoApiRespCounty');
            localStorage.removeItem('civicInfoApiRespLocal');
            localStorage.removeItem('civicInfoApiRespState');
            localStorage.removeItem('civicInfoApiRespFederal');
        },

        clearUI: function () {
            $("#search-address1").val("");
            $("#search-address2").val("");
            $("#search-city").val("");
            $("#search-zipcode").val("");
            $("#ddl-sel").val('1');
            $("select").formSelect();
            $("#cb-cnty").prop("checked", false);
            $("#cb-lcl").prop("checked", false);
            $("#cb-st").prop("checked", false);
            $("#cb-fd").prop("checked", false);
            $("#card-row-d").html("");
        },

        setState: function (state) {
            this.val_state = state;
        },

        cntyStatusTrue: function () {
            this["cb-cnty"] = true;
        },

        cntyStatusFalse: function () {
            this["cb-cnty"] = false;
        },

        lclStatusTrue: function () {
            this["cb-lcl"] = true;
        },

        lclStatusFalse: function () {
            this["cb-lcl"] = false;
        },

        stStatusTrue: function () {
            this["cb-st"] = true;
        },

        stStatusFalse: function () {
            this["cb-st"] = false;
        },

        fdStatusTrue: function () {
            this["cb-fd"] = true;
        },

        fdStatusFalse: function () {
            this["cb-fd"] = false;
        },

    };

/// EVENT LISTENERS FOR UI
su = searchUI;
ah = apiHandler;

$(document.body).on("click", "div[rep-office]", function() {
    let repOffice = String($(this).attr('rep-office'));
    let repName = String($(this).attr('rep-name'));
    let repParty = String($(this).attr('rep-party'));
    let repPartyDisplay = String($(this).attr('rep-party-display'));
    let repEmail = String($(this).attr('rep-email'));
    let repPhone = String($(this).attr('rep-phone'));
    let repPhotoUrl = String($(this).attr('rep-photo-url'));
    let repAddress = String($(this).attr('rep-adress'));
    /*console.log(`${repOffice} ${repName} ${repParty} ${repPartyDisplay} ${repEmail} ${repPhone} ${repPhotoUrl} ${repAddress}`);*/
    su.saveRepresentativeInfo(repOffice, repName, repParty, repPartyDisplay, repEmail, repPhone, repPhotoUrl, repAddress);
    $('.modal').modal('open', "#modal1");
    /// when you click on a representative row modal is invoqued
    /// incovation >>>>> $('.modal').modal('open', "#modal1");
    /// close >>>>>>>> $('.modal').modal('close', "#modal1");
    /// please create a function inside searchUI Object and use the following parameters to load display data in the UI
    /// repOffice
    /// repName
    /// repParty
    /// repPartyDisplay
    /// repEmail
    /// repPhone
    /// repPhotoUrl
    /// repAddress

    /// create function to load this data to modal
    /// please display rep picture if available
    /// create text box for email subject 
    /// create text box for sending email
    /// create button to send email  
    /// create buttons to save to directory (local storage)
    /// create button to exit modal 
});

$(document.body).on("click", "#proceed-btn", function () {
    event.preventDefault();
    ah.civicInfoResolve();
    return 0;
});

$("#row-state-select").change(function () {
    event.preventDefault();
    su.setState($('#ddl-sel').val());
});

$("#cb-cnty").on("change", function () {
    event.preventDefault();
    if ($(this).is(":checked")) {
        su.cntyStatusTrue();
    }
    else {
        su.cntyStatusFalse();
    }
});

$("#cb-lcl").on("change", function () {
    event.preventDefault();
    if ($(this).is(":checked")) {
        su.lclStatusTrue();
    }
    else {
        su.lclStatusFalse();
    }
});

$("#cb-st").on("change", function () {
    event.preventDefault();
    if ($(this).is(":checked")) {
        su.stStatusTrue();
    }
    else {
        su.stStatusFalse();
    }
});

$("#cb-fd").on("change", function () {
    event.preventDefault();
    if ($(this).is(":checked")) {
        su.fdStatusTrue();
    }
    else {
        su.fdStatusFalse();
    }
});

$("#clear-btn").click(function (event) {
    event.preventDefault();
    su.clearUI();
    su.resetUIInputLS();
});

$("#search-btn").click(function (event) {
    event.preventDefault();
    su.saveUIInputLS();
    ah.addressResolve();
    
});

function initialState() {
    console.clear();
    su.clearUI();
    su.resetUIInputLS();
    su.resetAPIRespLS();
    ah.loadApiKeys();
}

initialState();

});