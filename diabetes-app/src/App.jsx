import { useState } from "react";

export default function DiabetesForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    bmi: "",
    hypertension: "",
    heart_disease: "",
    smoking_history: "",
    hba1c: "",
    glucose: ""
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Encode gender and smoking history
    const genderBinary = formData.gender === "Male" ? 1 : 0;
  
    const smokingMap = {
      "never": 0,
      "former": 1,
      "current": 2,
      "not current": 3,
      "ever": 4,
      "No Info": 5
    };
  
    const smokingLower = formData.smoking_history.trim().toLowerCase();
    const smokingEncoded = smokingMap[smokingLower] ?? 5; // default to "No Info" if not matched
  
    // Build the data object with correct field names and types
    const requestData = {
      gender: genderBinary,
      age: parseFloat(formData.age),
      bmi: parseFloat(formData.bmi),
      hypertension: parseInt(formData.hypertension),
      heart_disease: parseInt(formData.heart_disease),
      smoking_history: smokingEncoded,
      hba1c_level: parseFloat(formData.hba1c),
      blood_glucose_level: parseFloat(formData.glucose)
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from backend:", errorData);
        return;
      }
  
      const data = await response.json();
      setPrediction(data.diabetes_risk >= 0.5 ? 1 : 0); // assume threshold 0.5
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Diabetes Prediction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="gender" onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="number" step="0.1" name="bmi" placeholder="BMI" onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="hypertension" onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Hypertension</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <select name="heart_disease" onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Heart Disease</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <select name="smoking_history" onChange={handleChange} className="w-full p-2 border rounded" required>
  <option value="">Smoking History</option>
  <option value="never">Never</option>
  <option value="former">Former</option>
  <option value="current">Current</option>
  <option value="not current">Not Current</option>
  <option value="ever">Ever</option>
  <option value="No Info">No Info</option>
</select>

          <input type="number" step="0.1" name="hba1c" placeholder="HbA1c Level" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="glucose" placeholder="Blood Glucose Level" onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Predict</button>
        </form>
        {prediction !== null && (
          <p className="text-center mt-4 font-bold">Prediction: {prediction === 1 ? "Diabetic" : "Non-Diabetic"}</p>
        )}
      </div>
    </div>
  );
}

