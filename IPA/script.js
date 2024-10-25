// Get the camera container and button elements
const cameraContainer = document.getElementById('camera-container');
const takePictureBtn = document.getElementById('take-picture-btn');

// Set up the WebRTC camera
navigator.mediaDevices.getUserMedia({ video: true })
 .then(stream => {
    // Create a video element and add it to the camera container
    const video = document.createElement('video');
    video.srcObject = stream;
    cameraContainer.appendChild(video);

    // Add an event listener to the take picture button
    takePictureBtn.addEventListener('click', () => {
      // Take a snapshot of the video and get the image data
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL();

      // Send the image data to Telegram using the Telegram Bot API
      sendImageToTelegram(imageData);
    });
  })
 .catch(error => console.error('Error getting user media:', error));

// Function to send the image data to Telegram
function sendImageToTelegram(imageData) {
  const telegramBotToken = 'YOUR_TELEGRAM_BOT_TOKEN';
  const telegramChannelId = 'YOUR_TELEGRAM_CHANNEL_ID';

  // Set up the Telegram Bot API request
  const formData = new FormData();
  formData.append('chat_id', telegramChannelId);
  formData.append('photo', imageData);

  fetch(`https://api.telegram.org/bot${telegramBotToken}/sendPhoto`, {
    method: 'POST',
    body: formData,
  })
   .then(response => response.json())
   .then(data => console.log('Image sent to Telegram:', data))
   .catch(error => console.error('Error sending image to Telegram:', error));
}