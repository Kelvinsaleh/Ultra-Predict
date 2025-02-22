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

// Predictions with extra details
const predictions = [
    {
        match: "Arsenal Vs. West Ham",
        time: convertToUTC("22/02, 18:00"),
        prediction: "Arsenal",
        odds: "1.33",
        analysis: "Arsenal has won 4 of their last 5 home matches. West Ham struggles defensively away.",
        injuries: "Arsenal: Partey (Out), West Ham: Bowen (Doubtful)",
        safe_bet: "Arsenal Double Chance (1X)",
        risky_bet: "Arsenal -1.5 Handicap"
    },
    {
        match: "Aston Villa Vs. Chelsea",
        time: convertToUTC("22/02, 20:30"),
        prediction: "Over 1.5 Goals",
        odds: "1.17",
        analysis: "Both teams have scored in 8 of their last 10 meetings.",
        injuries: "Aston Villa: None, Chelsea: Reece James (Out)",
        safe_bet: "Over 1.5 Goals",
        risky_bet: "Both Teams to Score (Yes)"
    },
    {
        match: "Las Palmas Vs. Barcelona",
        time: convertToUTC("22/02, 23:00"),
        prediction: "Barcelona",
        odds: "1.26",
        analysis: "Barcelona remains unbeaten in their last 6 league matches.",
        injuries: "Barcelona: Pedri (Doubtful), Las Palmas: No key injuries",
        safe_bet: "Barcelona to Win",
        risky_bet: "Barcelona & Over 2.5 Goals"
    }
];

app.use(express.static(path.join(__dirname, 'public')));

// API Route: Serve predictions with enhanced details
app.get('/api/predictions', (req, res) => {
    res.json(predictions);
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
