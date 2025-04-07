from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import xgboost as xgb
from fastapi.middleware.cors import CORSMiddleware

# Load the model properly
model = xgb.Booster()
model.load_model("./diabetes_model.json")  # Load from JSON format

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Define request model
class DiabetesInput(BaseModel):
    gender: int 
    age: float
    bmi: float
    hypertension: int
    heart_disease: int
    smoking_history: int
    hba1c_level: float
    blood_glucose_level: float  # Corrected to match request body

@app.get("/")
def home():
    return {"message": "Diabetes Prediction API is running!"}

@app.post("/predict")
def predict_diabetes(data: DiabetesInput):
    print(f"Received Data: {data.dict()}")  # Debugging log

    # Create a dictionary with feature names matching the trained model
    features_dict = {
        "gender": data.gender,
        "age": data.age,
        "hypertension": data.hypertension,
        "heart_disease": data.heart_disease,
        "smoking_history": data.smoking_history,
        "bmi": data.bmi,
        "HbA1c_level": data.hba1c_level,  # Fix name
        "blood_glucose_level": data.blood_glucose_level,  # Fix name
    }

    # Convert to DMatrix with explicit feature names
    dmatrix = xgb.DMatrix(np.array([list(features_dict.values())]), feature_names=list(features_dict.keys()))

    # Make prediction
    prediction = model.predict(dmatrix)
    
    return {"prediction": int(prediction[0] > 0.5)}
