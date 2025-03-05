document.addEventListener("DOMContentLoaded", () => {
    fetch("predictions.json")
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("predictions");

            data.forEach(prediction => {
                const row = `
                    <tr>
                        <td>${prediction.match}</td>
                        <td><strong>${prediction.prediction}</strong></td>
                        <td>${prediction.odds}</td>
                        <td>${prediction.date}</td>
                        <td>${prediction.time}</td>
                    </tr>
                `;
                table.innerHTML += row;
            });
        })
        .catch(err => console.error("Error fetching predictions:", err));
});