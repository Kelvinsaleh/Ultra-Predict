document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('hidden');
});

// Function to load predictions (All, Value Bet, or Today)
async function loadPredictions(type) {
    const response = await fetch('predictions.json');
    const data = await response.json();
    let filteredData = data;

    if (type !== 'all') {
        filteredData = data.filter(item => item.type === type);
    }

    updateTable(filteredData, type);
}

// Function to load fantasy league predictions
async function loadFantasy() {
    const response = await fetch('fantasy.js');
    const data = await response.json();
    updateTable(data, 'Fantasy League');
}

// Function to update the table with data
function updateTable(data, category) {
    const tableBody = document.querySelector("#predictions-table tbody");
    tableBody.innerHTML = "";

    data.forEach(prediction => {
        const row = `<tr>
                        <td>${prediction.date}</td>
                        <td>${category || prediction.type}</td>
                        <td>${prediction.match}</td>
                        <td>${prediction.odds}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    });
}

// Load all predictions by default
loadPredictions('all');
