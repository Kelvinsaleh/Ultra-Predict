import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Use the API URL from .env instead of hardcoding
API_URL = os.getenv("API_URL")

def fetch_data():
    try:
        response = requests.get(API_URL)
        response.raise_for_status()  # Raise an error for HTTP failures
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)
        return None

if __name__ == "__main__":
    fetched_data = fetch_data()
    if fetched_data:
        print("Fetched Data:", fetched_data)
