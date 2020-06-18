  console.log('we are in this file');

  var AllRepData = {
    Margo: {
      repName: "Margo",
      repParty: 'Democratic Party',
      repOffice: 'Supreme Leader'
    },
    Jason: {
      repName: "Jason",
      repParty: 'Democratic Party',
      repOffice: 'Supreme Leader'
    }
  }


  function handleModal() {
    $('.modal-content').empty();
    const repName = $(this).attr("data-rep");
    const repData = AllRepData[repName];
    console.log('repData is: ', repData);
    var modal = document.querySelector('.modal');
    var instance = M.Modal.init(modal);
    $('.modal-content').append(`<div> Name: ${repData.repName} </div>`);
    $('.modal-content').append(`<div> Party: ${repData.repParty} </div>`);
    $('.modal-content').append(`<div> Office: ${repData.repOffice} </div>`);
  
    instance.open();
  }
  
  $('#modal-trigger').click(handleModal);
  
  
 


// Modal Ticket Data needed. 
// repName ----- 	Rreprsentative Name
// repParty ---- 	Democratic Party, Republican Party, Nonpartisan
// repOffice --- 	Posistion Title
// repPartyDisp -	R, D, or I to be displayed next to the Representatives name
// repEmail -----  Email
// repPhone -----  Phone
// repPhotoUrl---  we will send a live link to a photo or a link to a stock picture (./assets/blak-person.jpg)
// repAddr ------- the Address to be displayed
// Text Area for a small email.