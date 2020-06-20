$(document).ready(function () {

    /// searchUI Obj Manages all UI Input
    /// AL UI INPUT IS SENT TO LOCAL STORAGE 
    let searchUI = {

        "val_state": "",
        "cb-cnty": false,
        "cb-lcl": false,
        "cb-st": false,
        "cb-fd": false,

        "hash" : "",
        "repLevel" : "",
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

        saveRepresentativeInfo: function (hash, ordIndex, level, office, name, party, partyDisplay, email, phone, photoUrl, address) {
            this.hash = hash;
            this.repOrdIndex = ordIndex;
            this.repLevel = level;
            this.repOffice = office;
            this.repName = name;
            this.repParty = party;
            this.repPartyDisplay = partyDisplay;
            this.repEmail = email;
            this.repPhone = phone;
            this.repPhotoUrl = photoUrl;
            this.repAddress = address;
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

        enableUIAfterSearch: function () {
            $("#search-btn").removeClass('disabled');
            $("#proceed-btn").removeClass('disabled');
            return 0;
        },

        disableUIAfterSearch: function () {
            $("#search-btn").addClass('disabled');
            $("#proceed-btn").addClass('disabled');
            return 0;
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

        clearForm: function () {
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
        },


        searchModal: function (storageHandler) {    
            $('.modal').modal('open', "#modal1");
            $('#modal-btn-email').addClass('disabled');
            if(String(this.repEmail) !== "") { 
                $('#modal-btn-email').removeClass('disabled');
            }
            $('#modal-btn-save').addClass('disabled');
            if(!storageHandler.duplicateCheckLS(this.repName,this.repOffice)) {
                $('#modal-btn-save').removeClass('disabled');
            }
            $(".modal-content").html(`<div class='class'>
            <h5>${this.repOffice}</h5><h6>${this.repName}&nbsp;${this.repPartyDisplay}</h6>
            <p>${this.repEmail}</p> 
            <p>${this.repPhone}</p><img id="rep-pic-modal" src='${this.repPhotoUrl}'/>
            <p>${this.repAddress}</p>`);
            $("#email").attr("href",`mailto:${this.repEmail}`);
            return 0;
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
sh = storageHandler; 

$(document.body).on("click", "div[rep-office]", function() {
    let hash = String($(this).attr('hash'));
    let repOrdIndex = String($(this).attr('rep-ord-idx'));
    let repLevel = String($(this).attr('rep-level'));
    let repOffice = String($(this).attr('rep-office'));
    let repName = String($(this).attr('rep-name'));
    let repParty = String($(this).attr('rep-party'));
    let repPartyDisplay = String($(this).attr('rep-party-display'));
    let repEmail = String($(this).attr('rep-email'));
    let repPhone = String($(this).attr('rep-phone'));
    let repPhotoUrl = String($(this).attr('rep-photo-url'));
    let repAddress = String($(this).attr('rep-address'));
    /*console.log(`${hash} ${repOrdIndex} ${repLevel} ${repOffice} ${repName} ${repParty} ${repPartyDisplay} ${repEmail} ${repPhone} ${repPhotoUrl} ${repAddress}`);*/
    su.saveRepresentativeInfo(hash, repOrdIndex, repLevel, repOffice, repName, repParty, repPartyDisplay, repEmail, repPhone, repPhotoUrl, repAddress);
    su.searchModal(sh);
    su.clearForm();
    //disable UI only Clear Btn available
    
});

$("#modal-btn-save").click(function (event) {
    event.preventDefault();
    sh.saveToLS(su)
    sh.sortLS();
    $(".modal").modal('close',(modal1))
});

$(document.body).on("click", "#proceed-btn", function () {
    event.preventDefault();
    ah.civicInfoResolve();
    su.disableUIAfterSearch();
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
    su.enableUIAfterSearch();
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
    //su.enableUIAfterSearch();
    ah.loadApiKeys();
}

initialState();

});