function generateTicket() {
    // Get input values
    const name = document.getElementById("name").value;
    const flightNumber = document.getElementById("flightNumber").value;
    const departure = document.getElementById("departure").value;
    const arrival = document.getElementById("arrival").value;
    const date = document.getElementById("date").value;
    const seat = document.getElementById("seat").value;

    // Display the ticket information
    const ticketContent = document.querySelector(".ticket-content");
    ticketContent.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Flight Number:</strong> ${flightNumber}</p>
        <p><strong>Departure:</strong> ${departure}</p>
        <p><strong>Arrival:</strong> ${arrival}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Seat:</strong> ${seat}</p>
        <a href="Entry 4 YUnnan Zoo Intro.html" class="takeoff-button">Take Off</a>
    `;
    document.getElementById("ticket").style.display = "block";
}

