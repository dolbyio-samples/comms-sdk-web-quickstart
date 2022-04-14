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


  /**
 * 
 *  Please read the documentation at:
 *  https://docs.dolby.io/communications-apis/docs/initializing-javascript
 *  Return the Developer Token 
 */

  async function developerToken() {
    return apiToken;
  }


  try {
    // Initialize the Voxeet SDK

    let token = await developerToken();
    await VoxeetSDK.initializeToken(token, developerToken);

    // Initialize the UI
    initUI();
  } catch (e) {
    alert('Something went wrong : ' + e);
  }
}

main();