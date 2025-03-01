// Convert EAT (UTC+3) to UTC
const convertToUTC = (time) => {
    const [date, eatTime] = time.split(', ');
    const [hours, minutes] = eatTime.split(':').map(Number);
    let utcHours = hours - 3;
    if (utcHours < 0) utcHours += 24;
    return `${date}, ${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} UTC`;
};

// Predictions for March 1st Matches
const predictions = [
    {
        id: 49,
        match: "Mamelodi Sundowns vs. Kaizer Chiefs",
        time: convertToUTC("01/03, 16:30"),
        prediction: "1X2 • Mamelodi Sundowns",
        odds: "1.45",
    },
    {
        id: 50,
        match: "Buckley Town vs. Denbigh Town",
        time: convertToUTC("01/03, 17:00"),
        prediction: "BOTH TEAMS TO SCORE (GG/NG) • Yes",
        odds: "1.35",
    },
    {
        id: 51,
        match: "Dundee FC vs. St Johnstone FC",
        time: convertToUTC("01/03, 18:00"),
        prediction: "BOTH TEAMS TO SCORE (GG/NG) • Yes",
        odds: "1.76",
    },
    {
        id: 52,
        match: "Go Ahead Eagles vs. PSV Eindhoven",
        time: convertToUTC("01/03, 20:45"),
        prediction: "BOTH TEAMS TO SCORE (GG/NG) • Yes",
        odds: "1.50",
    }
];

module.exports = predictions;
