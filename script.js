navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    const videoElement = document.getElementById('webcam');
    videoElement.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing webcam:', error);
  });
