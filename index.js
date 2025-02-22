<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UltraPredict - Football Predictions</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: #4CAF50;
      padding: 10px 20px;
      text-align: center;
    }

    header nav ul {
      list-style-type: none;
      padding: 0;
    }

    header nav ul li {
      display: inline;
      margin-right: 20px;
    }

    header nav ul li a {
      color: white;
      text-decoration: none;
      font-size: 18px;
    }

    main {
      padding: 20px;
    }

    section {
      margin-bottom: 20px;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #4CAF50;
      font-size: 24px;
      margin-bottom: 15px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      padding: 12px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #4CAF50;
      color: white;
    }

    td {
      background-color: #f9f9f9;
    }

    footer {
      background-color: #4CAF50;
      color: white;
      text-align: center;
      padding: 10px;
      position: fixed;
      width: 100%;
      bottom: 0;
    }

    @media screen and (max-width: 600px) {
      header nav ul li {
        display: block;
        margin-right: 0;
        margin-bottom: 10px;
      }

      table th, table td {
        padding: 8px;
      }

      footer {
        position: static;
      }
    }
  </style>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#football-predictions-today">Football Predictions Today</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="football-predictions-today">
      <h2>Football Predictions Today</h2>
      <table id="football-predictions-today-table">
        <thead>
          <tr>
            <th>Match</th>
            <th>Time (EAT)</th>
            <th>Prediction</th>
            <th>Odds</th>
          </tr>
        </thead>
        <tbody>
          <!-- Dynamic content will go here -->
        </tbody>
      </table>
    </section>
  </main>

  <footer>
    <p>© 2025 UltraPredict - All Rights Reserved</p>
  </footer>

  <script>
    // Fetch Football Predictions Today from the API
    fetch('/api/predictions')
      .then(response => response.json())
      .then(data => {
        const footballPredictionsTodayTable = document.getElementById('football-predictions-today-table').getElementsByTagName('tbody')[0];
        data.forEach(prediction => {
          const row = footballPredictionsTodayTable.insertRow();
          row.innerHTML = `<td>${prediction.match}</td><td>${prediction.time}</td><td>${prediction.prediction}</td><td>${prediction.odds}</td>`;
        });
      })
      .catch(err => console.error('Error fetching predictions:', err));
  </script>
</body>
</html>
