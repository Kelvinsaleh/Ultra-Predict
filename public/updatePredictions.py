# updatePredictions.py - Corrected
import firebase_admin
from firebase_admin import credentials, firestore

# Load Firebase credentials
cred = credentials.Certificate("serviceAccount.json")  # Ensure this file exists
firebase_admin.initialize_app(cred)

db = firestore.client()

# Fetch matches from Firestore
matches_ref = db.collection("matches").stream()

for match in matches_ref:
    match_data = match.to_dict()
    print("Match ID:", match.id, "Data:", match_data)
