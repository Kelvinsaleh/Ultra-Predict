const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Sample prediction data
const predictions = [
    { match: "Leicester Vs Brentford", prediction: "BTTS" },
    { match: "Flint Mountain vs Mold Alexandra", prediction: "BTTS" },
    { match: "Burnley vs Sheffield Wednesday", prediction: "1" },
    { match:  "Al Nassr vs Al Ittifaq", prediction: "1" },
    { match: "Us Lecce vs Udinese Calcio", prediction: "Under 2.5" },
    { match: "Kuwait Sc vs Al Salmiyah", prediction: "2" },
    { match: "Bala Town vs The New Saints Fc", prediction: "BTTS" },
    { match: "Pharco  Fc vs Future Fc", prediction: "Over 1.5" },
    { match: "Hertha vs Nuremberg", prediction: "BTTS" },
    { match: "Stade Rennes vs Stade Reims", prediction: "Over 1.5" },
    { match: "Freiburg vs Werder Bremen", prediction: "BTTS" }
];

// Sample fantasy league data
const fantasyLeague = [
    { player: "", team: "", points: 0 },
    { player: "", team: "", points: 0 },
    { player: "", team: "", points: 0 }
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
