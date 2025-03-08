const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const API_URL = "https://v3.football.api-sports.io/fixtures";
const API_KEY = "your_api_key"; // Replace with your actual key

async function fetchAndStoreMatches() {
  try {
    const response = await axios.get(API_URL, {
      headers: { "x-apisports-key": API_KEY },
      params: { league: "39", season: "2024" },
    });

    const matches = response.data.response;

    if (!matches || matches.length === 0) {
      console.log("No matches found.");
      return;
    }

    const batch = db.batch();
    matches.forEach((match) => {
      const docRef = db.collection("matches").doc(match.fixture.id.toString());
      batch.set(docRef, match);
    });

    await batch.commit();
    console.log("Matches updated in Firebase");
  } catch (error) {
    console.error("Error fetching matches:", error.message);
  }
}

fetchAndStoreMatches();
