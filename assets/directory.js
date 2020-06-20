$(document).ready(function () {

    let directory = {

        "hashcode" : "",
        setHashcode: function(value) {
            this.hashcode = value;
        },

        getHascode: function() {
            return this.hashcode;
        }

    };

    du = dynamicUi;
    sh = storageHandler;
    d = directory;

    function directoryModal(obj) {
        $('.modal').modal('open', "#modal2");
        $('#modal-btn-email').addClass('disabled');
        if(String(obj.repEmail) !== "") { 
            $('#modal-btn-email').removeClass('disabled');
        }
        $(".modal-content").html(`<div class='class'>
        <h5>${obj.repOffice}</h5><h6>${obj.repName}&nbsp;${obj.repPartyDisplay}</h6>
        <p>${obj.repEmail}</p> 
        <p>${obj.repPhone}</p><img id="rep-pic-modal" src='${obj.repPhotoUrl}'/>
        <p>${obj.repAddress}</p>`);
        $("#email").attr("href",`mailto:${obj.repEmail}`);
        //working on the clear UI on close
        // $(".modal").modal('close',(clearUI))
        d.setHashcode(obj.hash);
        return 0;
    }

    $(document.body).on("click", "div[rep-office]", function() {

        let dir_entry = {
            'hash' : String($(this).attr('hash')),
            'repOrdIndex' : String($(this).attr('rep-ord-idx')),
            'repLevel' : String($(this).attr('rep-level')),
            'repOffice' : String($(this).attr('rep-office')),
            'repName' : String($(this).attr('rep-name')),
            'repParty' : String($(this).attr('rep-party')),
            'repPartyDisplay' : String($(this).attr('rep-party-display')),
            'repEmail' : String($(this).attr('rep-email')),
            'repPhone' : String($(this).attr('rep-phone')),
            'repPhotoUrl' : String($(this).attr('rep-photo-url')),
            'repAddress' : String($(this).attr('rep-address')),
        };
        /*console.log(`${dir_entry.hash} ${dir_entry.repOrdIndex} ${dir_entry.repLevel} ${dir_entry.repOffice} ${dir_entry.repName} ${dir_entry.repParty} ${dir_entry.repPartyDisplay} ${dir_entry.repEmail} ${dir_entry.repPhone} ${dir_entry.repPhotoUrl} ${dir_entry.repAddress}`);*/
        directoryModal(dir_entry);
    });

    $("#modal-btn-rem").click(function (event) {
        event.preventDefault();
        let v = sh.removeEntryLS(d.getHascode());
        sh.sortLS();
        $("#card-row-d").html("");
        if(!v) {
            du.displayLsEmpty();
            $('#clearall-btn').addClass('disabled');
        }
        du.lsObjectHandler()
        $(".modal").modal('close',(modal2))
    });

    $("#testdata-btn").click(function (event) {
        event.preventDefault();
        sh.loadTestDataLS();
        sh.sortLS();
        $("#card-row-d").html("");
        if(du.lsObjectHandler()) {
            $('#clearall-btn').addClass('disabled');
        }
        else {
            $('#clearall-btn').removeClass('disabled');
        }
    });

    $("#clearall-btn").click(function (event) {
        event.preventDefault();
        localStorage.removeItem('repDirectoryLS');
        $("#card-row-d").html("");
        if(du.lsObjectHandler()) {
            $('#clearall-btn').addClass('disabled');
        }
        else {
            $('#clearall-btn').removeClass('disabled');
        }
    });

    function initialState() {
        console.clear();
        if(du.lsObjectHandler()) {
            $('#clearall-btn').addClass('disabled');
        }
        else {
            $('#clearall-btn').removeClass('disabled');
        }
    }

    initialState();

});