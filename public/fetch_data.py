const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const API_URL = "https://v3.football.api-sports.io/fixtures";
const API_KEY = process.env.API_KEY;

async function fetchAndStoreMatches() {
  try {
    const response = await axios.get(API_URL, {
      headers: { "x-apisports-key": API_KEY },
    });

    if (response.status === 200 && response.data.response) {
      await db.collection("matches").doc("latest").set({ data: response.data.response });
      console.log("Matches stored successfully!");
    } else {
      console.log("No match data found.");
    }
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
}

fetchAndStoreMatches();
