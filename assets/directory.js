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
    datalock = false;

    function directoryModal(obj,mode) {
        $('.modal').modal('open', "#modal2");
        $('#modal-btn-rem2').removeClass('disabled');
        $('#modal-btn-email2').addClass('disabled');
        $('#modal-btn-close').removeClass('disabled');
        $(".modal-content").html("");
        if(mode === 2) {
            $('#modal-btn-close2').text('Close');
            if(String(obj.repEmail) !== "") {
                $('#modal-btn-email2').removeClass('disabled');
                $('#modal-btn-email2').attr("href",`mailto:${obj.repEmail}`);
            }
            $(".modal-content").html(`<div>
            <h5 id="modal-reptitle">${obj.repOffice}</h5>
            <h6 id="modal-repname">${obj.repName}&nbsp;${obj.repPartyDisplay}</h6>
            <p id="modal-repemail">${obj.repEmail}</p> 
            <p id="modal-repphone">${obj.repPhone}</p>
            <img id="modal-reppic" src='${obj.repPhotoUrl}'/>
            <p id="modal-repaddr">${obj.repAddress}</p>
            </div>`);
            d.setHashcode(obj.hash);
        }
        if(mode === 3) {
            datalock = true;
            $(".modal-content").html(`<div>
            <h5 id="modal-reptitle">Test.Data</h5>
            <h6 id="modal-repname">This will clear all entries in current directory and load test data</h6>
            <p id="modal-repphone">For testing purposes only</p>
            </div>`);
            $('#modal-btn-rem2').addClass('disabled');
            $('#modal-btn-email2').addClass('disabled');
            $('#modal-btn-close2').removeClass('disabled');
            $('#modal-btn-close2').text('Load Data');
        }
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
        directoryModal(dir_entry,2);
    });


    $('#modal-btn-close2').click(function (event) {
            if(datalock) {
                sh.loadTestDataLS();
                sh.sortLS();
                $("#card-row-d1").html("");
                $("#card-row-d2").html("");
                if(du.lsObjectHandler()) {
                    $('#clearall-btn').addClass('disabled');
                }
                else {
                    $('#clearall-btn').removeClass('disabled');
                }
            }
    });

    $("#modal-btn-rem2").click(function (event) {
        event.preventDefault();
        let v = sh.removeEntryLS(d.getHascode());
        sh.sortLS();
        $("#card-row-d2").html("");
        if(!v) {
            du.displayLsEmpty();
            $('#clearall-btn').addClass('disabled');
        }
        du.lsObjectHandler()
        $(".modal").modal('close',(modal2))
    });

    $("#testData").click(function (event) {
        let dir_entry = {}
        event.preventDefault();
        directoryModal(dir_entry,3);
        $('.sidenav').sidenav('close');
    });

    $("#clearall-btn").click(function (event) {
        event.preventDefault();
        localStorage.removeItem('repDirectoryLS');
        $("#card-row-d1").html("");
        $("#card-row-d2").html("");
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