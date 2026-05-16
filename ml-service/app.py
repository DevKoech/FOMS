from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("model.pkl")

@app.route("/predict", methods = ["POST"])
def predict():
    data = request.json

    features = np.array([[
        data["nitrogen"],
        data["phosphorus"],
        data["potassium"],
        data["temperature"],
        data["humidity"],
        data["ph"],
        data["rainfall"],
    ]])

    prediction = model.predict(features)[0]

    return jsonify({
        "recommended_crop": prediction
    })

if __name__ == "__main__":
    app.run(port = 5001, debug = True)