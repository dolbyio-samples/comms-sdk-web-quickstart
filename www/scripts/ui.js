const initUI = async () => {
	// Update the login message with the name of the user
	document.getElementById("name-input").value = randomName;

	// Start with audio off 
	let audioOn = true;

	document.getElementById("join-btn").onclick = async () => {
		// open a session with participant object
		await VoxeetSDK.session
			.open({ name: document.getElementById("name-input").value })
			.catch((err) => console.error(err));

		// Default conference parameters
		// See: https://docs.dolby.io/communications-apis/docs/js-client-sdk-model-conferenceparameters
		// What if we changed these?
		let conferenceParams = {
			liveRecording: true,
			rtcpMode: "average", // worst, average, max
			ttl: 0,
			videoCodec: "H264", // H264, VP8
		};

		// See: https://docs.dolby.io/interactivity/docs/js-client-sdk-model-conferenceoptions
		let conferenceOptions = {
			alias: document.getElementById("alias-input").value,
			params: conferenceParams,
		};

		// 1. Create a conference room with an alias
		VoxeetSDK.conference
			.create(conferenceOptions)
			.then((conference) => {
				// See: https://docs.dolby.io/interactivity/docs/js-client-sdk-model-joinoptions
				const joinOptions = {
					constraints: {
						audio: audioOn,
						video: true,
					},
				};

				// 2. Join the conference
				// What if we instead enabled all buttons?
				VoxeetSDK.conference
					.join(conference, joinOptions)
					.then((conf) => {
						//update ui
						document.getElementById("name-input").disabled = true;
						document.getElementById("join-btn").classList.add("d-none");
						document.getElementById("leave-btn").classList.remove("d-none");

						//conditional
						// Show and hide
						if (audioOn) {
							// hide the start btn
							document.getElementById("start-audio-btn").classList.add("d-none");
							document.getElementById("stop-audio-btn").classList.remove("d-none");
						} else {
							// show start btn
							document.getElementById("start-audio-btn").classList.remove("d-none");
							document.getElementById("stop-audio-btn").classList.add("d-none");
						}

						//reset other ui elements
						document.getElementById("start-video-btn").classList.add("d-none");
						document.getElementById("stop-video-btn").classList.remove("d-none");
						document.getElementById("alias-input").disabled = true;

						// inform user
						showSnack('You Joined!')

					})
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	};

	document.getElementById("leave-btn").onclick = async () => {
		// Leave the conference
		VoxeetSDK.conference
			.leave()
			.then(() => {
				// See Docs:  https://docs.dolby.io/communications-apis/docs/initializing-javascript#open-a-session
				// close the session
				VoxeetSDK.session
					.close()
					.then(() => {
						//update ui
						document.getElementById("join-btn").classList.remove("d-none");
						document.getElementById("leave-btn").classList.add("d-none");
						document.getElementById("name-input").disabled = false;
						document.getElementById("alias-input").disabled = false;
						//reset other ui elements
						document.getElementById("start-video-btn").classList.add("d-none");
						document.getElementById("stop-video-btn").classList.add("d-none");
						document.getElementById("start-audio-btn").classList.add("d-none");
						document.getElementById("stop-audio-btn").classList.add("d-none");

						// inform user
						showSnack('You left!')
					})
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	};

	document.getElementById("start-video-btn").onclick = async () => {
		// Start sharing the video with the other participants
		VoxeetSDK.conference
			.startVideo(VoxeetSDK.session.participant)
			.then(() => {
				//update ui
				document.getElementById("start-video-btn").classList.add("d-none");
				document.getElementById("stop-video-btn").classList.remove("d-none");
				// inform user
				showSnack('Your video is streaming.')
			})
			.catch((err) => console.error(err));
	};

	document.getElementById("stop-video-btn").onclick = async () => {
		// Stop sharing the video with the other participants
		VoxeetSDK.conference
			.stopVideo(VoxeetSDK.session.participant)
			.then(() => {
				//update ui
				document.getElementById("start-video-btn").classList.remove("d-none");
				document.getElementById("stop-video-btn").classList.add("d-none");
				// inform user
				showSnack('Your video is no longer streaming.')
			})
			.catch((err) => console.error(err));
	};

	document.getElementById("start-audio-btn").onclick = async () => {
		// Start sharing the Audio with the other participants
		VoxeetSDK.conference
			.startAudio(VoxeetSDK.session.participant)
			.then(() => {
				//update ui
				document.getElementById("start-audio-btn").classList.add("d-none");
				document.getElementById("stop-audio-btn").classList.remove("d-none");
				// inform user
				showSnack('Your audio is streaming.')
			})
			.catch((err) => console.error(err));
	};

	document.getElementById("stop-audio-btn").onclick = async () => {
		// Stop sharing the Audio with the other participants
		VoxeetSDK.conference
			.stopAudio(VoxeetSDK.session.participant)
			.then(() => {
				//update ui
				document.getElementById("start-audio-btn").classList.remove("d-none");
				document.getElementById("stop-audio-btn").classList.add("d-none");
				// inform user
				showSnack('Your audio is no longer streaming.')
			})
			.catch((err) => console.error(err));
	};
	// end UIInit
};


// Add a video card and stream to the web page
const addVideoNode = (participant, stream) => {
	let videoNode = document.getElementById("video-" + participant.id);

	if (!videoNode) {
		const videoContainer = document.getElementById("video-container");
		let cardNode = buildVideoNode(participant.info.name, participant.id);
		videoNode = document.createElement("video");
		videoNode.setAttribute("id", "video-" + participant.id);

		// add css class to mirror current user's video
		if (participant.id === VoxeetSDK.session.participant.id) {
			videoNode.classList.add("flipped-video");
		} else {
			videoNode.classList.remove("flipped-video");
		}

		videoNode.setAttribute("height", "100%");
		videoNode.setAttribute("width", "100%");
		videoNode.setAttribute("playsinline", true);
		videoNode.muted = true;
		videoNode.setAttribute("autoplay", "autoplay");

		// insert the video card
		videoContainer.insertAdjacentHTML("beforeend", cardNode);
		// update the video element in the video card with our videoNode
		document.getElementById("video-card-body-" + participant.id).firstElementChild.replaceWith(videoNode);
	}
	navigator.attachMediaStream(videoNode, stream);
};

// Remove the video stream from the web page
const removeVideoNode = (participant) => {
	let videoNode = document.getElementById("video-" + participant.id);
	if (videoNode) {
		// traverse up parentNode to find cardNode element
		let cardNode = videoNode.parentElement.parentElement.parentElement;
		videoNode.srcObject = null; // Prevent memory leak in Chrome
		cardNode.parentNode.removeChild(cardNode);
	}
};


// Utilities

const showSnack = (message) => {
	var snackbar = document.getElementById("snackbar");
	snackbar.className = "show";
	snackbar.innerHTML = message;
	setTimeout(function () {
		snackbar.className = snackbar.className.replace("show", "");
	}, 6000);
}

// Build  video card node via a template
const buildVideoNode = (name, id) => {
	let cardID = "video-card-" + id;
	let cardBodyID = "video-card-body-" + id;
	let videoID = "video-" + id;

	let node = `<div id="${cardID}" class="col.12 col-sm-4">
  <div class="card d-xl-flex flex-shrink-1 justify-content-xl-center align-items-xl-center"
	  style="margin: 6px;margin-top: 5px;margin-right: 5px;margin-bottom: 5px;margin-left: 5px;">
	  <div id="${cardBodyID}"
		  class="card-body text-sm-center text-capitalize text-center text-white-50 video-card-body">
		  <video id="${videoID}" class="video-player" width="100%" height="100%" autoplay="" playsinline="true"
			  muted style="width: 100%;height: 100%;">
		  </video>
		  <h4 class="text-center card-title">${name}</h4>
	  </div>
  </div>
</div>`
	return node;
};