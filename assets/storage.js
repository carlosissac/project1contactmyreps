let storageHandler = {

    saveToLS: function(searchUI) {
    
        const array = [];
        let hash = moment();
        let new_entry = {
            'hash' : hash.format('x'),
            'repOrdIndex': searchUI.repOrdIndex, 
            'repLevel': searchUI.repLevel, 
            'repOffice': searchUI.repOffice,
            'repName': searchUI.repName,
            'repParty': searchUI.repParty,
            'repPartyDisplay': searchUI.repPartyDisplay, 
            'repEmail': searchUI.repEmail,
            'repPhone': searchUI.repPhone,
            'repPhotoUrl': searchUI.repPhotoUrl,
            'repAddress': searchUI.repAddress,
        }

        if(localStorage.getItem('repDirectoryLS')) {
            var buffer = JSON.parse(localStorage.getItem('repDirectoryLS'));
            for(var i=0; i<buffer.length; i++) {
                array.push(buffer[i]);
            }
        }
        array.push(new_entry);
        localStorage.setItem('repDirectoryLS', JSON.stringify(array));
        //console.log(JSON.parse(localStorage.getItem('repDirectoryLS')));
    },

    removeEntryLS: function(hash) {

        var buffer = JSON.parse(localStorage.getItem('repDirectoryLS'));
        var i=0;
        while(i<buffer.length) {
            if(buffer[i].hash === hash) {
                buffer.splice(i, 1);
                break;
            }
            i++;
        }
        localStorage.setItem('repDirectoryLS', JSON.stringify(buffer));
        //console.log(JSON.parse(localStorage.getItem('repDirectoryLS')));
        return buffer.length;
    },

    sortLS: function() {

        const array = [];
        if(localStorage.getItem('repDirectoryLS')) {
            var buffer = JSON.parse(localStorage.getItem('repDirectoryLS'));
            for(var i=0; i<buffer.length; i++) {
                array.push(buffer[i]);
            }
        }
        array.sort((a,b)=> new String(a.repOrdIndex) - new String(b.repOrdIndex));
        localStorage.setItem('repDirectoryLS', JSON.stringify(array));
        //console.log(JSON.parse(localStorage.getItem('repDirectoryLS')));

        return 0;
    },

    duplicateCheckLS: function(name, office) {
        let i=0;
        if(localStorage.getItem('repDirectoryLS')) {
            var buffer = JSON.parse(localStorage.getItem('repDirectoryLS'));
            //console.log(buffer.length);
            for(i=0; i<buffer.length; i++) {
                //console.log(`${buffer[i].repName} ${buffer[i].repOffice}`);
                if((name === buffer[i].repName) && (office === buffer[i].repOffice)) {
                    return 1;
                }
            }
            if(i === (buffer.length)) {
                return 0;
            }
        }
        else {
            ///LS Currently empty No conflict
            return 0;
        }
    },

    
    loadTestDataLS: function() {

        this.clearDirectoryLS();

        testData = [{"hash":"1592602775158","repOrdIndex":"0","repLevel":"Federal","repOffice":"President of the United States","repName":"Donald J. Trump","repParty":"Republican Party","repPartyDisplay":"(R)","repEmail":"","repPhone":"(202) 456-1111","repPhotoUrl":"https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/PE%20Color.jpg","repAddress":"1600 Pennsylvania Avenue Northwest Washington DC 20500"},{"hash":"1592602825255","repOrdIndex":"0","repLevel":"State","repOffice":"Governor of Oregon","repName":"Kate Brown","repParty":"Democratic Party","repPartyDisplay":"(D)","repEmail":"","repPhone":"(503) 378-3111","repPhotoUrl":"http://www.oregon.gov/gov/PublishingImages/media/Governor-Kate-Brown-Official-Photo-web.jpg","repAddress":"900 Court Street Northeast Salem OR 97301"},{"hash":"1592602776835","repOrdIndex":"1","repLevel":"Federal","repOffice":"Vice President of the United States","repName":"Mike Pence","repParty":"Republican Party","repPartyDisplay":"(R)","repEmail":"","repPhone":"(202) 456-1111","repPhotoUrl":"https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/VPE%20Color.jpg","repAddress":"1600 Pennsylvania Avenue Northwest Washington DC 20500"},{"hash":"1592602821171","repOrdIndex":"1","repLevel":"Local","repOffice":"Portland City Commissioner","repName":"Chloe Eudaly","repParty":"Nonpartisan","repPartyDisplay":"(I)","repEmail":"Chloe@portlandoregon.gov","repPhone":"(503) 823-4682","repPhotoUrl":"http://www.portlandoregon.gov/eudaly/images/logo.png","repAddress":"1221 Southwest 4th Avenue Portland OR 97204"},{"hash":"1592602926348","repOrdIndex":"1","repLevel":"State","repOffice":"OR State Senator","repName":"Ginny Burdick","repParty":"Democratic Party","repPartyDisplay":"(D)","repEmail":"Sen.GinnyBurdick@oregonlegislature.gov","repPhone":"(503) 986-1700","repPhotoUrl":"http://www.oregonlegislature.gov/senate/MemberPhotos/burdick.jpg","repAddress":"900 Court Street Northeast Salem OR 97301"},{"hash":"1592602783585","repOrdIndex":"2","repLevel":"State","repOffice":"CA State Senator","repName":"Ben Hueso","repParty":"Democratic Party","repPartyDisplay":"(D)","repEmail":"senator.hueso@sen.ca.gov","repPhone":"(916) 651-4040","repPhotoUrl":"http://senate.ca.gov/sites/senate.ca.gov/files/senator_photos/hueso-ben.jpg","repAddress":"State Capitol Sacramento CA 95814-4900"},{"hash":"1592602938959","repOrdIndex":"2","repLevel":"Federal","repOffice":"U.S. Senator","repName":"Ron Wyden","repParty":"Democratic Party","repPartyDisplay":"(D)","repEmail":"","repPhone":"(202) 224-5244","repPhotoUrl":"http://bioguide.congress.gov/bioguide/photo/W/W000779.jpg","repAddress":"221 Dirksen Senate Office Building Washington DC 20510"},{"hash":"1592602770840","repOrdIndex":"3","repLevel":"State","repOffice":"CA State Assemblymember","repName":"Eduardo Garcia","repParty":"Democratic Party","repPartyDisplay":"(D)","repEmail":"assemblymember.garcia@assembly.ca.gov","repPhone":"(760) 347-2360","repPhotoUrl":"http://assembly.ca.gov/sites/assembly.ca.gov/files/memberphotos/AD56_Garcia_Portrait150_20141201.jpg","repAddress":"California State Capitol Sacramento CA 94249-0056"},{"hash":"1592602779067","repOrdIndex":"3","repLevel":"Federal","repOffice":"U.S. Senator","repName":"Dianne Feinstein","repParty":"Democratic Party","repPartyDisplay":"(D)","repEmail":"","repPhone":"(202) 224-3841","repPhotoUrl":"http://bioguide.congress.gov/bioguide/photo/F/F000062.jpg","repAddress":"331 Hart Senate Office Building Washington DC 20510"},{"hash":"1592602822638","repOrdIndex":"3","repLevel":"Local","repOffice":"Portland City Commissioner","repName":"Amanda Fritz","repParty":"Nonpartisan","repPartyDisplay":"(I)","repEmail":"Amanda@portlandoregon.gov","repPhone":"(503) 823-3008","repPhotoUrl":"http://www.portlandonline.com/shared/cfm/image.cfm?id=623186","repAddress":"1221 Southwest 4th Avenue Portland OR 97204"},{"hash":"1592602934841","repOrdIndex":"3","repLevel":"Federal","repOffice":"U.S. Senator","repName":"Jeff Merkley","repParty":"Democratic Party","repPartyDisplay":"(D)","repEmail":"","repPhone":"(202) 224-3753","repPhotoUrl":"http://bioguide.congress.gov/bioguide/photo/M/M001176.jpg","repAddress":"313 Hart Senate Office Building Washington DC 20510"},{"hash":"1592602780727","repOrdIndex":"4","repLevel":"Federal","repOffice":"U.S. Representative","repName":"Juan Vargas","repParty":"Democratic Party","repPartyDisplay":"(D)","repEmail":"","repPhone":"(202) 225-8045","repPhotoUrl":"http://bioguide.congress.gov/bioguide/photo/V/V000130.jpg","repAddress":"2244 Rayburn House Office Building Washington DC 20515"},{"hash":"1592602937451","repOrdIndex":"4","repLevel":"Federal","repOffice":"U.S. Representative","repName":"Earl Blumenauer","repParty":"Democratic Party","repPartyDisplay":"(D)","repEmail":"","repPhone":"(202) 225-4811","repPhotoUrl":"http://bioguide.congress.gov/bioguide/photo/B/B000574.jpg","repAddress":"1111 Longworth House Office Building Washington DC 20515"}];

        localStorage.setItem('repDirectoryLS', JSON.stringify(testData));
        //console.log(JSON.parse(localStorage.getItem('repDirectoryLS')));
    },

    clearDirectoryLS: function(searchUI) {
        localStorage.removeItem('repDirectoryLS');
    }

};
