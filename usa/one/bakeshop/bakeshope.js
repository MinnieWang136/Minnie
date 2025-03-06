let selectedIngredients = [];

        const dessertCombinations = {
            "Flour+Butter": { name: "Shortbread Cookies", img: "shortbread.png" },
            "Milk+Chocolate": { name: "Hot Chocolate", img: "hotchoco.png" },
            "Banana+Flour": { name: "Banana bread", img: "bananabread.png" },
            "Flour+Milk": { name: "Pancakes", img: "pancake.png" },
            "Butter+Chocolate": { name: "Chocolate Ganache", img: "ganache.png" },
            "Banana+Chocolate": { name: "Chocobanana", img: "chocobanana.png" },
            "Flour+Sugar": { name: "Donut", img: "donut.png" },
            "Milk+Sugar": { name: "Toffee", img: "toffee.png" },
        
        };
       
        function selectIngredient(ingredient, element) {
            element.classList.toggle('selected');

            if (selectedIngredients.includes(ingredient)) {
                selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
            } else {
                selectedIngredients.push(ingredient);
            }

            if (selectedIngredients.length === 2) {
                let key1 = selectedIngredients.join("+");
                let key2 = selectedIngredients.reverse().join("+");

                if (dessertCombinations[key1] || dessertCombinations[key2]) {
                    let dessert = dessertCombinations[key1] || dessertCombinations[key2];

                    document.getElementById("dessert-image").src = dessert.img;
                    document.getElementById("dessert-image").style.display = "block";
                    document.getElementById("dessert-name").innerText = dessert.name;
                } else {
                   
                    document.getElementById("dessert-image").src = "soldout.png";
                    document.getElementById("dessert-image").style.display = "block";
                    document.getElementById("dessert-name").innerText = "";
                }

                setTimeout(() => {
                    selectedIngredients = [];
                    document.querySelectorAll('.ingredient').forEach(img => img.classList.remove('selected'));
                }, 1500);
            }
        }