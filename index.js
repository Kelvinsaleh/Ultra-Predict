const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const { filterVipTips } = require("./filterVipTips");
const { filterGeneralTips } = require("./filterGeneralTips");
const { filterBetOfTheDay } = require("./filterBetOfTheDay");

admin.initializeApp();
const db = admin.firestore();

// Replace this with your API key for API-Football
const API_FOOTBALL_KEY = "your-api-football-key";

// 1. Fetch match data from the API
async function fetchMatchData() {
  try {
    const response = await axios.get("https://api-football-v1.p.rapidapi.com/v3/fixtures", {
      headers: {
        "X-RapidAPI-Key": API_FOOTBALL_KEY,
      },
    });

    const matches = response.data.response.map(match => ({
      match: `${match.teams.home.name} vs ${match.teams.away.name}`,
      date: match.fixture.date,
      odds: match.odds, // Placeholder, replace with real odds structure
      teamStats: match.statistics, // Placeholder, replace with real data
    }));

    return matches;
  } catch (error) {
    console.error("Error fetching match data:", error);
    return [];
  }
}

// 2. Generate AI model predictions (stub example)
async function generateAIPredictions(matches) {
  return matches.map(match => ({
    match: match.match,
    prediction: "Over 2.5",  // Simulate a prediction type
    confidence: Math.random() * 100,  // Random confidence between 0 and 100
    odds: Math.random() * 5 + 1,  // Simulate odds between 1 and 6
  }));
}

// 3. Cloud Function to generate VIP, General predictions and Bet of the Day
exports.generatePredictions = functions.pubsub.schedule("every day 06:00").timeZone("Africa/Nairobi").onRun(async (context) => {
  // Step 1: Fetch live match data
  const matchData = await fetchMatchData();

  if (!matchData.length) {
    console.log("No match data found");
    return;
  }

  // Step 2: Generate AI model predictions
  const predictions = await generateAIPredictions(matchData);

  // Step 3: Filter predictions
  const vipSlip = filterVipTips(predictions);  // VIP tips filter
  const generalTips = filterGeneralTips(predictions);  // General tips filter
  const betOfTheDay = filterBetOfTheDay(predictions); // Bet of the Day filter

  // Step 4: Get today's date
  const today = new Date().toISOString().split("T")[0];

  // Step 5: Save predictions to Firestore
  if (vipSlip) {
    await db.collection("vipTips").doc(today).set(vipSlip);
    console.log("VIP tips updated for:", today);
  }

  if (generalTips.length > 0) {
    await db.collection("generalTips").doc(today).set({ tips: generalTips });
    console.log("General tips updated for:", today);
  }

  if (betOfTheDay) {
    await db.collection("betOfTheDay").doc(today).set(betOfTheDay);
    console.log("Bet of the Day updated for:", today);
  }
});
