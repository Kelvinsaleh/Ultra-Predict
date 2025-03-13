// fetchPredictions.js (Updated: Fetch from Firebase Database)

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('/firebase-config');
        const config = await response.json();
        firebase.initializeApp(config);
        const db = firebase.firestore();

        // Fetch free predictions
        const predictionsRef = db.collection('predictions').doc('latest');
        const doc = await predictionsRef.get();
        if (doc.exists) {
            const predictions = doc.data().matches;
            const table = document.getElementById("predictionsTable");
            predictions.forEach(match => {
                let row = table.insertRow();
                row.insertCell(0).innerText = match.match;
                row.insertCell(1).innerText = match.prediction;
            });
        }

        // Fetch VIP predictions (if logged in)
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                document.getElementById("vipPredictionsTable").style.display = "block";
                const vipTable = document.getElementById("vipPredictionsTable");
                const vipDoc = await db.collection('vip_predictions').doc('latest').get();
                if (vipDoc.exists) {
                    const vipPredictions = vipDoc.data().matches;
                    vipPredictions.forEach(match => {
                        let row = vipTable.insertRow();
                        row.insertCell(0).innerText = match.match;
                        row.insertCell(1).innerText = match.vipTip;
                    });
                }
            }
        });
    } catch (error) {
        console.error("Error fetching predictions:", error);
    }
});
