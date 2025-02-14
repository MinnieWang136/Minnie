document.addEventListener("DOMContentLoaded", () => {
    const lines = document.querySelectorAll(".line");
    let hoveredCount = 0;
    
    function transformToLightSpot(event) {
        const line = event.target;
        if (!line.classList.contains("light-spot")) {
            line.classList.add("glowing"); // Step 1: Pop out and glow
            
            setTimeout(() => {
                line.classList.remove("glowing"); // Remove glow effect
                line.classList.add("light-spot"); // Step 2: Fade into light spot
                hoveredCount++;
                
                // If all sentences are hovered over, show the central light spot
                if (hoveredCount === lines.length) {
                    showCentralLightSpot();
                }
            }, 1000); // 1-second delay before turning into a light spot
        }
    }

    function showCentralLightSpot() {
        const centralSpot = document.createElement("div");
        centralSpot.classList.add("central-light-spot2");
        centralSpot.addEventListener("click", () => {
            window.location.href = "page4.html"; // Redirect to the next page
        });
        document.body.appendChild(centralSpot);
    }

    lines.forEach(line => {
        line.addEventListener("mouseenter", transformToLightSpot);
    });
});
