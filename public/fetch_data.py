import requests
import json

API_KEY = "your_api_key"  # Replace with your actual API key
URL = "https://v3.football.api-sports.io/fixtures"

params = {
    "league": "39",  # Example: English Premier League
    "season": "2024",
}

headers = {"x-apisports-key": API_KEY}

def fetch_matches():
    response = requests.get(URL, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if "response" in data:
            with open("matches.json", "w") as f:
                json.dump(data["response"], f, indent=4)
            print("Match data fetched successfully.")
        else:
            print("Error: Unexpected API response format.")
    else:
        print(f"Failed to fetch match data. Status: {response.status_code}, Error: {response.text}")

if __name__ == "__main__":
    fetch_matches()
