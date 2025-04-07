
# 🩺 Diabetes Prediction App (ML + FastAPI + React)

This is a simple full-stack machine learning web application that predicts whether a person has diabetes based on medical data. It uses:

- 🔍 **Machine Learning (XGBoost)**
- ⚡ **FastAPI** as backend
- ⚛️ **React.js** frontend

---

## 📦 Features

✅ Predict diabetes using age, gender, BMI, blood sugar, and more  
✅ Clean user interface built with React  
✅ Fast and lightweight backend with FastAPI  
✅ Easy to run locally  

---

## 🚀 1. Clone the Repository

```bash
git clone https://github.com/eyo25/diabetes-prediction-app.git
cd diabetes-prediction-app
```

---

## 🧠 2. Backend (FastAPI + ML Model)

### 🔹 Setup Python environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 🔹 Train your model (if needed)

If you haven't trained the model yet, you can use or modify the `train_model.py` script:

```bash
python train_model.py
```

This will create a `model.pkl` file.

### 🔹 Start the FastAPI server

```bash
uvicorn main:app --reload
```

The API will be running at `http://127.0.0.1:8000`

You can test it by visiting:  
👉 `http://127.0.0.1:8000/docs` — (auto-generated Swagger UI)

---

## 🎨 3. Frontend (React App)

### 🔹 Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 🔹 Start the React development server

```bash
npm start
```

This will open:  
👉 `http://localhost:3000`

Fill the form, click **Predict**, and the app will tell you if you're likely diabetic.

---

## 🔄 4. Directory Structure

```
diabetes-prediction-app/
├── backend/
│   ├── main.py
│   ├── model.pkl
│   ├── train_model.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   └── DiabetesForm.jsx
│   └── package.json
└── README.md
```

---

## 🔐 5. API Request Format (for custom clients)

Make a `POST` request to:

```
http://127.0.0.1:8000/predict
```

### Example JSON body:

```json
{
  "gender": "Male",
  "age": 50,
  "hypertension": 1,
  "heart_disease": 0,
  "smoking_history": "never",
  "bmi": 28.5,
  "HbA1c_level": 6.3,
  "blood_glucose_level": 150
}
```

---

## 🌍 6. Deployment (optional)

You can deploy this to platforms like:

- **Render** or **Railway** for FastAPI backend  
- **Vercel** or **Netlify** for the React frontend

(Ask me if you need help setting this up)

---

## 💡 Credits

Built by [Eyosias Wondwossen](https://github.com/eyo25)

---

## 📬 Contact

If you found this helpful, feel free to ⭐ the repo or reach out with feedback!
