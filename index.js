const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Convert EAT (UTC+3) to UTC
const convertToUTC = (time) => {
    const [date, eatTime] = time.split(', ');
    const [hours, minutes] = eatTime.split(':').map(Number);
    let utcHours = hours - 3;
    if (utcHours < 0) utcHours += 24;
    return `${date}, ${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} UTC`;
};

// Predictions Data with Analysis
const predictions = [
    { id: 1, match: "Arsenal Vs. West Ham", time: convertToUTC("22/02, 18:00"), prediction: "Arsenal", odds: "1.33",
      team1: { name: "Arsenal", analysis: "Strong home record, dominant attack.", injuries: "No key injuries.", form: "WWDWW" },
      team2: { name: "West Ham", analysis: "Struggles against top teams.", injuries: "Key midfielder out.", form: "LDWDL" }
    },
    { id: 2, match: "Aston Villa Vs Chelsea", time: convertToUTC("22/02, 20:30"), prediction: "Over 1.5", odds: "1.17",
      team1: { name: "Aston Villa", analysis: "Attacking-minded, scores often.", injuries: "Main defender doubtful.", form: "WDWLW" },
      team2: { name: "Chelsea", analysis: "Unstable defense but dangerous counterattacks.", injuries: "Striker injured.", form: "DLWWD" }
    },
    { id: 3, match: "Bournemouth Vs Wolves", time: convertToUTC("22/02, 18:00"), prediction: "Bournemouth (Draw No Bet)", odds: "1.25",
      team1: { name: "Bournemouth", analysis: "Solid midfield control.", injuries: "No major absences.", form: "WLWDD" },
      team2: { name: "Wolves", analysis: "Compact defense but struggles in attack.", injuries: "Main striker suspended.", form: "LDWWL" }
    },
    { id: 4, match: "Las Palmas Vs. Barcelona", time: convertToUTC("22/02, 23:00"), prediction: "Barcelona", odds: "1.26",
      team1: { name: "Las Palmas", analysis: "Strong home form, but weak against top teams.", injuries: "Midfielder out.", form: "WDDWL" },
      team2: { name: "Barcelona", analysis: "High attacking power, good away record.", injuries: "Key defender injured.", form: "WWWDW" }
    },
    { id: 5, match: "Huddersfield Vs Peterborough", time: convertToUTC("22/02, 18:00"), prediction: "Yes (Both Teams To Score)", odds: "1.68",
      team1: { name: "Huddersfield", analysis: "Defensive struggles, often concedes.", injuries: "No major injuries.", form: "WLDDL" },
      team2: { name: "Peterborough", analysis: "Attacking threat, weak defense.", injuries: "Striker out.", form: "WWDLL" }
    },
    { id: 6, match: "Borussia Dortmund Vs Union Berlin", time: convertToUTC("22/02, 20:30"), prediction: "Yes (Both Teams To Score)", odds: "1.69",
      team1: { name: "Dortmund", analysis: "Strong attacking play but concedes goals.", injuries: "Winger doubtful.", form: "WWLWD" },
      team2: { name: "Union Berlin", analysis: "Compact defense but weak away.", injuries: "Midfielder out.", form: "LDWLD" }
    },
    { id: 7, match: "Inter Milano Vs Genoa Cfc", time: convertToUTC("22/02, 22:45"), prediction: "Inter Milano & Over 1.5", odds: "1.54",
      team1: { name: "Inter Milano", analysis: "Dominant at home, high goal-scoring rate.", injuries: "Key midfielder out.", form: "WWWWD" },
      team2: { name: "Genoa", analysis: "Defensive team, rarely scores away.", injuries: "Main forward suspended.", form: "LWDLD" }
    },
    { id: 8, match: "Valencia Vs Atletico Madrid", time: convertToUTC("22/02, 20:30"), prediction: "Under 3.5", odds: "1.24",
      team1: { name: "Valencia", analysis: "Defensively solid at home.", injuries: "No key injuries.", form: "WDLWD" },
      team2: { name: "Atletico Madrid", analysis: "Compact defense, few goals conceded.", injuries: "Star forward out.", form: "WDWWL" }
    },
    { id: 9, match: "Derby Vs. Millwall", time: convertToUTC("22/02, 15:30"), prediction: "Draw", odds: "2.90",
      team1: { name: "Derby", analysis: "Good midfield but struggles in attack.", injuries: "Key defender missing.", form: "DWLLD" },
      team2: { name: "Millwall", analysis: "Counter-attacking play, tight defense.", injuries: "Captain injured.", form: "WDDWD" }
    }
    // Add the rest of the matches following the same structure
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/predictions', (req, res) => {
    res.json(predictions.map(({ id, match, time, prediction, odds }) => ({ id, match, time, prediction, odds })));
});

app.get('/api/match/:id', (req, res) => {
    const matchDetails = predictions.find(p => p.id === parseInt(req.params.id));
    if (matchDetails) {
        res.json(matchDetails); // Now includes team analysis, injuries, and form
    } else {
        res.status(404).json({ error: "Match not found" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
