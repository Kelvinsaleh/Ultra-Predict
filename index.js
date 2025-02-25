const express = require('express');
const path = require('path');
const predictions = require('./predictions'); // Import predictions from predictions.js
const app = express();
const PORT = process.env.PORT || 3000;

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
