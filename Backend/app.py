from flask import Flask, jsonify, Response
from flask_cors import CORS
from model.model_handler import load_model, calculate_trip_score, get_real_time_warnings, preprocess_data
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load model and dataset
model = load_model('model/trained_model.pkl')
data = pd.read_csv('data/driving_data.csv')
scaler = joblib.load('model/fitted_scaler.pkl')
pdata = preprocess_data(scaler, data)
feed_row_index = 0
curr_met_index = 0

@app.route('/score', methods=['GET'])
def get_trip_score():
    """Endpoint to get the overall score for a single trip."""
    overall_score = calculate_trip_score(model, pdata)
    return jsonify({"trip_score": overall_score})

@app.route('/feedback', methods=['GET'])
def get_warnings():
    """Endpoint to get real-time warnings."""
    global feed_row_index
    warnings = []

    # Simulate real-time processing by reading 10 rows at a time
    if feed_row_index < len(data):
        row_data = data.iloc[[feed_row_index]]
        warnings = get_real_time_warnings(model, row_data)
        feed_row_index += 10
    else:
        warnings = [{"message": "End of data"}]

    return jsonify({"warnings": warnings})

@app.route('/metrics', methods=['GET'])
def stream_metrics():
    """Endpoint to stream real-time data row-by-row every second."""
    global curr_met_index

    # Check if we still have data to stream
    if curr_met_index < len(data):
        # Select only the required columns
        row_data = data.loc[curr_met_index, ['gps_speed', 'eLoad', 'rpm', 'tPos', 'iat', 'kpl']]
        # Convert to dictionary format for JSON response
        row_json = row_data.to_dict()
        curr_met_index += 1

        return jsonify(row_json)
    else:
        return jsonify({"message": "End of data"}), 204

if __name__ == '__main__':
    app.run(debug=True)

