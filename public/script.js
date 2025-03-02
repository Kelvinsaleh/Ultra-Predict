document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('hidden');
});

// Function to load predictions (All, Value Bet, or Today)
async function loadPredictions(type) {
    try {
        const response = await fetch('predictions.json');
        const data = await response.json();
        console.log("Fetched Predictions:", data); // Debugging line
        
        let filteredData = data;
        if (type !== 'all') {
            filteredData = data.filter(item => item.type.toLowerCase().includes(type.toLowerCase()));
        }

        updateTable(filteredData);
    } catch (error) {
        console.error("Error loading predictions:", error);
    }
}

// Function to update the table with data
function updateTable(data) {
    const tableBody = document.querySelector("#predictions-table tbody");
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No predictions available</td></tr>";
        return;
    }

    data.forEach(prediction => {
        const row = `<tr>
                        <td>${prediction.date}</td>
                        <td>${prediction.type}</td>
                        <td>${prediction.match}</td>
                        <td>${prediction.odds}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    });
}

// Load all predictions by default
loadPredictions('all');
