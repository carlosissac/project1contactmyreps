$(document).ready(function () {

    /// searchUI Obj Manages all UI Input
    /// AL UI INPUT IS SENT TO LOCAL STORAGE 
    let searchUI = {

        "val_state": "",
        "cb-cnty": false,
        "cb-lcl": false,
        "cb-st": false,
        "cb-fd": false,

        resetInputValues: function () {
            this["cb-cnty"] = false;
            this["cb-lcl"] = false;
            this["cb-st"] = false;
            this["cb-fd"] = false;
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

$(document.body).on("click", "tr[card-row]", function() {
        console.log("CLLLLICKEDDDDDDDD");
    
    
    
    
    /*var eid = Number($(this).attr('event-id'));
    var es = Number($(this).attr('e-stat'));
    var ehr = String($(this).attr('e-hr'));
    var ed = String($(this).attr('e-day'));
    var rh = Number($(this).attr("real-hour"));
    dp.saveRealHour(rh);
    dp.saveEventId(eid);

    if(!eid && (es === 2)) {
        $("#new-modal-eventname").val("");
        $("#new-modal-msgarea").text("");
        $("#new-modal-msgarea").css('color', 'black');
        $("#new-rad1").prop('checked', true);
        $("#new-date-modal2-lbl").text(ed + " " + ehr);
        $("#new-modal").modal("show");
    }
    else if (eid && (es === 2)) {
        dp.editModalEventInfoLoad(eid);
        $("#edit-date-modal2-lbl").text(ed + " " + ehr);
        $("#edit-modal").modal("show");
    }
    else if ((eid && (es === 1)) || (eid && (es === 0))) {
        dp.delModalEventInfoLoad(eid);
        $("#del-date-modal2-lbl").text(ed + " " + ehr);
        $("#del-modal").modal("show");
    }
    else {

    }*/
});

$(document.body).on("click", "#proceed-btn", function () {
    event.preventDefault();
    ah.civicInfoResolve()
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