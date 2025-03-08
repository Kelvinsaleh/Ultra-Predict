const express = require("express");
const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const PORT = 3000;

const API_URL = "https://v3.football.api-sports.io/fixtures"; // Update with the correct API endpoint
const API_KEY = "your_api_key"; // Replace with your API key

// Fetch and store match data in Firebase
app.get("/fetch-matches", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "x-apisports-key": API_KEY,
      },
    });

    const matches = response.data.response;

    // Store in Firebase
    const batch = db.batch();
    matches.forEach((match) => {
      const docRef = db.collection("matches").doc(match.fixture.id.toString());
      batch.set(docRef, match);
    });

    await batch.commit();
    res.json({ message: "Matches stored successfully!", data: matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
