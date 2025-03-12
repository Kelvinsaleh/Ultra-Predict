const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const db = admin.firestore();

router.get('/vipPredictions', async (req, res) => {
    try {
        const snapshot = await db.collection('vipPredictions').get();
        const predictions = snapshot.docs.map(doc => doc.data());
        res.json(predictions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch VIP predictions" });
    }
});

module.exports = router;
