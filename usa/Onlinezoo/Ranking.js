// Zoo data
const zoos = [
    {
      name: "The Bronx Zoo",
      labels: "Large Open Spaces • Exotic Animals • Family Friendly",
      page: "Entry 6 The Bronx Intro.html",
    },
    {
      name: "Central Park Zoo",
      labels: "Tropical Themes • Rare Birds • Conservation Efforts",
      page: "Entry 2 Central Park Intro.html",
    },
    {
      name: "Prospect Park Zoo",
      labels: "Aquatic Animals • Interactive Displays • Educational Tours",
      page: "Entry 8 Prospect Park Intro.html",
    },
    {
      name: "Yunnan Wildlife Zoo",
      labels: "Mountain Wildlife • Stunning Views • Hiking Trails",
      page: "Entry 4 Yunnan Zoo Intro.html",
    },
  ];
  
  // Function to dynamically create zoo cards
  function createZooCards() {
    const zooContainer = document.getElementById("zoo-container");
    
    zoos.forEach((zoo) => {
      // Create card container
      const card = document.createElement("div");
      card.classList.add("zoo-card");
      
      // Add zoo name
      const name = document.createElement("div");
      name.classList.add("zoo-name");
      name.textContent = zoo.name;
      card.appendChild(name);
      
      // Add zoo labels
      const labels = document.createElement("div");
      labels.classList.add("zoo-labels");
      labels.textContent = zoo.labels;
      card.appendChild(labels);
      
      // Add button
      const button = document.createElement("a");
      button.classList.add("zoo-button");
      button.href = zoo.page;
      button.textContent = "Learn More";
      card.appendChild(button);
      
      // Append card to container
      zooContainer.appendChild(card);
    });
  }
  
  // Call function to create zoo cards on page load
  createZooCards();
  