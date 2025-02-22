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

// Predictions Data with Full Analysis
const predictions = [
    { 
        id: 1, match: "Arsenal Vs. West Ham", time: convertToUTC("22/02, 18:00"), prediction: "Arsenal", odds: "1.33",
        team1: { name: "Arsenal", analysis: "Strong home record, dominant attack.", injuries: "No key injuries.", form: "WWDWW" },
        team2: { name: "West Ham", analysis: "Struggles against top teams.", injuries: "Key midfielder out.", form: "LDWDL" },
        analysis: "Arsenal has been solid at home, winning 4 of their last 5 matches. West Ham struggles against top sides, and with a key midfielder missing, their midfield control might weaken."
    },
    { 
        id: 2, match: "Aston Villa Vs Chelsea", time: convertToUTC("22/02, 20:30"), prediction: "Over 1.5", odds: "1.17",
        team1: { name: "Aston Villa", analysis: "Attacking-minded, scores often.", injuries: "Main defender doubtful.", form: "WDWLW" },
        team2: { name: "Chelsea", analysis: "Unstable defense but dangerous counterattacks.", injuries: "Striker injured.", form: "DLWWD" },
        analysis: "Villa’s attacking play should create chances, but Chelsea’s pace on the break is dangerous. Both teams should find the net."
    },
    { 
        id: 3, match: "Bournemouth Vs Wolves", time: convertToUTC("22/02, 18:00"), prediction: "Bournemouth (Draw No Bet)", odds: "1.25",
        team1: { name: "Bournemouth", analysis: "Solid midfield control.", injuries: "No major absences.", form: "WLWDD" },
        team2: { name: "Wolves", analysis: "Compact defense but struggles in attack.", injuries: "Main striker suspended.", form: "LDWWL" },
        analysis: "Bournemouth is hard to break down at home, and with Wolves missing their main striker, Bournemouth has a good chance to take the points."
    },
    { 
        id: 4, match: "Las Palmas Vs. Barcelona", time: convertToUTC("22/02, 23:00"), prediction: "Barcelona", odds: "1.26",
        team1: { name: "Las Palmas", analysis: "Strong home defense.", injuries: "No key injuries.", form: "WLDDD" },
        team2: { name: "Barcelona", analysis: "Dominant attack and possession play.", injuries: "Main striker suspended.", form: "WWWDW" },
        analysis: "Barcelona’s control of possession should overwhelm Las Palmas, even without their main striker."
    },
    { 
        id: 5, match: "Huddersfield Vs Peterborough", time: convertToUTC("22/02, 18:00"), prediction: "Yes (Both Teams To Score)", odds: "1.68",
        team1: { name: "Huddersfield", analysis: "Weak defense but attacking potential.", injuries: "Defender out.", form: "LDLWD" },
        team2: { name: "Peterborough", analysis: "Concedes and scores often.", injuries: "No key injuries.", form: "WDWDL" },
        analysis: "Both teams have shown defensive vulnerabilities but also attacking strength, making a high-scoring game likely."
    },
    { 
        id: 6, match: "Ross County Fc Vs Dundee Fc", time: convertToUTC("22/02, 18:00"), prediction: "Yes (Both Teams To Score)", odds: "1.70",
        team1: { name: "Ross County", analysis: "Good attacking side, but leaky defense.", injuries: "Midfielder doubtful.", form: "DLWWD" },
        team2: { name: "Dundee FC", analysis: "Struggles away but scores consistently.", injuries: "No key injuries.", form: "WLDWD" },
        analysis: "Both teams have attacking intent but struggle defensively, making goals likely."
    },
    { 
        id: 7, match: "Wydad Ac Vs. Meknes", time: convertToUTC("22/02, 18:00"), prediction: "Wydad AC", odds: "1.29",
        team1: { name: "Wydad AC", analysis: "Strongest team in the league.", injuries: "None.", form: "WWWDW" },
        team2: { name: "Meknes", analysis: "Poor form against top teams.", injuries: "Striker out.", form: "LLDWL" },
        analysis: "Wydad AC should dominate, especially given Meknes' struggles against top sides."
    }
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
