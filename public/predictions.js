document.addEventListener("DOMContentLoaded", () => {
    fetch("predictions.json")
        .then(response => response.json())
        .then(data => {
            const predictionsTable = document.getElementById("predictions");
            const correctScoreTable = document.getElementById("correct-score");
            const betOfTheDayTable = document.getElementById("bet-of-the-day");

            data.forEach((prediction, index) => {
                const row = `
                    <tr>
                        <td>${prediction.match}</td>
                        <td><strong>${prediction.prediction}</strong></td>
                        <td>${prediction.odds}</td>
                        <td>${prediction.date}</td>
                        <td>${prediction.time}</td>
                    </tr>
                `;

                if (predictionsTable) predictionsTable.innerHTML += row;
                if (correctScoreTable && prediction.prediction.includes(":")) correctScoreTable.innerHTML += row;
                if (betOfTheDayTable && index === 0) betOfTheDayTable.innerHTML += row;
            });
        })
        .catch(err => console.error("Error fetching predictions:", err));
});