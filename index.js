const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Convert EAT (UTC+3) to UTC
const convertToUTC = (time) => {
    const [date, eatTime] = time.split(', ');
    const [hours, minutes] = eatTime.split(':').map(Number);
    let utcHours = hours - 3;
    if (utcHours < 0) utcHours += 24;
    return `${date}, ${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} UTC`;
};

// Predictions Data
const predictions = [
    { id: 1, match: "Valencia Vs. Atletico Madrid", time: convertToUTC("22/02, 20:30"), prediction: "Under 3.5", odds: "1.24", team1: { name: "Valencia", analysis: "Defensively solid at home.", injuries: "No key injuries.", form: "WDLWD" }, team2: { name: "Atletico Madrid", analysis: "Compact defense, few goals conceded.", injuries: "Star forward out.", form: "WDWWL" } },
    { id: 2, match: "Deportivo Alaves Vs Espanyol", time: convertToUTC("22/02, 16:00"), prediction: "Draw or Espanyol", odds: "2.01", team1: { name: "Deportivo Alaves", analysis: "Struggles against strong defenses.", injuries: "Midfield anchor out.", form: "LLDWW" }, team2: { name: "Espanyol", analysis: "Better away form.", injuries: "No major absences.", form: "DWWDL" } },
    { id: 3, match: "Fulham Vs. Crystal Palace", time: convertToUTC("22/02, 18:00"), prediction: "Draw", odds: "3.45", team1: { name: "Fulham", analysis: "Strong at home but inconsistent attack.", injuries: "Key striker doubtful.", form: "WDLWL" }, team2: { name: "Crystal Palace", analysis: "Defensive-minded team.", injuries: "Main playmaker out.", form: "DDLWW" } },
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/predictions', (req, res) => {
    res.json(predictions.map(({ id, match, time, prediction, odds }) => ({ id, match, time, prediction, odds })));
});

app.get('/api/match/:id', (req, res) => {
    const matchDetails = predictions.find(p => p.id === parseInt(req.params.id));
    if (matchDetails) {
        res.json(matchDetails);
    } else {
        res.status(404).json({ error: "Match not found" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
