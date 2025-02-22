const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Predictions provided earlier without time conversion
const predictions = [
  { match: "Arsenal Vs. West Ham", time: "22/02, 18:00", prediction: "Arsenal", odds: "1.33" },
  { match: "Aston Villa Vs Chelsea", time: "22/02, 20:30", prediction: "Over 1.5 Goals", odds: "1.17" },
  { match: "Bournemouth Vs Wolves", time: "22/02, 18:00", prediction: "Bournemouth (Draw No Bet)", odds: "1.25" },
  { match: "Las Palmas Vs. Barcelona", time: "22/02, 23:00", prediction: "Barcelona", odds: "1.26" },
  { match: "Huddersfield Vs Peterborough", time: "22/02, 18:00", prediction: "Both Teams to Score (Yes)", odds: "1.68" },
  { match: "Ross County Fc Vs Dundee Fc", time: "22/02, 18:00", prediction: "Both Teams to Score (Yes)", odds: "1.70" },
  { match: "Wydad Ac Vs. Meknes", time: "22/02, 18:00", prediction: "Wydad AC", odds: "1.29" },
  { match: "Barry Town United Fc Vs Connah's Quay Nomads Fc", time: "22/02, 17:30", prediction: "Over 1.5 Goals", odds: "1.21" },
  { match: "Borussia Dortmund Vs Union Berlin", time: "22/02, 20:30", prediction: "Both Teams to Score (Yes)", odds: "1.69" },
  { match: "Venezia Fc Vs Lazio Rome", time: "22/02, 17:00", prediction: "Over 1.5 Goals", odds: "1.25" },
  { match: "Torino Fc Vs Ac Milan", time: "22/02, 20:00", prediction: "Over 1.5 Goals", odds: "1.39" },
  { match: "Inter Milano Vs Genoa Cfc", time: "22/02, 22:45", prediction: "Inter Milano & Over 1.5 Goals", odds: "1.54" },
  { match: "Holstein Kiel Vs. Leverkusen", time: "22/02, 17:30", prediction: "Leverkusen", odds: "1.29" },
  { match: "Ipswich Vs Tottenham", time: "22/02, 18:00", prediction: "Tottenham & Over 1.5 Goals", odds: "2.11" },
  { match: "Valencia Vs Atletico Madrid", time: "22/02, 20:30", prediction: "Under 3.5 Goals", odds: "1.24" },
  { match: "Deportivo Alaves Vs Espanyol", time: "22/02, 16:00", prediction: "Draw or Espanyol", odds: "2.01" },
  { match: "Fulham Vs Crystal Palace", time: "22/02, 18:00", prediction: "Draw", odds: "3.45" },
  { match: "Everton Vs. Manchester United", time: "22/02, 15:30", prediction: "Everton", odds: "2.60" },
  { match: "Southampton Vs Brighton", time: "22/02, 18:00", prediction: "Over 2.5 Goals", odds: "1.59" },
  { match: "Fsv Mainz Vs. St. Pauli", time: "22/02, 17:30", prediction: "FSV Mainz", odds: "1.84" },
  { match: "Derby Vs. Millwall", time: "22/02, 15:30", prediction: "Draw", odds: "2.90" }
];

app.get('/api/predictions', (req, res) => {
  res.json(predictions);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
