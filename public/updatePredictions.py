// Import Firebase configuration
import firebaseConfig from './firebaseConfig.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/**
 * Update or add a prediction in Firestore
 * @param {string} predictionId - Unique ID for the prediction (e.g., "chelsea_vs_liverpool_over_2.5")
 * @param {object} newData - The new prediction data
 */
async function updatePrediction(predictionId, newData) {
    try {
        const docRef = db.collection("predictions").doc(predictionId);
        await docRef.set(newData, { merge: true }); // Merge to avoid overwriting other fields

        console.log(`Prediction ${predictionId} updated successfully.`);
    } catch (error) {
        console.error("Error updating prediction:", error);
    }
}

// Example usage:
const testPredictionId = "chelsea_vs_liverpool_over_2.5";
const newPredictionData = {
    match_date: "2025-03-09",
    home_team: "Chelsea",
    away_team: "Liverpool",
    prediction: "Over 2.5",
    odds: 1.75
};

// Call the function to update Firestore
updatePrediction(testPredictionId, newPredictionData);
