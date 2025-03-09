import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate("serviceAccount.json")  # Ensure this file exists
firebase_admin.initialize_app(cred)

db = firestore.client()

# Function to save predictions to Firestore
def save_prediction(prediction_data):
    try:
        db.collection("predictions").add(prediction_data)
        print(f"✅ Saved prediction: {prediction_data}")
    except Exception as e:
        print("❌ Error saving prediction:", e)

# Function to generate and save machine predictions
def generate_predictions():
    predictions = [
        {
            "match_date": "2025-03-09",
            "home_team": "Chelsea",
            "away_team": "Liverpool",
            "prediction": "Over 2.5",
            "odds": 1.75
        },
        {
            "match_date": "2025-03-09",
            "home_team": "Man City",
            "away_team": "Arsenal",
            "prediction": "Both Teams To Score",
            "odds": 1.90
        }
    ]
    
    # Save each prediction to Firestore
    for pred in predictions:
        save_prediction(pred)

if __name__ == "__main__":
    generate_predictions()
