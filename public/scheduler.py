
import schedule
import time
import os

def update_data():
    os.system("node fetchMatches.js")
    os.system("python updatePredictions.py")

schedule.every().day.at("06:00").do(update_data)

while True:
    schedule.run_pending()
    time.sleep(60)
