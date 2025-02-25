// Convert EAT (UTC+3) to UTC
const convertToUTC = (time) => {
    const [date, eatTime] = time.split(', ');
    const [hours, minutes] = eatTime.split(':').map(Number);
    let utcHours = hours - 3;
    if (utcHours < 0) utcHours += 24;
    return `${date}, ${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} UTC`;
};

// Predictions for February 25th Matches
const predictions = [
    {
        id: 12,
        match: "Brighton vs. Crystal Palace",
        time: convertToUTC("25/02, 22:30"),
        prediction: "Both Teams to Score & Over 2.5 Goals",
        odds: "1.90",
        team1: { name: "Brighton", analysis: "Strong attack but defensively shaky.", form: "WLDWL" },
        team2: { name: "Crystal Palace", analysis: "Struggles against top teams but can score.", form: "LLWDD" },
        analysis: "Brighton’s attacking style makes this a high-scoring match.",
        headToHead: "Brighton 2-1 Crystal Palace (Last Match)"
    },
    {
        id: 13,
        match: "Bournemouth vs. Aston Villa",
        time: convertToUTC("25/02, 22:30"),
        prediction: "Aston Villa to win or Draw & Over 1.5 Goals",
        odds: "1.75",
        team1: { name: "Bournemouth", analysis: "Unpredictable form, strong at home.", form: "WLWDL" },
        team2: { name: "Aston Villa", analysis: "One of the best away teams this season.", form: "WDWWL" },
        analysis: "Aston Villa has been strong, but Bournemouth could challenge.",
        headToHead: "Bournemouth 2-2 Aston Villa (Last Match)"
    },
    {
        id: 14,
        match: "Wolves vs. Fulham",
        time: convertToUTC("25/02, 22:30"),
        prediction: "Under 2.5 Goals",
        odds: "1.80",
        team1: { name: "Wolves", analysis: "Defensively solid but struggles to score.", form: "WDLWL" },
        team2: { name: "Fulham", analysis: "Poor away record and inconsistent attack.", form: "LDDWL" },
        analysis: "Both teams have struggled offensively, so a low-scoring match is expected.",
        headToHead: "Wolves 1-1 Fulham (Last Match)"
    },
    {
        id: 15,
        match: "Birmingham vs. Leyton Orient",
        time: convertToUTC("25/02, 22:30"),
        prediction: "Birmingham to Win",
        odds: "1.85",
        team1: { name: "Birmingham", analysis: "Strong home record and superior squad depth.", form: "WLWWD" },
        team2: { name: "Leyton Orient", analysis: "Struggles in away matches and inconsistent performances.", form: "LWLDD" },
        analysis: "Birmingham has been dominant at home and faces a weaker Leyton Orient side.",
        headToHead: "Birmingham 3-1 Leyton Orient (Last Match)"
    },
    {
        id: 16,
        match: "Angers vs. Reims",
        time: convertToUTC("25/02, 22:30"),
        prediction: "Angers to Win",
        odds: "1.70",
        team1: { name: "Angers", analysis: "Consistent form and strong at home.", form: "WWLDW" },
        team2: { name: "Opponent", analysis: "Struggles in away games and weak defensively.", form: "LDLWL" },
        analysis: "Angers has been dominant at home and should secure a win.",
        headToHead: "Angers 2-0 Opponent (Last Match)"
    },
    {
        id: 17,
        match: "Chelsea vs. Southamptom",
        time: convertToUTC("25/02, 22:30"),
        prediction: "Chelsea or Draw & Both Teams to Score",
        odds: "1.80",
        team1: { name: "Chelsea", analysis: "Strong attack but shaky defense.", form: "WDLWW" },
        team2: { name: "Opponent", analysis: "Capable of scoring but inconsistent results.", form: "DWLWL" },
        analysis: "Chelsea is likely to avoid defeat, but both teams are expected to score.",
        headToHead: "Chelsea 2-1 Opponent (Last Match)"
    }
];

module.exports = predictions;
