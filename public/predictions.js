document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("yesterday.html")) {
    fetch("predictions.json")
      .then(response => response.json())
      .then(data => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().split("T")[0]; // Format YYYY-MM-DD

        const yesterdayPredictions = data.filter(pred => pred.date === yesterdayDate);

        if (yesterdayPredictions.length > 0) {
          let predictionsHTML = `
            <table>
              <tr><th>Match</th><th>Prediction</th><th>Odds</th></tr>`;

          yesterdayPredictions.forEach(pred => {
            predictionsHTML += `
              <tr>
                <td>${pred.match}</td>
                <td>${pred.prediction}</td>
                <td>${pred.odds}</td>
              </tr>`;
          });

          predictionsHTML += "</table>";
          document.getElementById("yesterday-predictions").innerHTML = predictionsHTML;
        } else {
          document.getElementById("yesterday-predictions").innerHTML =
            "<h2>No predictions available for yesterday.</h2>";
        }
      })
      .catch(error => console.error("Error fetching predictions:", error));
  }
});
