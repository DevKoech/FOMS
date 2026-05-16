import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("dataset.csv")

x = df.drop("label", axis = 1)
y = df["label"]

x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size = 0.2, random_state = 42
)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(x_train, y_train)


joblib.dump( model, "model.pkl")

print("Model trained and saved!")