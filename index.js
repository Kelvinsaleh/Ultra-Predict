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

// Predictions Data with Analysis
const predictions = [
    { 
        id: 1, 
        match: "Arsenal Vs. West Ham", 
        time: convertToUTC("22/02, 18:00"), 
        prediction: "Arsenal", 
        odds: "1.33",
        team1: { name: "Arsenal", analysis: "Strong home record, dominant attack.", injuries: "No key injuries.", form: "WWDWW" },
        team2: { name: "West Ham", analysis: "Struggles against top teams.", injuries: "Key midfielder out.", form: "LDWDL" }
    },
    { 
        id: 2, 
        match: "Aston Villa Vs Chelsea", 
        time: convertToUTC("22/02, 20:30"), 
        prediction: "Over 1.5", 
        odds: "1.17",
        team1: { name: "Aston Villa", analysis: "Attacking-minded, scores often.", injuries: "Main defender doubtful.", form: "WDWLW" },
        team2: { name: "Chelsea", analysis: "Unstable defense but dangerous counterattacks.", injuries: "Striker injured.", form: "DLWWD" }
    },
    { 
        id: 3, 
        match: "Bournemouth Vs Wolves", 
        time: convertToUTC("22/02, 18:00"), 
        prediction: "Bournemouth (Draw No Bet)", 
        odds: "1.25",
        team1: { name: "Bournemouth", analysis: "Solid midfield control.", injuries: "No major absences.", form: "WLWDD" },
        team2: { name: "Wolves", analysis: "Compact defense but struggles in attack.", injuries: "Main striker suspended.", form: "LDWWL" }
    }
    // Add similar data for all matches...
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/predictions', (req, res) => {
    res.json(predictions.map(({ id, match, time, prediction, odds }) => ({ id, match, time, prediction, odds })));
});

app.get('/api/match/:id', (req, res) => {
    const matchDetails = predictions.find(p => p.id === parseInt(req.params.id));
    if (matchDetails) {
        res.json(matchDetails); // Now includes team analysis, injuries, and form
    } else {
        res.status(404).json({ error: "Match not found" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
