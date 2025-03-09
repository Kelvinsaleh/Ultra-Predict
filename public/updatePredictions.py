import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccount.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def save_prediction(prediction_id, data):
    try:
        doc_ref = db.collection("predictions").document(prediction_id)
        doc_ref.set(data)  # Use set() instead of update()
        print(f"✅ Prediction {prediction_id} saved successfully.")
    except Exception as e:
        print("❌ Error saving prediction:", e)

if __name__ == "__main__":
    test_prediction_id = "chelsea_vs_liverpool"
    new_data = {
        "match_date": "2025-03-10",
        "home_team": "Chelsea",
        "away_team": "Liverpool",
        "prediction": "Over 2.5",
        "odds": 1.75
    }
    save_prediction(test_prediction_id, new_data)

