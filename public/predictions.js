document.addEventListener("DOMContentLoaded", function () {
    const predictions = [
        {
            date: "02/03",  
            time: "16:30",  
            match: "Almere City FC vs. Ajax Amsterdam",
            prediction: "Ajax Amsterdam",
            odds: "1.45"
        }
        // Add more matches here in the same format
    ];

    const predictionsTable = document.getElementById("predictions-table");

    predictions.forEach(prediction => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${prediction.date}, ${prediction.time}</td>
            <td>${prediction.match}</td>
            <td>${prediction.prediction}</td>
            <td>${prediction.odds}</td>
        `;

        predictionsTable.appendChild(row);
    });
});
