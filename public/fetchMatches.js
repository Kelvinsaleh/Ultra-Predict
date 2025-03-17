require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

// Fetch matches from API-FOOTBALL
async function fetchMatchData() {
    try {
        const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
            headers: {
                'x-apisports-key': process.env.API_KEY
            },
            params: {
                date: new Date().toISOString().split('T')[0], // Today's matches
                league: process.env.LEAGUE_ID,  
                season: process.env.SEASON_YEAR
            }
        });

        if (!response.data.response || response.data.response.length === 0) {
            console.log("No matches found.");
            return;
        }

        console.log("Fetched Matches:", response.data.response);
        
        // Save matches locally (optional)
        fs.writeFileSync('predictions.json', JSON.stringify(response.data.response, null, 2));

    } catch (error) {
        console.error("API Fetch Error:", error.response ? error.response.data : error.message);
    }
}

// Run fetch function
fetchMatchData();
