import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
import json

# Load .env file
load_dotenv()

# Initialize Firebase
cred = credentials.Certificate(os.getenv("FIREBASE_SERVICE_ACCOUNT"))
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load Predictions from JSON
with open("public/predictions.json", "r") as f:
    predictions = json.load(f)

# Push to Firestore
collection_ref = db.collection("predictions")

for match_id, prediction in predictions.items():
    doc_ref = collection_ref.document(match_id)
    doc_ref.set(prediction)

print("Predictions updated in Firestore.")
