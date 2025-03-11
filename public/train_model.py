import os
import json
import pickle
import numpy as np
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load environment variables from .env
load_dotenv()

# Initialize Firebase
if not firebase_admin._apps:
    cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT")  # Get JSON path from .env
    with open(cred_path) as f:
        cred_dict = json.load(f)
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

# Function to save predictions to Firestore
def save_prediction(match_id, prediction):
    doc_ref = db.collection("predictions").document(str(match_id))
    doc_ref.set({"prediction": prediction})
    print(f"✅ Prediction {prediction} saved for match {match_id}")

# 1️⃣ Generate random training data (features & labels)
np.random.seed(42)  # Ensure reproducibility
X = np.random.rand(500, 5)  # 500 samples, 5 features each
y = np.random.randint(0, 2, 500)  # Binary labels (0 or 1)

# 2️⃣ Split into training & testing data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3️⃣ Train a RandomForest model
model = RandomForestClassifier(n_estimators=50, random_state=42)
model.fit(X_train, y_train)

# 4️⃣ Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model trained with accuracy: {accuracy:.2f}")

# 5️⃣ Save the trained model as machine.pkl
with open("machine.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model saved as machine.pkl")

# 6️⃣ Load the model & make a test prediction
def predict_match(features):
    """Load the model and make a prediction on new data"""
    with open("machine.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    prediction = loaded_model.predict([features])
    return prediction[0]

# 7️⃣ Make an automatic prediction and save to Firestore
sample_input = np.random.rand(5)
predicted_outcome = predict_match(sample_input)
save_prediction("auto_match", int(predicted_outcome))

print(f"🔮 Automatic prediction saved: {predicted_outcome}")
