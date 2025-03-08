
import pickle
import numpy as np

model = pickle.load(open("ml_model.pkl", "rb"))

def predict_match(stat1, stat2, stat3):
    features = np.array([stat1, stat2, stat3]).reshape(1, -1)
    return model.predict(features)[0]

print("Prediction system ready!")
