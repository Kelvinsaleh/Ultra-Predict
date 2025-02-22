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
    { id: 1, match: "Arsenal Vs. West Ham", time: convertToUTC("22/02, 18:00"), prediction: "Arsenal", odds: "1.33" },
    { id: 2, match: "Aston Villa Vs Chelsea", time: convertToUTC("22/02, 20:30"), prediction: "Over 1.5", odds: "1.17" },
    { id: 3, match: "Bournemouth Vs Wolves", time: convertToUTC("22/02, 18:00"), prediction: "Bournemouth (Draw No Bet)", odds: "1.25" },
    { id: 4, match: "Las Palmas Vs. Barcelona", time: convertToUTC("22/02, 23:00"), prediction: "Barcelona", odds: "1.26" },
    { id: 5, match: "Huddersfield Vs Peterborough", time: convertToUTC("22/02, 18:00"), prediction: "Both Teams to Score (Yes)", odds: "1.68" },
    { id: 6, match: "Ross County Fc Vs Dundee Fc", time: convertToUTC("22/02, 18:00"), prediction: "Both Teams to Score (Yes)", odds: "1.70" },
    { id: 7, match: "Wydad Ac Vs. Meknes", time: convertToUTC("22/02, 18:00"), prediction: "Wydad AC", odds: "1.29" },
    { id: 8, match: "Barry Town United Fc Vs Connah's Quay Nomads Fc", time: convertToUTC("22/02, 17:30"), prediction: "Over 1.5", odds: "1.21" },
    { id: 9, match: "Borussia Dortmund Vs Union Berlin", time: convertToUTC("22/02, 20:30"), prediction: "Both Teams to Score (Yes)", odds: "1.69" },
    { id: 10, match: "Venezia Fc Vs Lazio Rome", time: convertToUTC("22/02, 17:00"), prediction: "Over 1.5", odds: "1.25" },
    { id: 11, match: "Torino Fc Vs Ac Milan", time: convertToUTC("22/02, 20:00"), prediction: "Over 1.5", odds: "1.39" },
    { id: 12, match: "Inter Milano Vs Genoa Cfc", time: convertToUTC("22/02, 22:45"), prediction: "Inter Milano & Over 1.5", odds: "1.54" },
    { id: 13, match: "Holstein Kiel Vs. Leverkusen", time: convertToUTC("22/02, 17:30"), prediction: "Leverkusen", odds: "1.29" },
    { id: 14, match: "Ipswich Vs Tottenham", time: convertToUTC("22/02, 18:00"), prediction: "Tottenham & Over 1.5", odds: "2.11" },
    { id: 15, match: "Valencia Vs Atletico Madrid", time: convertToUTC("22/02, 20:30"), prediction: "Under 3.5", odds: "1.24" },
    { id: 16, match: "Deportivo Alaves Vs Espanyol", time: convertToUTC("22/02, 16:00"), prediction: "Draw or Espanyol", odds: "2.01" },
    { id: 17, match: "Fulham Vs Crystal Palace", time: convertToUTC("22/02, 18:00"), prediction: "Draw", odds: "3.45" },
    { id: 18, match: "Everton Vs. Manchester United", time: convertToUTC("22/02, 15:30"), prediction: "Everton", odds: "2.60" },
    { id: 19, match: "Southampton Vs Brighton", time: convertToUTC("22/02, 18:00"), prediction: "Over 2.5", odds: "1.59" },
    { id: 20, match: "Fsv Mainz Vs. St. Pauli", time: convertToUTC("22/02, 17:30"), prediction: "FSV Mainz", odds: "1.84" },
    { id: 21, match: "Derby Vs. Millwall", time: convertToUTC("22/02, 15:30"), prediction: "Draw", odds: "2.90" }
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
