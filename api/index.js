require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');

// Load Firebase credentials from .env
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/predictions', async (req, res) => {
  const doc = await db.collection("predictions").doc("latest").get();
  if (!doc.exists) return res.status(404).send("No predictions found.");
  res.json(doc.data());
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
