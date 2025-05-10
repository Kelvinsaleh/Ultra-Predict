// backend/functions/dataFetcher.js

const axios = require('axios');

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;

exports.fetchHistoricalData = async (teamIds) => {
  const results = [];

  for (const teamId of teamIds) {
    const res = await axios.get(`https://v3.football.api-sports.io/fixtures`, {
      headers: { 'x-apisports-key': API_FOOTBALL_KEY },
      params: { team: teamId, season: '2023', last: 10 }
    });
    results.push(...res.data.response);
  }

  return results;
};

exports.fetchUpcomingFixtures = async () => {
  const res = await axios.get(`https://v3.football.api-sports.io/fixtures`, {
    headers: { 'x-apisports-key': API_FOOTBALL_KEY },
    params: { next: 10 }
  });

  return res.data.response;
};
