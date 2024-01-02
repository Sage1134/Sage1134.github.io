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


function initMap() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const mapOptions = {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 15,
      };

      const map = new google.maps.Map(document.getElementById('map'), mapOptions);
      const marker = new google.maps.Marker({
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        map: map,
        title: 'Your Location',
      });
    },
    (error) => {
      console.error('Error getting location:', error);
    }
  );
}