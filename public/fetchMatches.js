const axios = require("axios");
const db = require("./firebase");

const API_KEY = "YOUR_API_KEY";
const API_URL = "https://v3.football.api-sports.io/";

async function fetchMatches() {
  try {
    const response = await axios.get(`${API_URL}fixtures?league=39&season=2024`, {
      headers: { "x-apisports-key": API_KEY },
    });

    const matches = response.data.response;
    const batch = db.batch();

    matches.forEach((match) => {
      const matchRef = db.collection("matches").doc(match.fixture.id.toString());
      batch.set(matchRef, {
        home: match.teams.home.name,
        away: match.teams.away.name,
        date: match.fixture.date,
        status: match.fixture.status.short,
      });
    });

    await batch.commit();
    console.log("Matches added to Firestore");
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
}

fetchMatches();
