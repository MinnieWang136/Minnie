// Array of images for each letter (A-Z)
const images = [
    "A.png", "B.png", "C.png", "D.png", "E.png", "F.png", "G.png", "H.png", "I.png", 
    "J.png", "K.png", "L.png", "M.png", "N.png", "O.png", "P.png", "Q.png", "R.png", 
    "S.png", "T.png", "U.png", "V.png", "W.png", "X.png", "Y.png", "Z.png"
];

function displayImage() {
    const input = document.getElementById("charInput").value.toUpperCase();
    const imgElement = document.getElementById("displayedImage");
    const gifElement = document.getElementById("gifDisplay"); // Reference to the GIF
    
    // If the input is a valid letter (A-Z), display the corresponding image
    if (/^[A-Z]$/.test(input)) {
        const index = input.charCodeAt(0) - 65; // 'A' is 65 in ASCII
        imgElement.src = images[index];
        imgElement.style.display = "block";
        gifElement.style.display = "none";  // Hide the GIF if the input is valid
    } else {
        // If invalid input is entered, hide the image and show the GIF
        imgElement.style.display = "none";  // Hide image
        gifElement.style.display = "block"; // Show GIF
        alert("Please enter a letter between A and Z.");
    }
}
