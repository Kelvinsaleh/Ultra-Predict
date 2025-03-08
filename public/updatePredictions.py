 
import firebase_admin
from firebase_admin import credentials, firestore
import pickle
import numpy as np

cred = credentials.Certificate("firebase_credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load trained ML model
model = pickle.load(open("ml_model.pkl", "rb"))

def predict_matches():
    matches_ref = db.collection("matches").stream()
    for match in matches_ref:
        data = match.to_dict()
        features = np.array([data['stat1'], data['stat2'], data['stat3']])  # Replace with actual stats
        prediction = model.predict([features])[0]
        db.collection("predictions").document(match.id).set({"prediction": prediction})
    print("Predictions updated")

predict_matches()
