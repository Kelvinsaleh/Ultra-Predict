import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import firebase_admin
from firebase_admin import credentials, firestore
import json
import os
import dotenv

dotenv.load_dotenv()

# Load Firebase credentials from .env
firebase_creds = json.loads(os.getenv("FIREBASE_CREDENTIALS"))
cred = credentials.Certificate(firebase_creds)
firebase_admin.initialize_app(cred)
db = firestore.client()

def train_model():
    df = pd.read_csv("match_data.csv").dropna()
    X = df[['home_team_rank', 'away_team_rank', 'home_form', 'away_form', 'odds_home', 'odds_draw', 'odds_away']]
    y = df['result']

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    joblib.dump(model, "football_model.pkl")
    print("✅ Model trained!")

def predict_matches():
    model = joblib.load("football_model.pkl")
    with open("upcoming_matches.csv") as f:
        upcoming_matches = json.load(f)

    predictions = []
    for match in upcoming_matches:
        X_input = np.array([[match['home_team_rank'], match['away_team_rank'], match['home_form'], match['away_form'], match['odds_home'], match['odds_draw'], match['odds_away']]])
        pred = model.predict(X_input)[0]
        
        predictions.append({
            "date": match['date'],
            "teams": f"{match['home_team']} vs {match['away_team']}",
            "prediction": "Win" if pred == 2 else "Draw" if pred == 1 else "Loss",
            "odds": match['odds_home'] if pred == 2 else match['odds_draw'] if pred == 1 else match['odds_away']
        })

    db.collection("predictions").document("latest").set({"matches": predictions})
    print("✅ Predictions uploaded!")

if __name__ == "__main__":
    train_model()
    predict_matches()
