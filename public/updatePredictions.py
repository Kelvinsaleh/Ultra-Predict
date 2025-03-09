# updatePredictions.py - Ensures Firestore Connection
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccount.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def update_prediction(prediction_id, new_data):
    try:
        doc_ref = db.collection("predictions").document(prediction_id)
        doc_ref.set(new_data, merge=True)  # 🔥 Use set() instead of update() to create if missing
        print(f"Prediction {prediction_id} updated successfully.")
    except Exception as e:
        print("Error updating prediction:", e)

if __name__ == "__main__":
    test_prediction_id = "chelsea_vs_liverpool_over_2.5"
    new_data = {
        "match_date": "2025-03-10",
        "home_team": "Chelsea",
        "away_team": "Liverpool",
        "prediction": "Over 2.5",
        "odds": 1.75,
        "confidence": 85
    }
    update_prediction(test_prediction_id, new_data)
