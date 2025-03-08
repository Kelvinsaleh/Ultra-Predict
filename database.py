import sqlite3

# Database file
DB_FILE = "ultrapredict.db"

def create_tables():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Create Matches table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS matches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            match_id INTEGER UNIQUE,
            home_team TEXT,
            away_team TEXT,
            prediction TEXT,
            confidence REAL,
            match_date TEXT
        )
    """)

    conn.commit()
    conn.close()

def insert_prediction(match_id, home_team, away_team, prediction, confidence, match_date):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO matches (match_id, home_team, away_team, prediction, confidence, match_date)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(match_id) DO UPDATE SET
        prediction = excluded.prediction,
        confidence = excluded.confidence,
        match_date = excluded.match_date
    """, (match_id, home_team, away_team, prediction, confidence, match_date))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_tables()
    print("Database initialized successfully!")
