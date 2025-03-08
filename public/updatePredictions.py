# updatePredictions.py - Debugging Firestore Connection
import firebase_admin
from firebase_admin import credentials, firestore

try:
    cred = credentials.Certificate("serviceAccount.json")
    firebase_admin.initialize_app(cred)
except ValueError:
    print("Firebase app already initialized.")

db = firestore.client()

def update_prediction(prediction_id, new_data):
    try:
        print(f"Updating prediction {prediction_id} with data: {new_data}")
        doc_ref = db.collection("predictions").document(prediction_id)
        doc_ref.update(new_data)
        print(f"✅ Prediction {prediction_id} updated successfully.")
    except Exception as e:
        print(f"❌ Error updating prediction {prediction_id}: {e}")

if __name__ == "__main__":
    test_prediction_id = "some_prediction_id"
    new_data = {"odds": 1.50}  # Example update
    update_prediction(test_prediction_id, new_data)
