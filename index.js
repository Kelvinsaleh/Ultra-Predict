const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Sample prediction data
const predictions = [
    { match: "Barcelona vs Real Madrid", prediction: "Over 2.5 Goals" },
    { match: "Manchester City vs Liverpool", prediction: "Both Teams to Score" },
    { match: "Bayern Munich vs Dortmund", prediction: "Bayern Win" }
];

// Sample fantasy league data
const fantasyLeague = [
    { player: "Erling Haaland", team: "Man City", points: 15 },
    { player: "Mohamed Salah", team: "Liverpool", points: 12 },
    { player: "Harry Kane", team: "Bayern", points: 14 }
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
