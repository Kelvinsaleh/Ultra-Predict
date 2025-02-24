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

// Updated Predictions Data with Full Analysis
const predictions = [
    {
        id: 1,
        match: "Sheffield United vs. Leeds United",
        time: convertToUTC("24/02, 23:00"),
        prediction: "Leeds United to win in a low-scoring match",
        odds: "1.90",
        team1: { name: "Sheffield United", analysis: "Struggling defensively.", form: "LDWDL" },
        team2: { name: "Leeds United", analysis: "Strong attack, solid defense.", form: "WWDWW" },
        analysis: "Leeds boasts a superior attack and solid defense.",
        headToHead: "Sheffield United 0-2 Leeds United (Last Match)"
    },
    {
        id: 2,
        match: "Sevilla vs. Mallorca",
        time: convertToUTC("24/02, 23:00"),
        prediction: "Sevilla to lead at half-time",
        odds: "2.10",
        team1: { name: "Sevilla", analysis: "Strong home team.", form: "WDLWW" },
        team2: { name: "Mallorca", analysis: "Struggles defensively.", form: "LLDWL" },
        analysis: "Sevilla’s home advantage makes them likely to lead early.",
        headToHead: "Sevilla 2-0 Mallorca (Last Match)"
    }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/predictions', (req, res) => res.json(predictions));

app.get('/api/match/:id', (req, res) => {
    const matchDetails = predictions.find(p => p.id === parseInt(req.params.id));
    matchDetails ? res.json(matchDetails) : res.status(404).json({ error: "Match not found" });
});

// Terms of Service Route
app.get('/terms', (req, res) => {
    res.send(`
        <html>
            <head><title>Terms of Service - UltraPredict</title></head>
            <body>
                <h1>Terms of Service</h1>
                <p><strong>Effective Date:</strong> [Insert Date]</p>
                <p>By accessing or using UltraPredict, you agree to these Terms of Service.</p>
                <h2>Contact Information</h2>
                <p>Email: <strong>Knsalee@gmail.com</strong></p>
                <p>Phone: <strong>+254742608319</strong></p>
            </body>
        </html>
    `);
});

// Contact Us Route
app.get('/contact', (req, res) => {
    res.send(`
        <html>
            <head><title>Contact Us - UltraPredict</title></head>
            <body>
                <h1>Contact Us</h1>
                <p>If you have any questions or concerns, feel free to reach out to us:</p>
                <p><strong>Email:</strong> <a href="mailto:Knsalee@gmail.com">Knsalee@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+254742608319">+254742608319</a></p>
            </body>
        </html>
    `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
