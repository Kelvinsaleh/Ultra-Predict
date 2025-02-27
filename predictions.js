// Convert EAT (UTC+3) to UTC
const convertToUTC = (time) => {
    const [date, eatTime] = time.split(', ');
    const [hours, minutes] = eatTime.split(':').map(Number);
    let utcHours = hours - 3;
    if (utcHours < 0) utcHours += 24;
    return `${date}, ${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} UTC`;
};

// Predictions for February 27th Matches
const predictions = [
    {
        id: 31,
        match: "Gaziantep vs. Fenerbahce Istanbul",
        time: convertToUTC("27/02, 16:00"),
        prediction: "Fenerbahce Istanbul to Win",
        odds: "1.64",
    },
    {
        id: 32,
        match: "Al-Gharafa SC vs. Al Sadd SC",
        time: convertToUTC("27/02, 16:45"),
        prediction: "Both Teams to Score (BTTS) - Yes",
        odds: "1.33",
    },
    {
        id: 33,
        match: "Kasimpasa Istanbul vs. Goztepe Izmir",
        time: convertToUTC("27/02, 16:00"),
        prediction: "Total Over 2.5 Goals",
        odds: "1.29",
    },
    {
        id: 34,
        match: "Al Arabi vs. Al Nasr",
        time: convertToUTC("27/02, 19:05"),
        prediction: "Total Over 1.5 Goals",
        odds: "1.20",
    },
    {
        id: 35,
        match: "Qarabag FK vs. Sabail FK",
        time: convertToUTC("27/02, 15:00"),
        prediction: "Total Over 2.5 Goals",
        odds: "1.29",
    },
    {
        id: 36,
        match: "Pardubice vs. Plzen",
        time: convertToUTC("27/02, 20:00"),
        prediction: "Pardubice to Win",
        odds: "1.55",
    },
    {
        id: 37,
        match: "Tataouine vs. Gafsa",
        time: convertToUTC("27/02, 16:00"),
        prediction: "Total Under 3.5 Goals",
        odds: "1.16",
    },
    {
        id: 38,
        match: "Heracles Almelo vs. AZ Alkmaar",
        time: convertToUTC("27/02, 22:00"),
        prediction: "Total Over 2.5 Goals",
        odds: "1.82",
    },
    {
        id: 39,
        match: "Gil Vicente Barcelos vs. Sporting Lisbon",
        time: convertToUTC("27/02, 23:45"),
        prediction: "Sporting Lisbon to Win",
        odds: "1.44",
    },
    {
        id: 40,
        match: "Bologna FC vs. AC Milan",
        time: convertToUTC("27/02, 22:45"),
        prediction: "Both Teams to Score (BTTS) - Yes",
        odds: "1.77",
    },
    {
        id: 41,
        match: "West Ham vs. Leicester",
        time: convertToUTC("27/02, 23:00"),
        prediction: "Both Teams to Score (BTTS) - Yes",
        odds: "1.77",
    }
];

module.exports = predictions;
