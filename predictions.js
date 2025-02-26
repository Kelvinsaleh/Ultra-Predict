// Convert EAT (UTC+3) to UTC
const convertToUTC = (time) => {
    const [date, eatTime] = time.split(', ');
    const [hours, minutes] = eatTime.split(':').map(Number);
    let utcHours = hours - 3;
    if (utcHours < 0) utcHours += 24;
    return `${date}, ${utcHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} UTC`;
};

// Predictions for February 26th Matches
const predictions = [
    {
        id: 19,
        match: "Juventus vs. Empoli",
        time: convertToUTC("26/02, 23:00"),
        prediction: "Juventus to Win",
        odds: "1.27",
        team1: { name: "Juventus", analysis: "Strong defensive unit and home advantage.", form: "WDWDD" },
        team2: { name: "Empoli", analysis: "Struggles against top teams.", form: "LDLWL" },
        analysis: "Juventus is expected to dominate and secure a win.",
        headToHead: "Juventus 2-0 Empoli (Last Match)"
    },
    {
        id: 20,
        match: "Tottenham vs. Manchester City",
        time: convertToUTC("26/02, 22:30"),
        prediction: "Draw or Manchester City &BTTS",
        odds: "1.86",
        team1: { name: "Tottenham", analysis: "Strong at home but missing key players.", form: "WLDWL" },
        team2: { name: "Manchester City", analysis: "Excellent form and title contenders.", form: "WWWDW" },
        analysis: "City's dominance makes them favorites, but Tottenham could snatch a draw.",
        headToHead: "Tottenham 1-3 Manchester City (Last Match)"
    },
    {
        id: 21,
        match: "Liverpool vs. Newcastle",
        time: convertToUTC("26/02, 23:15"),
        prediction: "Liverpool or Draw",
        odds: "1.18",
        team1: { name: "Liverpool", analysis: "One of the best home teams in Europe.", form: "WWDWW" },
        team2: { name: "Newcastle", analysis: "Defensive struggles in big matches.", form: "LWLDW" },
        analysis: "Liverpool's home form should secure at least a draw.",
        headToHead: "Liverpool 2-1 Newcastle (Last Match)"
    },
    {
        id: 22,
        match: "Brentford vs. Everton",
        time: convertToUTC("26/02, 22:30"),
        prediction: "Brentford or Draw",
        odds: "1.33",
        team1: { name: "Brentford", analysis: "Strong at home, tough to break down.", form: "WDLWW" },
        team2: { name: "Everton", analysis: "Struggles with consistency.", form: "LDLWL" },
        analysis: "Brentford has the advantage at home but Everton might put up a fight.",
        headToHead: "Brentford 1-1 Everton (Last Match)"
    },
    {
        id: 23,
        match: "Stade Briochin vs. Paris Saint-Germain",
        time: convertToUTC("26/02, 23:10"),
        prediction: "Paris Saint-Germain to Win",
        odds: "1.12",
        team1: { name: "Stade Briochin", analysis: "Lower-division team, huge challenge ahead.", form: "LLWDW" },
        team2: { name: "Paris Saint-Germain", analysis: "Elite squad and dominant in attack.", form: "WWWWW" },
        analysis: "PSG should win comfortably given the vast quality difference.",
        headToHead: "First competitive meeting"
    },
    {
        id: 24,
        match: "Nottingham Forest vs. Arsenal",
        time: convertToUTC("26/02, 22:30"),
        prediction: "Draw or Arsenal & Over 1.5 Goals",
        odds: "1.76",
        team1: { name: "Nottingham Forest", analysis: "Struggles defensively against top teams.", form: "DLLWL" },
        team2: { name: "Arsenal", analysis: "Strong attacking play and title contenders.", form: "WWDWW" },
        analysis: "Arsenal is likely to avoid defeat, and goals are expected.",
        headToHead: "Nottingham Forest 0-2 Arsenal (Last Match)"
    },
    {
        id: 25,
        match: "Manchester United vs. Ipswich",
        time: convertToUTC("26/02, 22:30"),
        prediction: "Manchester United or Draw & Over 1.5 Goals",
        odds: "1.41",
        team1: { name: "Manchester United", analysis: "Inconsistent but strong in attack.", form: "WDWLD" },
        team2: { name: "Ipswich", analysis: "Promising form but big step up in class.", form: "WWDWL" },
        analysis: "United is expected to get at least a draw with multiple goals in the match.",
        headToHead: "First competitive meeting in years"
    },
    {   id: 26,
        match:"PSV  Eindhoven vs. Go ahead Eagles",
         time: convertToUTC("26/02, 22:00"),
        prediction: "PSV Eindhoven to win ",
        odds: "1.21",
    },
    {
     id: 27,
        match:"Leipzig Vs. Wolfsburg",
         time: convertToUTC("26/02, 22:45"),
        prediction: "leipzig to win or Draw ",
        odds: "1.28",
    },
     {
     id: 28,
        match:"SI Benfica Vs. Sc Braga",
         time: convertToUTC("26/02, 23:45"),
        prediction: "Sl Benfica to win   CS 3:1 ",
        odds: "1.39",
        team1: { name: " Sl Benfica", : "", form: "WWWDW" },
        team2: { name: "Sc Braga", : form: "WWWDW" },
        analysis: "While we expext Braga to put up a fight  Benfica boasts a solid home record  and we see them coming with the desired result to reach the semi-finals.",
       
     },
      {
        id: 29,
        match: "Real Sociedad vs. Real Madrid",
        time: convertToUTC("26/02, 23:30"),
        prediction: "Draw or Real Madrid & Over 2.5 goals  ",
        odds: "2.44",
        team1: { name: "Real Sociedad", analysis: "Solid team but struggles against top opposition.", form: "WLDWD" },
        team2: { name: "Real Madrid", analysis: "Top form and experienced squad.", form: "WWWDW" },
        analysis: "Madrid has the quality to avoid defeat This is todays value bet.",
        headToHead: "Real Sociedad 1-2 Real Madrid (Last Match)"
    }
];

module.exports = predictions;
