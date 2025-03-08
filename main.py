import requests
import json
from predict import predict_match  # Assuming you have a `predict.py` file

# Your API key
API_KEY = "d5a624a78e958cdc1373754ad2b89950"  # Replace with your actual key
BASE_URL = "https://v3.football.api-sports.io"  # Adjust if necessary

HEADERS = {
    "x-apisports-key": API_KEY
}

def fetch_matches():
    """Fetch today's football matches from API."""
    url = f"{BASE_URL}/fixtures?date=2025-03-08"  # Replace with dynamic date logic
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        data = response.json()
        return data["response"]  # Extract match data
    else:
        print("Error fetching matches:", response.text)
        return []

def process_matches(matches):
    """Process match data and predict outcomes."""
    predictions = []
    
    for match in matches:
        home_team = match["teams"]["home"]["name"]
        away_team = match["teams"]["away"]["name"]
        
        prediction = predict_match(home_team, away_team)  # Call your ML model
        predictions.append({
            "home": home_team,
            "away": away_team,
            "prediction": prediction
        })
    
    return predictions

def main():
    print("Fetching matches...")
    matches = fetch_matches()
    
    if not matches:
        print("No matches found.")
        return
    
    print("Processing matches...")
    predictions = process_matches(matches)
    
    print("\nPredictions:")
    for p in predictions:
        print(f"{p['home']} vs {p['away']} -> {p['prediction']}")

if __name__ == "__main__":
    main()
