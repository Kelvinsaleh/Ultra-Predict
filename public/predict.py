import torch  # If using PyTorch
import joblib  # If using scikit-learn
import os

# Load the appropriate model type
def load_model():
    model_path_pytorch = "public/model.pth"
    model_path_sklearn = "public/model.pkl"

    if os.path.exists(model_path_pytorch):
        model = torch.load(model_path_pytorch, map_location=torch.device('cpu'))
        model.eval()
        print("Loaded PyTorch model.")
        return model
    elif os.path.exists(model_path_sklearn):
        model = joblib.load(model_path_sklearn)
        print("Loaded Scikit-learn model.")
        return model
    else:
        raise FileNotFoundError("No valid model found!")

# Load the model
model = load_model()

# Example prediction function (modify based on your model)
def predict(input_data):
    if isinstance(model, torch.nn.Module):
        with torch.no_grad():
            return model(torch.tensor(input_data)).numpy()
    else:
        return model.predict([input_data])

