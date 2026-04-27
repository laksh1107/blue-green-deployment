import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load dataset
data = pd.read_csv("cloud_workload_dataset.csv")

# Convert time to numeric
data['Task_Start_Time'] = pd.to_datetime(data['Task_Start_Time']).view('int64') // 10**9

# Features & target
X = data[['Task_Start_Time']]
y = data['CPU_Utilization (%)']

# Train model
model = RandomForestRegressor()
model.fit(X, y)

# Save model
joblib.dump(model, "model.pkl")

print("Model trained successfully ✅")