document.addEventListener("DOMContentLoaded", () => {
    // Fetch Football Predictions
    fetch("/api/predictions")
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("predictionsTable");
            data.forEach(match => {
                let row = table.insertRow();
                row.insertCell(0).textContent = match.match;
                row.insertCell(1).textContent = match.prediction;
            });
        })
        .catch(error => console.error("Error fetching predictions:", error));

    // Fetch Fantasy League Predictions
    fetch("/api/fantasy-league")
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("fantasyLeagueTable");
            data.forEach(player => {
                let row = table.insertRow();
                row.insertCell(0).textContent = player.player;
                row.insertCell(1).textContent = player.team;
                row.insertCell(2).textContent = player.points;
            });
        })
        .catch(error => console.error("Error fetching fantasy league data:", error));
});
