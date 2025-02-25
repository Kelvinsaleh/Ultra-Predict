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
    }
];

module.exports = predictions;
