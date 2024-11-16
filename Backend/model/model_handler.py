# model/model_handler.py

import joblib



def load_model(model_path):
    """Load and return the ML model."""
    return joblib.load(model_path)

def calculate_trip_score(model, data):
    """Calculate the overall trip score using the entire dataset."""
    # processed_data = preprocess_data(data)
    trip_score = model.predict(data).mean()  # Average score as trip score
    return trip_score

def get_real_time_warnings(model, row_data):
    """Generate real-time warnings based on row data."""
    warnings = []

    # RPM Warning Conditions
    rpm = row_data['rpm'].values[0]
    if rpm > 2000:
        warnings.append("High RPM: Reduce speed for better efficiency.")
    elif rpm > 1500:
        warnings.append("Moderate RPM: Consider reducing speed slightly.")

    # Engine Load (eLoad) Warning Conditions
    eLoad = row_data['eLoad'].values[0]
    if eLoad > 80:
        warnings.append("High Engine Load: Drive smoothly to reduce load.")
    elif eLoad > 50:
        warnings.append("Moderate Engine Load: Avoid aggressive driving.")

    # GPS Speed Warning Conditions
    gps_speed = row_data['gps_speed'].values[0]
    if gps_speed > 90:
        warnings.append("High Speed: Slow down to improve fuel efficiency.")
    elif gps_speed > 50:
        warnings.append("Moderate Speed: Consider driving at lower speeds.")

    # Throttle Position (tPos) Warning Conditions
    tPos = row_data['tPos'].values[0]
    if tPos > 80:
        warnings.append("High Throttle Position: Reduce acceleration.")
    elif tPos > 40:
        warnings.append("Moderate Throttle Position: Accelerate gently.")

    # Intake Air Temperature (iat) Warning Conditions
    iat = row_data['iat'].values[0]
    if iat > 50:
        warnings.append("High Intake Air Temperature: Check engine cooling.")
    elif iat < 10:
        warnings.append("Low Intake Air Temperature: Allow engine to warm up.")

    # Mileage (kpl) Warning Conditions
    kpl = row_data['kpl'].values[0]
    if kpl < 5:
        warnings.append("Low Fuel Efficiency: Drive smoothly to save fuel.")
    elif kpl < 10:
        warnings.append("Moderate Fuel Efficiency: Consider efficient driving habits.")

    return warnings

def preprocess_data(scaler, data):
    """Preprocess data for model input (e.g., scaling, handling missing values)."""
    # Clean the trip data by rounding and removing all-zero rows
    data = data.round(2)
    data = data[~(data[['gps_speed', 'cTemp', 'eLoad', 'iat', 'kpl', 'rpm', 'speed', 'tPos']] == 0).all(axis=1)]

    # Extract features for prediction
    X_trip = data[['gps_speed', 'cTemp', 'eLoad', 'iat', 'kpl', 'rpm', 'speed', 'tPos']]
    X_trip_scaled = scaler.transform(X_trip)
    return X_trip_scaled  # Placeholder

