const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const db = admin.firestore();

router.get('/predictions', async (req, res) => {
    try {
        const snapshot = await db.collection('predictions').get();
        const predictions = snapshot.docs.map(doc => doc.data());
        res.json(predictions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch predictions" });
    }
});

module.exports = router;
