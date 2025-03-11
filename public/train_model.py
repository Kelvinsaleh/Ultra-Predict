import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1️⃣ Generate fake match data (features) and labels (0 or 1 for win/loss)
np.random.seed(42)  # For reproducibility
X = np.random.rand(500, 5)  # 500 samples, 5 features each
y = np.random.randint(0, 2, 500)  # 500 labels (0 or 1)

# 2️⃣ Split into training & testing data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3️⃣ Train a RandomForest model
model = RandomForestClassifier(n_estimators=50, random_state=42)
model.fit(X_train, y_train)

# 4️⃣ Test the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model trained with accuracy: {accuracy:.2f}")

# 5️⃣ Save the trained model as machine.pkl
with open("machine.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model saved as machine.pkl")

# 6️⃣ Load the model & test a sample prediction
def predict_match(features):
    """Load the model and make a prediction on new data"""
    with open("machine.pkl", "rb") as f:
        loaded_model = pickle.load(f)
    prediction = loaded_model.predict([features])
    return prediction[0]

# Example Prediction (random input)
sample_input = np.random.rand(5)
predicted_outcome = predict_match(sample_input)
print(f"🔮 Prediction for new match: {predicted_outcome}")
