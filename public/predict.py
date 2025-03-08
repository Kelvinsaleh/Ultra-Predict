import json
import random
from google.cloud import firestore

# Initialize Firestore
db = firestore.Client()

def predict_outcome(match):
    """ Placeholder prediction logic (replace with ML model) """
    return random.choice(["Home Win", "Draw", "Away Win"])

def generate_predictions():
    """ Generates predictions and stores them in Firestore """
    with open("matches.json", "r") as f:
        matches = json.load(f)
    
    predictions = {}
    for match in matches.get("response", []):
        fixture_id = match["fixture"]["id"]
        prediction = predict_outcome(match)
        predictions[fixture_id] = prediction

        # Store in Firestore
        doc_ref = db.collection("predictions").document(str(fixture_id))
        doc_ref.set({
            "fixture_id": fixture_id,
            "prediction": prediction
        })

    # Save locally
    with open("predictions.json", "w") as f:
        json.dump(predictions, f, indent=4)
    
    print("Predictions stored in Firestore and saved locally.")

if __name__ == "__main__":
    generate_predictions()
