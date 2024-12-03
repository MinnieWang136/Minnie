// script.js
function showDirection(direction) {
    const directionInfo = document.getElementById("direction-info");
    if (direction === 'uptown') {
        directionInfo.textContent = "Heading to Uptown & The Bronx: 5 trains availabe; Heading to Central Park: N, R, W trains are available.";
    } else if (direction === 'downtown') {
        directionInfo.textContent = "Heading to Downtown & Brooklyn, Propect Park: Q trains available.";
    }
}
