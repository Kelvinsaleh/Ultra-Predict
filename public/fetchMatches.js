
// Fetch match data from API-FOOTBALL and upload to Firebase
const axios = require('axios');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

async function fetchAndStoreMatches() {
    const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
        headers: { 'X-RapidAPI-Key': 'YOUR_API_KEY' }
    });
    const matches = response.data.response;
    
    for (let match of matches) {
        await db.collection('matches').doc(match.fixture.id.toString()).set(match);
    }
    console.log("Matches updated in Firebase");
}
fetchAndStoreMatches();
