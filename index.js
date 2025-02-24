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
    },
    {
        id: 3,
        match: "Roma vs. Monza",
        time: convertToUTC("24/02, 22:45"),
        prediction: "Paulo Dybala to score first",
        odds: "3.50",
        team1: { name: "Roma", analysis: "Attacking strength.", form: "WWWLW" },
        team2: { name: "Monza", analysis: "Defensive struggles.", form: "LDLLW" },
        analysis: "Dybala is in great form and likely to score first.",
        headToHead: "Roma 3-1 Monza (Last Match)"
    },
    {
        id: 4,
        match: "Viborg FF vs. Silkeborg IF",
        time: convertToUTC("24/02, 21:00"),
        prediction: "Draw",
        odds: "3.30",
        team1: { name: "Viborg FF", analysis: "Struggles to secure wins.", form: "DDWDL" },
        team2: { name: "Silkeborg IF", analysis: "Inconsistent results.", form: "WLWDD" },
        analysis: "Both teams have similar form, making a draw likely.",
        headToHead: "Viborg FF 1-1 Silkeborg IF (Last Match)"
    },
    {
        id: 5,
        match: "Motor Lublin vs. GKS Katowice",
        time: convertToUTC("24/02, 21:00"),
        prediction: "Under 2.5 Goals",
        odds: "1.75",
        team1: { name: "Motor Lublin", analysis: "Low-scoring team.", form: "WLDDL" },
        team2: { name: "GKS Katowice", analysis: "Defensive approach.", form: "DDLDW" },
        analysis: "Both teams struggle to score, making under 2.5 goals likely.",
        headToHead: "Motor Lublin 1-0 GKS Katowice (Last Match)"
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
