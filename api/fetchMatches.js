require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const API_KEY = process.env.API_FOOTBALL_KEY;
const LEAGUES = [39, 140, 61]; // EPL, La Liga, Bundesliga

async function fetchMatches() {
  const date = new Date().toISOString().split("T")[0];
  let matches = [];

  for (let league of LEAGUES) {
    const url = `https://v3.football.api-sports.io/fixtures?date=${date}&league=${league}&season=2024`;
    const response = await axios.get(url, { headers: { "x-apisports-key": API_KEY } });
    
    response.data.response.forEach(match => {
      matches.push({
        date: match.fixture.date,
        home_team: match.teams.home.name,
        away_team: match.teams.away.name,
        home_team_rank: Math.random() * 100,
        away_team_rank: Math.random() * 100,
        home_form: Math.random() * 5,
        away_form: Math.random() * 5,
        odds_home: match.odds?.home || 2.0,
        odds_draw: match.odds?.draw || 3.2,
        odds_away: match.odds?.away || 3.0
      });
    });
  }

  fs.writeFileSync("upcoming_matches.csv", JSON.stringify(matches, null, 2));
  console.log("✅ Matches saved!");
}

fetchMatches();
