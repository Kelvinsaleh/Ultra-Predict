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
    { id: 5, match: "Club Brugge Vs Standard Liege", time: convertToUTC("23/02, 15:30"), prediction: "Club Brugge", odds: "1.35", team1: { name: "Club Brugge", analysis: "Dominates home matches.", form: "WWDWL" }, team2: { name: "Standard Liege", analysis: "Struggles against top teams.", form: "LDWLD" }, analysis: "Club Brugge has been dominant at home and should secure a win.", headToHead: "Club Brugge 2-0 Standard Liege (Last Match)" },
    { id: 6, match: "Real Madrid Vs Girona", time: convertToUTC("23/02, 18:15"), prediction: "Real Madrid", odds: "1.34", team1: { name: "Real Madrid", analysis: "In top form, strong attack.", form: "WWWWW" }, team2: { name: "Girona", analysis: "Decent attack but shaky defense.", form: "LWWLD" }, analysis: "Real Madrid's form and home advantage make them favorites.", headToHead: "Real Madrid 3-1 Girona (Last Match)" },
    { id: 7, match: "Manchester City Vs Liverpool", time: convertToUTC("23/02, 19:30"), prediction: "Yes (Both Teams To Score)", odds: "1.40", team1: { name: "Manchester City", analysis: "Strong attack but concedes goals.", form: "WWDWW" }, team2: { name: "Liverpool", analysis: "Excellent attack, inconsistent defense.", form: "WDWLW" }, analysis: "Both teams have top-class attacks, making both teams scoring likely.", headToHead: "Man City 2-2 Liverpool (Last Match)" },
    { id: 8, match: "Newcastle Vs Nottingham Forest", time: convertToUTC("23/02, 17:00"), prediction: "Draw", odds: "3.90", analysis: "Newcastle and Nottingham Forest have been inconsistent, making a draw likely.", headToHead: "Newcastle 1-1 Nottingham Forest (Last Match)", form: "LWDLD" },
    { id: 9, match: "Bayern Munich Vs Eintracht Frankfurt", time: convertToUTC("23/02, 19:30"), prediction: "Bayern Munich", odds: "1.27", analysis: "Bayern's home form should be enough to secure a win.", headToHead: "Bayern Munich 4-1 Eintracht Frankfurt (Last Match)", form: "WWLDW" },
    { id: 10, match: "Cosenza Calcio Vs Palermo Fc", time: convertToUTC("23/02, 17:00"), prediction: "Under 2.5 Goals", odds: "1.66", analysis: "Both teams struggle to score, making under 2.5 goals likely.", headToHead: "Cosenza 0-0 Palermo (Last Match)", form: "DLDWL" }
];

app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/predictions', (req, res) => res.json(predictions));
app.get('/api/match/:id', (req, res) => {
    const matchDetails = predictions.find(p => p.id === parseInt(req.params.id));
    matchDetails ? res.json(matchDetails) : res.status(404).json({ error: "Match not found" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
