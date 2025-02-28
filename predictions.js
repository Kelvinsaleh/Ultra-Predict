// Convert EAT (UTC+3) to UTC
const convertToUTC = (time) => {
    const [date, eatTime] = time.split(', ');
    const [hours, minutes] = eatTime.split(':').map(Number);
    let utcHours = hours - 3;
    if (utcHours < 0) utcHours += 24;
    return `${date}, ${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} UTC`;
};

// Predictions for February 27th and 28th Matches
const predictions = [
    {
        id: 31,
        match: "Istra 1961 vs. NK Lokomotiva",
        time: convertToUTC("27/02, 18:00"),
        prediction: "X2",
        odds: "1.50",
    },
    {
        id: 32,
        match: "Valladolid vs. Las Palmas",
        time: convertToUTC("27/02, 21:00"),
        prediction: "X2",
        odds: "1.60",
    },
    {
        id: 33,
        match: "Jong Utrecht vs. Jong Ajax",
        time: convertToUTC("27/02, 20:00"),
        prediction: "X2",
        odds: "1.55",
    },
    {
        id: 34,
        match: "Dordrecht vs. Emmen",
        time: convertToUTC("27/02, 20:00"),
        prediction: "1X",
        odds: "1.50",
    },
    {
        id: 35,
        match: "FC Volendam vs. Helmond Sport",
        time: convertToUTC("27/02, 20:00"),
        prediction: "1X",
        odds: "1.45",
    },
    {
        id: 36,
        match: "Jong PSV vs. De Graafschap",
        time: convertToUTC("27/02, 20:00"),
        prediction: "X2",
        odds: "1.50",
    },
    {
        id: 37,
        match: "Cambuur vs. VVV Venlo",
        time: convertToUTC("27/02, 20:00"),
        prediction: "1",
        odds: "1.55",
    },
    {
        id: 38,
        match: "Prestatyn vs. Holywell",
        time: convertToUTC("27/02, 20:45"),
        prediction: "2",
        odds: "1.70",
    },
    {
        id: 39,
        match: "Caerau (Ely) vs. Taffs Well",
        time: convertToUTC("27/02, 20:30"),
        prediction: "1X",
        odds: "1.50",
    },
    {
        id: 40,
        match: "Cambrian vs. Trefelin",
        time: convertToUTC("27/02, 20:45"),
        prediction: "+1.5 Goals",
        odds: "1.40",
    },
    {
        id: 41,
        match: "Goytre United vs. Llanelli",
        time: convertToUTC("27/02, 20:30"),
        prediction: "2",
        odds: "1.60",
    },
    {
        id: 42,
        match: "Makhachkala vs. Lokomotiv Moscow",
        time: convertToUTC("27/02, 17:00"),
        prediction: "X2",
        odds: "1.55",
    },
    {
        id: 43,
        match: "Charleroi vs. Genk",
        time: convertToUTC("27/02, 20:45"),
        prediction: "X2",
        odds: "1.50",
    },
    {
        id: 44,
        match: "Waalwijk vs. Fortuna Sittard",
        time: convertToUTC("27/02, 20:00"),
        prediction: "+1.5 Goals",
        odds: "1.35",
    },
    {
        id: 45,
        match: "Stuttgart vs. Bayern Munich",
        time: convertToUTC("28/02, 22:30"),
        prediction: "2",
        odds: "1.69",
    },
    {
        id: 46,
        match: "Aston Villa vs. Cardiff",
        time: convertToUTC("28/02, 23:00"),
        prediction: "1",
        odds: "1.20",
    },
    {
        id: 47,
        match: "AS Monaco vs. Stade Reims",
        time: convertToUTC("28/02, 22:45"),
        prediction: "1X2 • AS Monaco",
        odds: "1.35",
    },
    {
        id: 48,
        match: "Sheffield Wednesday vs. Sunderland",
        time: convertToUTC("28/02, 23:00"),
        prediction: "TOTAL • Over 1.5",
        odds: "1.35",
    }
];

module.exports = predictions;
