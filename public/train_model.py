import pickle
import numpy as np
import firebase_admin
from firebase_admin import credentials, firestore
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 🔥 1️⃣ Initialize Firebase
try:
    firebase_admin.get_app()
except ValueError:
    cred = credentials.Certificate("serviceAccount.json")  # Ensure this file exists!
    firebase_admin.initialize_app(cred)

db = firestore.client()

# 🔄 2️⃣ Generate Fake Match Data (features) and Labels (0 or 1 for win/loss)
np.random.seed(42)
X = np.random.rand(500, 5)  # 500 samples, 5 features each
y = np.random.randint(0, 2, 500)  # 500 labels (0 or 1)

# 🏋️‍♂️ 3️⃣ Split Data for Training & Testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 🤖 4️⃣ Train a RandomForest Model
model = RandomForestClassifier(n_estimators=50, random_state=42)
model.fit(X_train, y_train)

# 🎯 5️⃣ Test Model Accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model trained with accuracy: {accuracy:.2f}")

# 💾 6️⃣ Save the Trained Model as `machine.pkl`
with open("machine.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model saved as machine.pkl")

# 🔮 7️⃣ Load Model & Predict Matches
def predict_match(features):
    """Load the trained model and make a prediction."""
    with open("machine.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    prediction = loaded_model.predict([features])[0]
    return prediction

# 🔥 8️⃣ Fetch New Matches from Firestore, Predict, and Save
def process_new_matches():
    matches_ref = db.collection("matches")
    docs = matches_ref.where("predicted", "==", False).stream()  # Get unpredicted matches

    for doc in docs:
        data = doc.to_dict()
        match_id = doc.id  # Firestore match document ID

        if "features" in data:
            features = np.array(data["features"]).reshape(1, -1)
            prediction = predict_match(features)

            # 🔥 Save Prediction in Firestore
            db.collection("predictions").document(match_id).set({
                "prediction": str(prediction),
                "confidence": 0.9,  # Placeholder confidence score
                "timestamp": firestore.SERVER_TIMESTAMP
            })
            # ✅ Mark Match as Predicted
            db.collection("matches").document(match_id).update({"predicted": True})

            print(f"✅ Prediction saved for match {match_id}: {prediction}")

# 🔄 Run Predictions
process_new_matches()
