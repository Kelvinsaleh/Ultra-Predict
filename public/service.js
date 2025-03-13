// server.js (Updated: Secure Firebase Config & Automated Predictions)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});
const db = admin.firestore();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve Firebase Config Securely
app.get('/firebase-config', (req, res) => {
    res.json({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    });
});

// Fetch Predictions from API & Store in Firebase
const fetchPredictions = async () => {
    try {
        const response = await fetch(`https://api-football.com/predictions?key=${process.env.API_FOOTBALL_KEY}`);
        const data = await response.json();
        const predictionsRef = db.collection('predictions');
        
        await predictionsRef.doc('latest').set({ matches: data });
        console.log("Predictions updated successfully");
    } catch (error) {
        console.error("Error fetching predictions:", error);
    }
};

// Automate Predictions Update Every 6 Hours
setInterval(fetchPredictions, 6 * 60 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    fetchPredictions();
});
