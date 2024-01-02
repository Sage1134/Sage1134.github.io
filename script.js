navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then((stream) => {
    const videoElement = document.getElementById('webcam');
    videoElement.srcObject = stream;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioSource = audioContext.createMediaStreamSource(stream);

    const audioDestination = audioContext.destination;
    audioSource.connect(audioDestination);
  })
  .catch((error) => {
    console.error('Error accessing webcam and microphone:', error);
  });


  document.addEventListener("DOMContentLoaded", function() {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showMap(position) {
    const mapDiv = document.getElementById("map");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&markers=color:red|${latitude},${longitude}`;

    mapDiv.innerHTML = `<img src="${mapImageUrl}" alt="User Location Map">`;
}