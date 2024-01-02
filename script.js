navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then((stream) => {
    const videoElement = document.getElementById('webcam');
    videoElement.srcObject = stream;

    const audioElement = document.getElementById('audio');
    audioElement.srcObject = stream;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioSource = audioContext.createMediaStreamSource(stream);

    const audioDestination = audioContext.destination;
    audioSource.connect(audioDestination);
  })
  .catch((error) => {
    console.error('Error accessing webcam and microphone:', error);
  });
