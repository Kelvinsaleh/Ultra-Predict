fetch('/api/vipPredictions')
    .then(response => response.json())
    .then(predictions => {
        let table = document.getElementById("vipPredictionsTable");
        predictions.forEach(pred => {
            let row = table.insertRow();
            row.insertCell(0).innerText = pred.match;
            row.insertCell(1).innerText = pred.prediction;
            row.insertCell(2).innerText = new Date(pred.date).toLocaleString();
        });
    })
    .catch(err => console.error("Error fetching VIP predictions:", err));
