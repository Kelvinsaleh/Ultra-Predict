// fetch_data.py
import requests
import json
import os

API_KEY = os.getenv("API_KEY")  # Load from environment variable
URL = "https://v3.football.api-sports.io/fixtures"

params = {
    "league": "39",  # Example: English Premier League
    "season": "2024",
}

headers = {"x-apisports-key": API_KEY}

def fetch_matches():
    response = requests.get(URL, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        if "response" in data:
            with open("matches.json", "w") as f:
                json.dump(data["response"], f, indent=4)
            print("Match data fetched successfully.")
        else:
            print("Error: Unexpected API response format.")
    else:
        print(f"Failed to fetch match data. Status: {response.status_code}, Error: {response.text}")

if __name__ == "__main__":
    fetch_matches()

// fetchMatches.js
const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");
require("dotenv").config(); // Load environment variables

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const API_URL = "https://v3.football.api-sports.io/fixtures";
const API_KEY = process.env.API_KEY; // Load API key securely

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

// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");
require("dotenv").config(); // Load environment variables

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors()); // Enable CORS

const PORT = process.env.PORT || 3000;
const API_URL = "https://v3.football.api-sports.io/fixtures";
const API_KEY = process.env.API_KEY; // Load API key securely

// Root Route
app.get("/", (req, res) => {
  res.send("UltraPredict API is running!");
});

// Fetch Matches Route
app.get("/fetch-matches", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { "x-apisports-key": API_KEY },
      params: { league: "39", season: "2024" },
    });

    const matches = response.data.response;

    if (!matches || matches.length === 0) {
      return res.status(404).json({ message: "No matches found!" });
    }

    const batch = db.batch();
    matches.forEach((match) => {
      const docRef = db.collection("matches").doc(match.fixture.id.toString());
      batch.set(docRef, match);
    });

    await batch.commit();
    res.json({ message: "Matches stored successfully in Firestore!" });
  } catch (error) {
    console.error("Error fetching matches:", error.message);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
