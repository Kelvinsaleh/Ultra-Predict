# predict.py - Handles Missing Firestore Data
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate("serviceAccount.json")  # Ensure this file exists
firebase_admin.initialize_app(cred)

db = firestore.client()

def get_predictions():
    try:
        predictions_ref = db.collection("predictions").stream()
        predictions = [prediction.to_dict() for prediction in predictions_ref]

        if not predictions:
            print("No predictions found in Firestore.")

        for prediction in predictions:
            print("Prediction:", prediction)
    except Exception as e:
        print("Error fetching predictions:", e)

if __name__ == "__main__":
    get_predictions()
