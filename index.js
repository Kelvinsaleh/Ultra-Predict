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

// Predictions Data (All Matches)
const predictions = [
    { id: 1, match: "Valencia Vs. Atletico Madrid", time: convertToUTC("22/02, 20:30"), prediction: "Under 3.5", odds: "1.24", team1: { name: "Valencia", analysis: "Defensively solid at home.", injuries: "No key injuries.", form: "WDLWD" }, team2: { name: "Atletico Madrid", analysis: "Compact defense, few goals conceded.", injuries: "Star forward out.", form: "WDWWL" } },
    { id: 2, match: "Deportivo Alaves Vs Espanyol", time: convertToUTC("22/02, 16:00"), prediction: "Draw or Espanyol", odds: "2.01", team1: { name: "Deportivo Alaves", analysis: "Struggles against strong defenses.", injuries: "Midfield anchor out.", form: "LLDWW" }, team2: { name: "Espanyol", analysis: "Better away form.", injuries: "No major absences.", form: "DWWDL" } },
    { id: 3, match: "Fulham Vs. Crystal Palace", time: convertToUTC("22/02, 18:00"), prediction: "Draw", odds: "3.45", team1: { name: "Fulham", analysis: "Strong at home but inconsistent attack.", injuries: "Key striker doubtful.", form: "WDLWL" }, team2: { name: "Crystal Palace", analysis: "Defensive-minded team.", injuries: "Main playmaker out.", form: "DDLWW" } },
    { id: 4, match: "Everton Vs. Manchester United", time: convertToUTC("22/02, 15:30"), prediction: "Everton", odds: "3.45", team1: { name: "Everton", analysis: "Unbeaten in last 5 home games.", injuries: "No key injuries.", form: "WWLDW" }, team2: { name: "Manchester United", analysis: "Struggles away.", injuries: "Casemiro, Rashford doubtful.", form: "WLDWL" } },
    { id: 5, match: "Southampton Vs Brighton", time: convertToUTC("22/02, 18:00"), prediction: "Over 2.5 Goals", odds: "1.59", team1: { name: "Southampton", analysis: "High-scoring but leaky defense.", injuries: "Main striker injured.", form: "WLWDW" }, team2: { name: "Brighton", analysis: "Attack-focused.", injuries: "Missing key midfielder.", form: "DWLLW" } },
    { id: 6, match: "Fsv Mainz Vs. St. Pauli", time: convertToUTC("22/02, 17:30"), prediction: "FSV Mainz", odds: "1.84", team1: { name: "FSV Mainz", analysis: "Defensive strength.", injuries: "No major injuries.", form: "DWWLW" }, team2: { name: "St. Pauli", analysis: "Decent attack but poor away.", injuries: "Star striker out.", form: "LWDWD" } },
    { id: 7, match: "Derby Vs. Millwall", time: convertToUTC("22/02, 15:30"), prediction: "Draw", odds: "2.90", team1: { name: "Derby", analysis: "Home strength but lacks finishing.", injuries: "Key midfielder suspended.", form: "WDLWD" }, team2: { name: "Millwall", analysis: "Compact defense.", injuries: "No major absences.", form: "DLWWD" } }
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
