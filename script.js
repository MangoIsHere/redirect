document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');
  let paintInterval;
  let paintColor;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function handleMouseMove(event) {
    const { clientX: x, clientY: y } = event;
    const paintSize = 20;
    ctx.fillStyle = paintColor;
    ctx.beginPath();
    ctx.arc(x, y, paintSize, 0, 2 * Math.PI);
    ctx.fill();
  }

  function startPainting() {
    document.addEventListener('mousemove', handleMouseMove);
  }

  function resetPainting() {
    clearInterval(paintInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintColor = getRandomColor();
    startPainting();
  }

  paintColor = getRandomColor();
  resetPainting();

  document.addEventListener('click', resetPainting);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setTimeout(function() {
    var redirectTo = 'https://saint-consecutive-adjustable-converted.trycloudflare.com'; // REPLACE WITH URL
    var notificationMessage = 'Tunnel offline, come back later.';

    if (isValidUrl(redirectTo)) {
      try {
        window.location.href = redirectTo;
      } catch (error) {
        console.error(error);
        showAlertAndClose(notificationMessage);
      }
    } else {
      showAlertAndClose(notificationMessage);
    }
  }, 5000);

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  function showAlertAndClose(message) {
    alert(message);
    window.close();
  }
});
