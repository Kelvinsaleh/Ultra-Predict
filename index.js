const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Sample prediction data
const predictions = [
    { match: "Plzen vs Ferencvarosi", prediction: "BTTS" },
    { match: "Shamrock Rovers vs Molde", prediction: "BTTS" },
    { match: "Real Sociedad  vs Fc Midtjylland", prediction: "1" }
    { match: "Real betis vs Gent", prediction: "1DNB" }
    { match: "Palmeiras vs Botafogo Sp", prediction: "Under 2.5" }
    { match: "Ajax  vs Union Saint Gilloise", prediction: "1" }
    { match: "Roma vs FC Porto", prediction: "1X" }
    { match: "Bodo/Glimt vs FC Twente", prediction: "Over 2.5" }
    { match: "Panathinaikos  vs Vikingur Reykjavik", prediction: " 1" }
    { match: "Al Fateh  vs Al Orubah", prediction: "BTTS" }
];

// Sample fantasy league data
const fantasyLeague = [
    { player: "", team: "", points:0  },
    { player: "", team: ", points: 0 },
    { player: "", team: "", points: 0 }
];

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// API endpoints
app.get("/api/predictions", (req, res) => {
    res.json(predictions);
});

app.get("/api/fantasy-league", (req, res) => {
    res.json(fantasyLeague);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
