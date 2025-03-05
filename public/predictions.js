document.addEventListener("DOMContentLoaded", () => {
    fetch("predictions.json")
        .then(response => response.json())
        .then(predictions => {
            const tableBody = document.getElementById("predictions-table");

            predictions.forEach(prediction => {
                const row = `
                    <tr>
                        <td>${prediction.match}</td>
                        <td><strong>${prediction.prediction}</strong></td>
                        <td>${prediction.odds}</td>
                        <td>${prediction.date}</td>
                        <td>${prediction.time}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Failed to fetch predictions:", error));
});
