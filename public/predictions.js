document.addEventListener("DOMContentLoaded", function () {
    const predictions = [
        {
            date: "02/03",
            time: "16:30",
            match: "Almere City FC vs. Ajax Amsterdam",
            prediction: "Ajax Amsterdam",
            odds: "1.45"
        },
        {
            date: "02/03",
            time: "18:15",
            match: "Barcelona vs. Real Sociedad",
            prediction: "Barcelona",
            odds: "1.30"
        },
        {
            date: "02/03",
            time: "16:45",
            match: "Newcastle vs. Brighton",
            prediction: "Over 1.5",
            odds: "1.19"
        },
        {
            date: "02/03",
            time: "19:30",
            match: "Manchester United vs. Fulham",
            prediction: "Over 1.5",
            odds: "1.26"
        },
        {
            date: "02/03",
            time: "16:00",
            match: "Kasimpasa Istanbul vs. Galatasaray Istanbul",
            prediction: "Both Teams to Score (Yes)",
            odds: "1.50"
        },
        {
            date: "02/03",
            time: "20:30",
            match: "Fenerbahce Istanbul vs. Antalyaspor",
            prediction: "Over 2.5",
            odds: "1.53"
        },
        {
            date: "02/03",
            time: "18:30",
            match: "Boavista Porto vs. Santa Clara Azores",
            prediction: "Under 2.5",
            odds: "1.48"
        },
        {
            date: "02/03",
            time: "14:30",
            match: "AC Monza vs. Torino FC",
            prediction: "Under 2.5",
            odds: "1.62"
        },
        {
            date: "02/03",
            time: "22:45",
            match: "AC Milan vs. Lazio Rome",
            prediction: "Both Teams to Score (Yes)",
            odds: "1.68"
        },
        {
            date: "02/03",
            time: "21:00",
            match: "Rapid Bucuresti 1923 vs. Fotbal Club FCSB",
            prediction: "Under 2.5",
            odds: "1.59"
        },
        {
            date: "02/03",
            time: "20:00",
            match: "AS Roma vs. Como 1907",
            prediction: "AS Roma",
            odds: "2.02"
        },
        {
            date: "02/03",
            time: "19:15",
            match: "Montpellier HSC vs. Stade Rennes",
            prediction: "Stade Rennes",
            odds: "2.09"
        },
        {
            date: "02/03",
            time: "20:00",
            match: "Aalborg BK vs. FC Copenhagen",
            prediction: "FC Copenhagen",
            odds: "1.49"
        }
    ];

    const predictionsTable = document.getElementById("predictions-table");

    predictions.forEach(prediction => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${prediction.date}, ${prediction.time}</td>
            <td>${prediction.match}</td>
            <td>${prediction.prediction}</td>
            <td>${prediction.odds}</td>
        `;

        predictionsTable.appendChild(row);
    });
});
