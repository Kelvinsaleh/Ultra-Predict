// Import Firebase configuration
import firebaseConfig from './firebaseConfig.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch predictions from Firestore and display them
async function fetchPredictions() {
    const predictionsTable = document.getElementById("predictions-table");
    predictionsTable.innerHTML = ""; // Clear previous data

    try {
        const snapshot = await db.collection("predictions").get();

        if (snapshot.empty) {
            console.log("No predictions found.");
            predictionsTable.innerHTML = "<tr><td colspan='5'>No predictions available.</td></tr>";
            return;
        }

        snapshot.forEach(doc => {
            let data = doc.data();
            console.log("Fetched Data:", data);  // Debugging output

            let row = predictionsTable.insertRow();
            row.insertCell(0).innerText = data.match_date || "N/A";
            row.insertCell(1).innerText = data.home_team || "N/A";
            row.insertCell(2).innerText = data.away_team || "N/A";
            row.insertCell(3).innerText = data.prediction || "N/A";
            row.insertCell(4).innerText = (data.confidence ? data.confidence + "%" : "N/A");
        });

    } catch (error) {
        console.error("Error fetching predictions:", error);
        predictionsTable.innerHTML = "<tr><td colspan='5'>Error loading predictions.</td></tr>";
    }
}

// Load predictions when the page loads
document.addEventListener("DOMContentLoaded", fetchPredictions);
