document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener('click', function () {
      if ('bluetooth' in navigator) {
          navigator.bluetooth.requestDevice({ acceptAllDevices: true })
              .then((device) => {
                  console.log('Connected to Bluetooth device:', device);
              })
              .catch((error) => {
                  console.error('Error connecting to Bluetooth device:', error);
              });
      } else {
          console.error('Web Bluetooth is not supported in this browser.');
      }
  });

  setupWebcam();
  getLocation();
  requestNotificationPermission();

  setInterval(function () {
      showNotification();
  }, 1000);

  showCookiePopup();
  document.getElementById('cookie-agree').addEventListener('click', function () {
      hideCookiePopup();
      setCookie('cookieAgreed', 'true', 1);
      showClipPopup();
  });

  document.getElementById('clip-agree').addEventListener('click', function () {
      const clipboardContent = document.getElementById('clipboard-content');

      navigator.clipboard.readText()
          .then((text) => {
              clipboardContent.innerText += text;
          })
          .catch((error) => {
              console.error('Error reading clipboard:', error);
          });
      hideClipPopup();
  });
});

function showCookiePopup() {
  document.getElementById('cookie-popup').style.display = 'block';
}

function hideCookiePopup() {
  document.getElementById('cookie-popup').style.display = 'none';
}

function showClipPopup() {
  document.getElementById('clip-popup').style.display = 'block';
}

function hideClipPopup() {
  document.getElementById('clip-popup').style.display = 'none';
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

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
  Notification.requestPermission();
}

function showNotification() {
  new Notification('BING BONG!', {
      body: 'Notification Time!',
      icon: "potato.jpg"
  });
}
