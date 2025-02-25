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

// Updated Predictions Data with Full Analysis (25/02 Matches Added)
const predictions = [
    {
        id: 6,
        match: "Manchester United vs. Fulham",
        time: convertToUTC("25/02, 17:00"),
        prediction: "Manchester United to win & Over 2.5 Goals",
        odds: "2.00",
        team1: { name: "Manchester United", analysis: "Strong home record.", form: "WWDWL" },
        team2: { name: "Fulham", analysis: "Struggles away from home.", form: "LDDWL" },
        analysis: "Manchester United has been dominant at home and should secure a win.",
        headToHead: "Manchester United 2-1 Fulham (Last Match)"
    },
    {
        id: 7,
        match: "Inter Milan vs. Genoa",
        time: convertToUTC("25/02, 21:45"),
        prediction: "Inter Milan to win & Both Teams to Score",
        odds: "2.50",
        team1: { name: "Inter Milan", analysis: "Top of the league with great form.", form: "WWWWW" },
        team2: { name: "Genoa", analysis: "Defensively weak but can score.", form: "WLDDL" },
        analysis: "Inter Milan is in fantastic form, but Genoa has the ability to score.",
        headToHead: "Inter Milan 3-1 Genoa (Last Match)"
    },
    {
        id: 8,
        match: "Bayern Munich vs. RB Leipzig",
        time: convertToUTC("25/02, 19:30"),
        prediction: "Over 3.5 Goals",
        odds: "1.80",
        team1: { name: "Bayern Munich", analysis: "Attacking powerhouse.", form: "WWDWW" },
        team2: { name: "RB Leipzig", analysis: "Capable of scoring against big teams.", form: "WLWWD" },
        analysis: "Both teams have attacking quality, making a high-scoring match likely.",
        headToHead: "Bayern Munich 3-2 RB Leipzig (Last Match)"
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
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <html>
            <head><title>Terms of Service - UltraPredict</title></head>
            <body>
                <h1>Terms of Service</h1>
                <p><strong>Effective Date:</strong> [Insert Date]</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using UltraPredict, you agree to these Terms of Service. If you do not agree, do not use this website.</p>

                <h2>2. Description of Service</h2>
                <p>UltraPredict provides football match predictions based on analysis and expert insights. The predictions are for informational purposes only and do not guarantee results.</p>

                <h2>3. User Responsibility</h2>
                <ul>
                    <li>You acknowledge that betting involves risk and should be done responsibly.</li>
                    <li>UltraPredict is not liable for any financial losses incurred from using the provided predictions.</li>
                </ul>

                <h2>4. Intellectual Property</h2>
                <p>All content on UltraPredict, including match analysis and predictions, is owned by UltraPredict and may not be copied or redistributed without permission.</p>

                <h2>5. Privacy Policy</h2>
                <p>Your use of this website is also governed by our <a href="/privacy">Privacy Policy</a>.</p>

                <h2>6. Changes to Terms</h2>
                <p>UltraPredict reserves the right to update these terms at any time. Continued use of the site after updates constitutes acceptance of the new terms.</p>

                <h2>7. Contact Information</h2>
                <p>For any questions, contact us at <strong>support@ultra-predict.co.ke</strong></p>
            </body>
        </html>
    `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
