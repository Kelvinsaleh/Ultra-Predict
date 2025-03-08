# updatePredictions.py - Ensures Firestore Connection

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccount.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def update_prediction(prediction_id, new_data):
    try:
        doc_ref = db.collection("predictions").document(prediction_id)
        doc_ref.update(new_data)
        print(f"Prediction {prediction_id} updated successfully.")
    except Exception as e:
        print("Error updating prediction:", e)

if __name__ == "__main__":
    test_prediction_id = "some_prediction_id"
    new_data = {"odds": 1.50}  # Example update
    update_prediction(test_prediction_id, new_data)
