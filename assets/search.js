$(document).ready(function () {

    let searchUI = {

        "val_add1": "",
        "val_add2": "",
        "val_city": "",
        "val_state": "",
        "val_zip": "",

        "val-cnty": false,
        "val-lcl": false,
        "val-st": false,
        "val-fd": false,

        "cb-cnty": false,
        "cb-lcl": false,
        "cb-st": false,
        "cb-fd": false,

        "aICity": "",
        "aTCity": "",
        "aKG": "",




        resetInputValues: function () {
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

        saveUILS: function () {

            let add1 = $("#search-address1").val()
            let add2 = $("#search-address2").val()
            let city = $("#search-city").val()
            let zip = $("#search-zipcode").val()

            let cn = this["cb-cnty"];
            let lcl = this["cb-lcl"];
            let st = this["cb-st"];
            let fd = this["cb-fd"];

            localStorage.setItem("cbs_cn", JSON.stringify(cn));
            localStorage.setItem("cbs_lcl", JSON.stringify(lcl));
            localStorage.setItem("cbs_st", JSON.stringify(st));
            localStorage.setItem("cbs_fd", JSON.stringify(fd));
        },

        resetCBLS: function () {
            let cn = false;
            let lcl = false;
            let st = false;
            let fd = false;

            localStorage.setItem("cbs_cn", JSON.stringify(cn));
            localStorage.setItem("cbs_lcl", JSON.stringify(lcl));
            localStorage.setItem("cbs_st", JSON.stringify(st));
            localStorage.setItem("cbs_fd", JSON.stringify(fd));
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

su = searchUI;

$(document.body).on("click", "#proceed-btn", function () {
    event.preventDefault();
    su.resolveCivicInformation();
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
    localStorage.removeItem('smartyStreetsRealAddress');
    su.resetCBLS();
});

$("#search-btn").click(function (event) {
    event.preventDefault();
    localStorage.removeItem('smartyStreetsRealAddress');
    su.getUIInput();
    su.resolveSmartyStreets();
});

function initialState() {
    console.clear();
    su.resetInputValues();
    localStorage.removeItem('smartyStreetsRealAddress');
}

initialState();

});

