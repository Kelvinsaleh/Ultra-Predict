const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Sample prediction data
const predictions = [
    { match: "Real Madrid vs Manchester City", prediction: "1X" },
    { match: "Aston Villa  vs  Liverpool  ", prediction: "2" },
    { match: "PSG  vs  Stade Brest", prediction: "1" }
];

// Sample fantasy league data
const fantasyLeague = [
    { player: "Erling Haaland", team: "Man City", points: 12 },
    { player: "Mohamed Salah", team: "Liverpool", points: 10 },
    { player: "Bukayo  Saka", team: "Arsenal", points: 9 }
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
