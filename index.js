require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://v3.football.api-sports.io/fixtures';
const HEADERS = { 'x-apisports-key': API_KEY };

const leagues = {
  EPL: 39,
  La_Liga: 140,
  Serie_A: 135,
  Bundesliga: 78,
  Ligue_1: 61,
  Eredivisie: 88,
  Primeira_Liga: 94,
  UCL: 2,
  UEL: 3,
  UECL: 848,
  FA_Cup: 45,
  Carabao_Cup: 46,
  Championship: 40,
  World_Cup: 1,
  Euro: 4,
  AFCON: 5,
  Copa_America: 9,
  Nations_League: 6
};

const seasons = [2021, 2022, 2023];

async function fetchMatches(leagueName, leagueId, season) {
  const allMatches = [];
  for (let page = 1; page <= 20; page++) {
    const response = await axios.get(BASE_URL, {
      headers: HEADERS,
      params: {
        league: leagueId,
        season: season,
        status: 'FT',
        page: page
      }
    });

    const data = response.data.response;
    if (!data || data.length === 0) break;

    allMatches.push(...data);
    await new Promise(resolve => setTimeout(resolve, 1300)); // Delay to avoid rate limits
  }

  const dir = path.join(__dirname, 'raw_matches');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filename = path.join(dir, `${leagueName}_${season}.json`);
  fs.writeFileSync(filename, JSON.stringify(allMatches, null, 2));
  console.log(`Saved ${filename}`);
}

(async () => {
  for (const [leagueName, leagueId] of Object.entries(leagues)) {
    for (const season of seasons) {
      try {
        console.log(`Fetching: ${leagueName} (${season})`);
        await fetchMatches(leagueName, leagueId, season);
      } catch (error) {
        console.error(`Error fetching ${leagueName} (${season}):`, error.message);
      }
    }
  }
})();
