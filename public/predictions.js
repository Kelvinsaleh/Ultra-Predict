// Fetch predictions from predictions.json and display them
fetch("predictions.json")
  .then(response => response.json())
  .then(predictions => {
    let predictionsTable = document.getElementById("predictions-table");

    predictions.forEach(match => {
      let row = predictionsTable.insertRow();
      row.insertCell(0).innerText = match.match_date;
      row.insertCell(1).innerText = match.home_team;
      row.insertCell(2).innerText = match.away_team;
      row.insertCell(3).innerText = match.prediction;
      row.insertCell(4).innerText = match.confidence + "%";
    });
  })
  .catch(error => console.error("Error loading predictions:", error));
