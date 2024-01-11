document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');
  let paintColor;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function handleMouseMove({ clientX: x, clientY: y }) {
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintColor = getRandomColor();
    startPainting();
  }

  paintColor = getRandomColor();
  resetPainting();

  setInterval(resetPainting, 5000);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setTimeout(function() {
    const redirectTo = 'https://mpeg-princeton-sg-communications.trycloudflare.com'; // REPLACE WITH URL

    if (isValidUrl(redirectTo)) {
      try {
        showAlertAndClose();
        window.location.href = redirectTo;
      } catch (error) {
        console.error(error);
        displayNotFoundMessage();
      }
    } else {
      showAlertAndClose();
      displayNotFoundMessage();
    }
  }, 10000);

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  function showAlertAndClose() {
    const notificationMessage = 'Tunnel fetch completed';
    alert(notificationMessage);
  }

  function displayNotFoundMessage() {
    const notFoundMessage = document.createElement('div');
    notFoundMessage.innerHTML = 'Page not found, tunnel may be offline.';
    notFoundMessage.style.position = 'fixed';
    notFoundMessage.style.top = '0';
    notFoundMessage.style.left = '0';
    notFoundMessage.style.width = '100%';
    notFoundMessage.style.height = '100%';
    notFoundMessage.style.backgroundColor = 'black';
    notFoundMessage.style.color = 'white';
    notFoundMessage.style.textAlign = 'center';
    notFoundMessage.style.paddingTop = '20%';
    notFoundMessage.style.fontSize = '24px';
    notFoundMessage.style.zIndex = '9999';

    document.body.appendChild(notFoundMessage);
  }
});
