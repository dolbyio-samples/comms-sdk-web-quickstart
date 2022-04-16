const avengersNames = ['Daniel', 'Kathy', 'Bryce', 'Galen', 'Bobby', 'Joe'];
let randomName = avengersNames[Math.floor(Math.random() * avengersNames.length)];


const main = async () => {

  /* Event handlers */

  // When a stream is added to the conference
  VoxeetSDK.conference.on('streamAdded', (participant, stream) => {
    if (stream.getVideoTracks().length) {
      // Only add the video node if there is a video track
      addVideoNode(participant, stream);
    }
  });



  // When a stream is updated
  VoxeetSDK.conference.on('streamUpdated', (participant, stream) => {

    if (stream.getVideoTracks().length) {
      // Only add the video node if there is a video track
      addVideoNode(participant, stream);
    } else {
      removeVideoNode(participant);
    }
  });

  // When a stream is removed from the conference
  VoxeetSDK.conference.on('streamRemoved', (participant, stream) => {
    removeVideoNode(participant);
  });

  document.getElementById("btn-initialize").onclick = async () => {
    var key =  document.getElementById('input-consumer-key').value;
    var secret =  document.getElementById('input-consumer-secret').value;
    VoxeetSDK.initialize(key, secret);
    hideModal('init-modal');
    document.getElementById('shareLink').href = window.location.href;
  }
 


  const displayModal = (elementId) => {
    const modalElement = document.getElementById(elementId);
    const bootstrapModal = new bootstrap.Modal(modalElement, {
      backdrop: 'static',
      keyboard: false,
      focus: true
    });
    bootstrapModal.show();
  }

  const hideModal = (elementId) => {
    const modalElement = document.getElementById(elementId);
    const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();
  }



  /**
 * 
 *  Please read the documentation at:
 *  https://docs.dolby.io/communications-apis/docs/initializing-javascript
 *  Return the Developer Token 
 */


  try {
    // Initialize the Voxeet SDK
    const urlParams = new URLSearchParams(window.location.search);
    let token = (apiToken != '<REPLACE-WITH-YOUR-DEVELOPER-TOKEN>') ? apiToken : urlParams.get('token') || null;

    

    

    if (token === "" || token === null) {
 
      displayModal('init-modal');
    } else {
      if (token != undefined) {
        document.getElementById('shareLink').href = window.location.href;
        console.log(`Initialize the SDK with the Access Token: ${token}`);
        VoxeetSDK.initializeToken(token, () => new Promise((resolve) => resolve(token)))
      } else {
        displayModal('init-modal');
      }
    }




    // let token = await developerToken();
    // await VoxeetSDK.initializeToken(token,() => new Promise((resolve) => resolve(token)));

    // Initialize the UI
    initUI();
  } catch (e) {
    alert('Something went wrong : ' + e);
  }
}



(function () {
  main();
})();