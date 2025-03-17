import mysql.connector
from config import API_KEY

# MySQL Configuration
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "ultrapredict",
}

def connect_db():
    return mysql.connector.connect(**DB_CONFIG)

def save_predictions():
    conn = connect_db()
    cursor = conn.cursor()
    with open("predictions.json", "r") as f:
        predictions = json.load(f)
    
    for fixture_id, result in predictions.items():
        cursor.execute("INSERT INTO predictions (fixture_id, result) VALUES (%s, %s)", (fixture_id, result))
    
    conn.commit()
    cursor.close()
    conn.close()
    print("Predictions saved to database.")

if __name__ == "__main__":
    save_predictions()
