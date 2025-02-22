const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Function to convert EAT (UTC+3) to UTC
const convertToUTC = (time) => {
    const [date, eatTime] = time.split(', ');
    const [hours, minutes] = eatTime.split(':').map(Number);

    let utcHours = hours - 3;
    if (utcHours < 0) utcHours += 24; // Adjust for day wrap

    return `${date}, ${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} UTC`;
};

// Predictions Data
const predictions = [
    { id: 1, match: "Everton Vs. Manchester United", time: convertToUTC("22/02, 15:30"), prediction: "Everton", odds: "3.45", analysis: "Everton has been solid at home.", injuries: "No key injuries.", form: "WWLDW" },
    { id: 2, match: "Southampton Vs Brighton", time: convertToUTC("22/02, 18:00"), prediction: "Over 2.5 Goals", odds: "1.59", analysis: "Both teams average 3+ goals per game.", injuries: "Brighton missing key midfielder.", form: "WLWDW" },
    { id: 3, match: "Fsv Mainz Vs. St. Pauli", time: convertToUTC("22/02, 17:30"), prediction: "FSV Mainz", odds: "1.84", analysis: "Mainz has a strong home record.", injuries: "St. Pauli without key striker.", form: "DWWLW" },
    { id: 4, match: "Derby Vs. Millwall", time: convertToUTC("22/02, 15:30"), prediction: "Draw", odds: "2.90", analysis: "Both teams evenly matched in form.", injuries: "No major absences.", form: "LWDWD" }
];

app.use(express.static(path.join(__dirname, 'public')));

// API to get all predictions (homepage)
app.get('/api/predictions', (req, res) => {
    res.json(predictions.map(({ id, match, time, prediction, odds }) => ({ id, match, time, prediction, odds })));
});

// API to get detailed match info (clicked match)
app.get('/api/match/:id', (req, res) => {
    const matchDetails = predictions.find(p => p.id === parseInt(req.params.id));
    if (matchDetails) {
        res.json(matchDetails);
    } else {
        res.status(404).json({ error: "Match not found" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
