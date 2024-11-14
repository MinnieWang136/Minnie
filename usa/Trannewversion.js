// script.js
function showDirection(direction) {
    const directionInfo = document.getElementById("direction-info");
    if (direction === 'uptown') {
        directionInfo.textContent = "Heading to Uptown & Queens: N, R, W, and 5 trains available.";
    } else if (direction === 'downtown') {
        directionInfo.textContent = "Heading to Downtown & Brooklyn: Q trains available.";
    }
}
