const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Updated prediction data
const predictions = [
    { match: "Arsenal Vs. West Ham", prediction: "1X2 - Arsenal", odds: 1.33, time: "22/02, 18:00" },
    { match: "Aston Villa Vs Chelsea", prediction: "TOTAL - Over 1.5", odds: 1.17, time: "22/02, 20:30" },
    { match: "Bournemouth Vs Wolves", prediction: "WHO WILL WIN? (IF DRAW, MONEY BACK) - Bournemouth", odds: 1.25, time: "22/02, 18:00" },
    { match: "Las Palmas Vs. Barcelona", prediction: "1X2 - Barcelona", odds: 1.26, time: "22/02, 23:00" },
    { match: "Huddersfield Vs Peterborough", prediction: "BTTS - Yes", odds: 1.68, time: "22/02, 18:00" },
    { match: "Ross County Fc Vs Dundee Fc", prediction: "BTTS - Yes", odds: 1.70, time: "22/02, 18:00" },
    { match: "Wydad Ac Vs. Meknes", prediction: "1X2 - Wydad AC", odds: 1.29, time: "22/02, 18:00" },
    { match: "Barry Town United Fc Vs Connah's Quay Nomads Fc", prediction: "TOTAL - Over 1.5", odds: 1.21, time: "22/02, 17:30" },
    { match: "Borussia Dortmund Vs Union Berlin", prediction: "BTTS - Yes", odds: 1.69, time: "22/02, 20:30" },
    { match: "Venezia Fc Vs Lazio Rome", prediction: "TOTAL - Over 1.5", odds: 1.25, time: "22/02, 17:00" },
    { match: "Torino Fc Vs Ac Milan", prediction: "TOTAL - Over 1.5", odds: 1.39, time: "22/02, 20:00" },
    { match: "Inter Milano Vs Genoa Cfc", prediction: "1X2 & TOTAL - Inter Milano & Over 1.5", odds: 1.54, time: "22/02, 22:45" },
    { match: "Holstein Kiel Vs. Leverkusen", prediction: "1X2 - Leverkusen", odds: 1.29, time: "22/02, 17:30" },
    { match: "Ipswich Vs Tottenham", prediction: "1X2 & TOTAL - Tottenham & Over 1.5", odds: 2.11, time: "22/02, 18:00" },
    { match: "Valencia Vs Atletico Madrid", prediction: "TOTAL - Under 3.5", odds: 1.24, time: "22/02, 20:30" },
    { match: "Deportivo Alaves Vs Espanyol", prediction: "DOUBLE CHANCE - Draw or Espanyol", odds: 2.01, time: "22/02, 16:00" },
    { match: "Fulham Vs Crystal Palace", prediction: "1X2 - Draw", odds: 3.45, time: "22/02, 18:00" },
    { match: "Everton Vs. Manchester United", prediction: "1X2 - Everton", odds: 2.60, time: "22/02, 15:30" },
    { match: "Southampton Vs Brighton", prediction: "TOTAL - Over 2.5", odds: 1.59, time: "22/02, 18:00" },
    { match: "Fsv Mainz Vs. St. Pauli", prediction: "1X2 - FSV Mainz", odds: 1.84, time: "22/02, 17:30" },
    { match: "Derby Vs. Millwall", prediction: "1X2 - Draw", odds: 2.90, time: "22/02, 15:30" }
];

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// API endpoint for predictions
app.get("/api/predictions", (req, res) => {
    res.json(predictions);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
