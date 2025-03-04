document.addEventListener("DOMContentLoaded", function () {
    fetch("correct-score.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("correct-score-list");
            tableBody.innerHTML = ""; // Clear old data

            data.forEach(match => {
                let row = `
                    <tr>
                        <td>${match.match}</td>
                        <td>${match.prediction}</td>
                        <td>${match.odds}</td>
                        <td>${match.date}</td>
                        <td>${match.time}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error loading correct score predictions:", error));
});
