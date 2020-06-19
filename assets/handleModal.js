//   console.log('we are in this file');

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

  $("#card-row-d").on("click","representative",function(){
        console.log($(this))
  $('#modal-trigger').click(handleModal);


  })

  
  
 

