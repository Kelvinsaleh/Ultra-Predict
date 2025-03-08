// Firebase configuration (Replace with your actual Firebase credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch predictions from Firestore
async function fetchPredictions() {
    const predictionsTable = document.getElementById("predictions-table");
    predictionsTable.innerHTML = ""; // Clear previous data

    try {
        const snapshot = await db.collection("predictions").get();

        snapshot.forEach(doc => {
            let data = doc.data();
            let row = predictionsTable.insertRow();
            row.insertCell(0).innerText = data.match_date;
            row.insertCell(1).innerText = data.home_team;
            row.insertCell(2).innerText = data.away_team;
            row.insertCell(3).innerText = data.prediction;
            row.insertCell(4).innerText = data.confidence + "%";
        });

    } catch (error) {
        console.error("Error fetching predictions:", error);
    }
}

// Load predictions when the page loads
document.addEventListener("DOMContentLoaded", fetchPredictions);
