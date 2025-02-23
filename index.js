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

// Predictions Data with Full Analysis
const predictions = [
    { id: 1, match: "MVV Maastricht Vs ADO Den Haag", time: convertToUTC("23/02, 18:45"), prediction: "Yes (Both Teams To Score)", odds: "1.46", team1: { name: "MVV Maastricht", analysis: "Attacking team but weak defensively.", form: "WLWDL" }, team2: { name: "ADO Den Haag", analysis: "Good scoring form but concedes frequently.", form: "DWWLD" }, analysis: "Both teams have shown strong attacking intent but weak defenses, making a Both Teams to Score outcome highly likely.", headToHead: "MVV Maastricht 1-2 ADO Den Haag (Last Match)" },
    { id: 2, match: "AZ Alkmaar SRL Vs Fortuna Sittard SRL", time: convertToUTC("23/02, 11:00"), prediction: "AZ Alkmaar SRL", odds: "1.33", team1: { name: "AZ Alkmaar SRL", analysis: "Strong squad, excellent home form.", form: "WWDWW" }, team2: { name: "Fortuna Sittard SRL", analysis: "Struggles against top teams.", form: "LDLDW" }, analysis: "AZ Alkmaar has been dominant at home and should secure a comfortable win against a weaker Fortuna Sittard SRL side.", headToHead: "AZ Alkmaar 3-1 Fortuna Sittard (Last Match)" },
    { id: 3, match: "KRC Genk Vs KAA Gent", time: convertToUTC("23/02, 18:00"), prediction: "KRC Genk (Draw No Bet)", odds: "1.22", team1: { name: "KRC Genk", analysis: "Consistent at home, solid defense.", form: "WWLDW" }, team2: { name: "KAA Gent", analysis: "Struggles in away matches.", form: "LDWWD" }, analysis: "KRC Genk has been defensively solid and should have the edge over KAA Gent at home.", headToHead: "KRC Genk 2-0 KAA Gent (Last Match)" },
    { id: 4, match: "RSC Anderlecht Vs Union Saint-Gilloise", time: convertToUTC("23/02, 20:30"), prediction: "Over 1.5 Goals", odds: "1.30", team1: { name: "RSC Anderlecht", analysis: "Strong attacking form.", form: "WWDWD" }, team2: { name: "Union Saint-Gilloise", analysis: "Effective counterattacks.", form: "WLWWD" }, analysis: "Both teams have attacking prowess, making over 1.5 goals a likely outcome.", headToHead: "Anderlecht 1-1 Union Saint-Gilloise (Last Match)" },
    { id: 5, match: "Club Brugge Vs Standard Liege", time: convertToUTC("23/02, 15:30"), prediction: "Club Brugge", odds: "1.35", team1: { name: "Club Brugge", analysis: "Superior home form.", form: "WWLWD" }, team2: { name: "Standard Liege", analysis: "Inconsistent performances.", form: "DLWLD" }, analysis: "Club Brugge should take all three points given their dominance at home.", headToHead: "Club Brugge 2-1 Standard Liege (Last Match)" },
    { id: 6, match: "Real Madrid Vs Girona", time: convertToUTC("23/02, 18:15"), prediction: "Real Madrid", odds: "1.34", team1: { name: "Real Madrid", analysis: "Title contenders, strong squad.", form: "WDWWW" }, team2: { name: "Girona", analysis: "Surprise package but inconsistent.", form: "LWWDW" }, analysis: "Real Madrid's quality should see them claim victory over Girona.", headToHead: "Real Madrid 4-2 Girona (Last Match)" },
    { id: 7, match: "Athletic Bilbao Vs Valladolid", time: convertToUTC("23/02, 16:00"), prediction: "Athletic Bilbao", odds: "1.21", team1: { name: "Athletic Bilbao", analysis: "Strong at home.", form: "WDWLW" }, team2: { name: "Valladolid", analysis: "Struggles away from home.", form: "LLDLD" }, analysis: "Bilbao’s home advantage should be enough to secure the win.", headToHead: "Bilbao 2-0 Valladolid (Last Match)" },
    { id: 8, match: "Manchester City Vs Liverpool", time: convertToUTC("23/02, 19:30"), prediction: "Yes (Both Teams To Score)", odds: "1.40", team1: { name: "Manchester City", analysis: "Elite attack.", form: "WWWDW" }, team2: { name: "Liverpool", analysis: "Dangerous attack but leaky defense.", form: "WLWWD" }, analysis: "Both teams have immense attacking talent, making a BTTS bet a strong option.", headToHead: "Man City 3-2 Liverpool (Last Match)" }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/predictions', (req, res) => {
    res.json(predictions);
});

app.get('/api/match/:id', (req, res) => {
    const matchDetails = predictions.find(p => p.id === parseInt(req.params.id));
    matchDetails ? res.json(matchDetails) : res.status(404).json({ error: "Match not found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
