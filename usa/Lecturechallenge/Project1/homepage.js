// Redirect to next page when title is clicked
function goToNextPage() {
    window.location.href = "page1.html"; // Change this to your target page
}

// Event listener for title hover to trigger star effect
document.querySelector(".title").addEventListener("mouseenter", function() {
    createBurstOfStars(50); // Generate 50 stars across the screen
});

function createBurstOfStars(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createStar(
                Math.random() * window.innerWidth,  // Random X position
                Math.random() * window.innerHeight // Random Y position
            );
        }, i * 20); // Slight delay for a smooth effect
    }
}

function createStar(x, y) {
    let star = document.createElement("div");
    star.classList.add("star");
    document.body.appendChild(star);

    // Position the star randomly
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Remove star after animation ends
    setTimeout(() => {
        star.remove();
    }, 2000);
}
