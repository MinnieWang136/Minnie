let selectedImages = [];

function selectImage(imageId) {
    let imgElement = document.getElementById(imageId);

    // Toggle selection
    if (selectedImages.includes(imageId)) {
        selectedImages = selectedImages.filter(id => id !== imageId);
        imgElement.classList.remove("selected");
    } else {
        if (selectedImages.length < 2) {
            selectedImages.push(imageId);
            imgElement.classList.add("selected");
        }
    }

    // Check for valid combination
    if (selectedImages.length === 2) {
        displayResultImage();
    } else {
        document.getElementById("resultImage").style.display = "none"; 
        document.getElementById("resultLabel").style.display = "none"; 
        document.getElementById("resultDescription").style.display = "none"; 
    }
}

function displayResultImage() {
    const resultImage = document.getElementById("resultImage");
    const resultLabel = document.getElementById("resultLabel");
    const resultDescription = document.getElementById("resultDescription");


    const combinations = {
        "img1-img2": { 
                    src: "diandao.jpg", 
                    label: "Statikk Shiv", 
                    description: "Spark: Your first 3 attacks within 8 seconds will fire interlocking lightning when hit, dealing 60 magic damage to up to 5 targets" 
                },
        "img3-img4": { 
                    src: "fabao.jpg", 
                    label: "Jeweled Gauntlet", 
                    description: "+15% skill damage, +10% chance of critical hit, The carrier's abilities are critical and the carrier gains +50% critical damage." 
                },
        "img2-img4": { 
                    src: "yangdao.jpg", 
                    label: "Guinsoo's Rageblade", 
                    description: "Damage: 35, Spell Strength: 35, Attack Speed: 25%." 
                },
        "img2-img3": { 
                    src: "qingyu.jpg", 
                    label: "Last Whisper", 
                    description: "Damage: +20%, Armor Penetration: +18%." 
                },
        "img1-img3": { 
                    src: "zhengyi.jpg", 
                    label: "Hand of Justice", 
                    description: "The sun and moon align to create a rare celestial event known as an eclipse." 
                },
        "img1-img4": { 
                    src: "datianshi.jpg", 
                    label: "Archangel's Staff", 
                    description: "Spell Strength: 80, Skill Haste: 20, Mana: 600" 
                },


    };

    let key = selectedImages.sort().join("-");

            if (combinations[key]) {
                resultImage.src = combinations[key].src;
                resultImage.style.display = "block";
                resultLabel.textContent = combinations[key].label;
                resultLabel.style.display = "block";
                resultDescription.textContent = combinations[key].description;
                resultDescription.style.display = "block";
            } else {
                alert("No matching result for this combination.");
                resetResult();
            }
        }

        function resetResult() {
            document.getElementById("resultImage").style.display = "none"; 
            document.getElementById("resultLabel").style.display = "none"; 
            document.getElementById("resultDescription").style.display = "none"; 
        }
