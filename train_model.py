# train_model.py - Fixed
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate("serviceAccount.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Dummy training data
X_train = np.array([[1, 2], [2, 3], [3, 4]])
y_train = np.array([0, 1, 1])

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

print("Model trained successfully!")
