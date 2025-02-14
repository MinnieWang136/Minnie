document.getElementById("title").addEventListener("click", function(event) {
    const lightspot = document.getElementById("lightspot");
    const title = document.getElementById("title");

    // Get title position
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Position the lightspot at the title location
    lightspot.style.left = `${x}px`;
    lightspot.style.top = `${y}px`;

    // Activate the glowing effect
    lightspot.style.opacity = "1";
    lightspot.style.transform = "scale(15)";

    // Wait 0.5s before fading out the title (prevents instant disappearance)
    setTimeout(() => {
        title.style.opacity = "0"; // Gradual fade-out
    }, 500);

    // Redirect to another page after animation
    setTimeout(() => {
        window.location.href = "page1.html"; // Change to your destination page
    }, 1500);
});
