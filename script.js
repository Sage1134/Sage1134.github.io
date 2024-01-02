document.addEventListener("DOMContentLoaded", function () {
  setupWebcam();
  getLocation();
  requestNotificationPermission();
});

function setupWebcam() {
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
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showLocation);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

function showLocation(position) {
  const locationDiv = document.getElementById("location");
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  locationDiv.innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function requestNotificationPermission() {
  if ('Notification' in window) {
      Notification.requestPermission().then(function(permission) {
          if (permission === 'granted') {
              showNotification();
          }
      });
  }
}

window.addEventListener('beforeunload', function(event) {
  showNotificationOnClose();
});

function showNotification() {
  if ('Notification' in window) {
      new Notification('Welcome!', {
          body: 'Thank you for visiting our website.',
      });
  }
}

function showNotificationOnClose() {
  if ('Notification' in window) {
      new Notification('Goodbye!', {
          body: 'We hope to see you again soon.',
      });
  }
}