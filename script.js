document.addEventListener("DOMContentLoaded", function () {
  const redirectTo = "OFFLINE"; // REPLACE WITH URL

  setTimeout(function () {
    if (!overlayDisplayed && isValidUrl(redirectTo)) {
      try {
        showAlertAndClose();
        window.location.href = redirectTo;
      } catch (error) {
        console.error(error);
        displayNotFoundMessage();
      }
    } else if (!overlayDisplayed) {
      showAlertAndClose();
      displayNotFoundMessage();
    }
  }, 5000);

  let overlayDisplayed = false;

  const overlayElement = document.getElementById("overlay");
  if (overlayElement) {
    overlayElement.addEventListener("click", function () {
      this.style.display = "none";
    });
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
    const notificationMessage = "Retrieving tunnel";
    alert(notificationMessage);

    overlayDisplayed = true;
  }

  function displayNotFoundMessage() {
    const notFoundMessage = document.createElement("div");
    notFoundMessage.innerHTML = "Page not found, tunnel is offline.";
    notFoundMessage.style.position = "fixed";
    notFoundMessage.style.top = "0";
    notFoundMessage.style.left = "0";
    notFoundMessage.style.width = "100%";
    notFoundMessage.style.height = "100%";
    notFoundMessage.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    notFoundMessage.style.color = "white";
    notFoundMessage.style.textAlign = "center";
    notFoundMessage.style.paddingTop = "20%";
    notFoundMessage.style.fontSize = "24px";
    notFoundMessage.style.zIndex = "9999";

    document.body.appendChild(notFoundMessage);
  }
});
