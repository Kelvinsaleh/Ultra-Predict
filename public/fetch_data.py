import requests
import json
from config import API_KEY

# API endpoint
URL = "https://api-football.com/demo/v3/fixtures"

# Parameters
params = {
    "league": "39",  # EPL example
    "season": "2024",
}

headers = {"x-apisports-key": API_KEY}

def fetch_matches():
    response = requests.get(URL, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        with open("matches.json", "w") as f:
            json.dump(data, f, indent=4)
        print("Match data fetched successfully.")
    else:
        print("Failed to fetch match data.")

if __name__ == "__main__":
    fetch_matches()
