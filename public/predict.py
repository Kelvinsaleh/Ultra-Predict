import json
import random

def predict_outcome(match):
    # Placeholder prediction logic (replace with ML model)
    return random.choice(["Home Win", "Draw", "Away Win"])

def generate_predictions():
    with open("matches.json", "r") as f:
        matches = json.load(f)
    
    predictions = {}
    for match in matches.get("response", []):
        fixture_id = match["fixture"]["id"]
        predictions[fixture_id] = predict_outcome(match)

    with open("predictions.json", "w") as f:
        json.dump(predictions, f, indent=4)
    print("Predictions generated.")

if __name__ == "__main__":
    generate_predictions()
