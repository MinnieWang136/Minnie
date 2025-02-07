document.addEventListener("DOMContentLoaded", () => {
    const snowContainer = document.querySelector(".snow-container");

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");

        const snowTypes = ["Its tender pulse", "whispered lore", "Promising warmth once more"]; //Three unicode
        snowflake.innerHTML = snowTypes[Math.floor(Math.random() * snowTypes.length)]; // Unicode for a snowflake

        // Random position and size
        const size = Math.random() * 10 + 10; // Between 10px and 20px
        snowflake.style.left = Math.random() * window.innerWidth + "px";
        snowflake.style.fontSize = `${size}px`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 5}s`; // Fall speed between 2s and 5s
        snowflake.style.opacity = Math.random(); // Random opacity

        // Add event listener for click (light effect)
 snowflake.addEventListener("mouseover", (event) => {
    createLightEffect(event.clientX, event.clientY);
    snowflake.remove(); // Remove snowflake on click
}); 
       // Remove snowflake after it falls
       setTimeout(() => {
        snowflake.remove();
    }, 5000);

         snowContainer.appendChild(snowflake);
    }

   
 
  
 // Generate snowflakes continuously
    setInterval(createSnowflake, 100);
});

 // Function to create a light effect at clicked position
 function createLightEffect(x, y) {
    const light = document.createElement("div");
    light.classList.add("light");
    light.style.left = `${x}px`;
    light.style.top = `${y}px`;

    document.body.appendChild(light);

// Remove light effect after animation
    setTimeout(() => {
        light.remove();
    }, 1000);
    
}
