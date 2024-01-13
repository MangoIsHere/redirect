document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');
  let paintColor;
  let originalColor;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let isRightClick = false;

  function handleMouseMove({ clientX: x, clientY: y }) {
    const paintSize = 15;
    ctx.fillStyle = isRightClick ? '#161923' : paintColor;
    ctx.beginPath();
    ctx.arc(x, y, paintSize, 0, 2 * Math.PI);
    ctx.fill();
  }

  function startPainting() {
    document.addEventListener('mousemove', handleMouseMove);
  }

  function resetPainting() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handleRightClick(event) {
    event.preventDefault();
    isRightClick = !isRightClick;
    if (isRightClick) {
      paintColor = '#161923';
    } else {
      paintColor = originalColor;
    }
  }

  function handleMiddleClick(event) {
    event.preventDefault();
    resetPainting();
    paintColor = originalColor;
  }

  paintColor = getRandomColor();
  originalColor = paintColor;
  startPainting();

  canvas.addEventListener('click', function() {
    const redirectTo = 'OFFLINE'; // REPLACE WITH URL

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
  });

  canvas.addEventListener('contextmenu', handleRightClick);
  canvas.addEventListener('auxclick', function(event) {
    if (event.button === 1) {
      handleMiddleClick(event);
    }
  });

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  function showAlertAndClose() {
    const notificationMessage = 'Retrieving tunnel';
    alert(notificationMessage);
  }

  function displayNotFoundMessage() {
    const notFoundMessage = document.createElement('div');
    notFoundMessage.innerHTML = 'Page not found, tunnel is offline.';
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
