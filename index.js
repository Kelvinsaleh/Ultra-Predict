const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Function to convert EAT (UTC+3) to UTC
const convertToUTC = (time) => {
    const [date, eatTime] = time.split(', ');
    const [hours, minutes] = eatTime.split(':').map(Number);

    // Convert to UTC by subtracting 3 hours
    let utcHours = hours - 3;
    if (utcHours < 0) utcHours += 24; // Adjust for day wrap

    return `${date}, ${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} UTC`;
};

// Predictions with additional details
const predictions = [
    { match: "Everton Vs. Manchester United", time: convertToUTC("22/02, 15:30"), prediction: "Everton", odds: "3.45", analysis: "Everton has been solid at home.", injuries: "No key injuries.", safe_bet: "Everton Double Chance", risky_bet: "Everton Win" },
    { match: "Southampton Vs Brighton", time: convertToUTC("22/02, 18:00"), prediction: "Over 2.5 Goals", odds: "1.59", analysis: "Both teams average 3+ goals per game.", injuries: "Brighton missing key midfielder.", safe_bet: "Over 1.5 Goals", risky_bet: "Over 3.5 Goals" },
    { match: "Fsv Mainz Vs. St. Pauli", time: convertToUTC("22/02, 17:30"), prediction: "FSV Mainz", odds: "1.84", analysis: "Mainz has a strong home record.", injuries: "St. Pauli without key striker.", safe_bet: "FSV Mainz Win", risky_bet: "Mainz -1 Handicap" },
    { match: "Derby Vs. Millwall", time: convertToUTC("22/02, 15:30"), prediction: "Draw", odds: "2.90", analysis: "Both teams evenly matched in form.", injuries: "No major absences.", safe_bet: "Under 2.5 Goals", risky_bet: "Correct Score 1-1" }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/predictions', (req, res) => {
    res.json(predictions);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
