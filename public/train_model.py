
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier

data = pd.read_csv("historical_matches.csv")  # Replace with actual dataset
X = data[['stat1', 'stat2', 'stat3']]  # Replace with actual feature columns
y = data['outcome']

model = RandomForestClassifier()
model.fit(X, y)

pickle.dump(model, open("ml_model.pkl", "wb"))
print("Model trained and saved!")
