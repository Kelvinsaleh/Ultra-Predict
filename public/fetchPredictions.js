require('dotenv').config();
const axios = require('axios');
const admin = require('firebase-admin');
const fs = require('fs');

// Parse Firebase credentials from .env
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix multiline key
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();
const predictionsRef = db.ref("predictions");

// API-FOOTBALL settings
const API_KEY = process.env.API_FOOTBALL_KEY;
const API_URL = "https://v3.football.api-sports.io/fixtures";

// Fetch today's matches
async function fetchMatches() {
  try {
    const response = await axios.get(API_URL, {
      headers: { 'x-apisports-key': API_KEY },
      params: { date: new Date().toISOString().split('T')[0], league: '39', season: '2024' }
    });

    return response.data.response;
  } catch (error) {
    console.error("Error fetching matches:", error.message);
    return [];
  }
}

// Apply rule-based predictions
function generatePrediction(match) {
  const home = match.teams.home;
  const away = match.teams.away;
  const stats = match.statistics;

  let prediction = "Unknown";

  if (stats.home.form && stats.away.form) {
    const homeWins = (stats.home.form.match(/W/g) || []).length;
    const awayWins = (stats.away.form.match(/W/g) || []).length;

    if (homeWins >= 4) prediction = `${home.name} Win`;
    else if (awayWins >= 4) prediction = `${away.name} Win`;
    else prediction = "Draw";
  }

  if (stats.home.goalsAvg >= 2 || stats.away.goalsAvg >= 2) {
    prediction += " & Over 1.5 Goals";
  }

  return {
    match: `${home.name} vs ${away.name}`,
    prediction,
    date: match.fixture.date
  };
}

// Main function to fetch and save predictions
async function updatePredictions() {
  const matches = await fetchMatches();
  const predictions = matches.map(generatePrediction);

  await predictionsRef.set(predictions);
  fs.writeFileSync('predictions.json', JSON.stringify(predictions, null, 2));

  console.log("Predictions updated successfully!");
}

// Run the script
updatePredictions();
