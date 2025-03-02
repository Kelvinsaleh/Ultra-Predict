document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('hidden');
});

// Function to load predictions (All, Value Bet, or Today)
async function loadPredictions(type) {
    try {
        const response = await fetch('predictions.json');
        const data = await response.json();
        let filteredData = data;

        if (type !== 'all') {
            filteredData = data.filter(item => item.type.includes(type));
        }

        updateTable(filteredData);
    } catch (error) {
        console.error("Error loading predictions:", error);
    }
}

// Function to load fantasy league predictions
async function loadFantasy() {
    try {
        const response = await fetch('fantasy.js');
        const data = await response.json();
        updateTable(data);
    } catch (error) {
        console.error("Error loading fantasy predictions:", error);
    }
}

// Function to update the table with data
function updateTable(data) {
    const tableBody = document.querySelector("#predictions-table tbody");
    tableBody.innerHTML = "";  

    data.forEach(prediction => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${prediction.date}</td>
            <td>${prediction.type}</td>
            <td>${prediction.match}</td>
            <td>${prediction.odds}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Load all predictions by default
loadPredictions('all');
