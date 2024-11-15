
# Eco-Driving Coach App with AI Feedback 

An AI-powered application designed to provide real-time feedback and eco-driving scores to drivers, helping reduce fuel consumption and carbon emissions. This project includes a machine learning model to process driving data and generate feedback based on driving patterns.

## Table of Contents
- [Eco-Driving Coach App with AI Feedback](#eco-driving-coach-app-with-ai-feedback)
  - [Table of Contents](#table-of-contents)
  - [📖 Project Overview](#-project-overview)
  - [🎯 Key Features](#-key-features)
  - [🏗️ Project Architecture](#️-project-architecture)
    - [⚙️ Architecture Breakdown](#️-architecture-breakdown)
    - [🌐 Tech Stack](#-tech-stack)
    - [🛠️ API Endpoints](#️-api-endpoints)
  - [🗃️ Dataset Details](#️-dataset-details)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup Instructions](#setup-instructions)
      - [1. Backend Setup (Flask)](#1-backend-setup-flask)
      - [2. Frontend Setup (React)](#2-frontend-setup-react)
      - [3. Running the Simulation](#3-running-the-simulation)
  - [📈 Eco-Driving Score Calculation](#-eco-driving-score-calculation)
  - [🌟 Example Use Case](#-example-use-case)
  - [📊 Future Enhancements](#-future-enhancements)


## 📖 Project Overview

The **Eco-Driving Coach App** empowers drivers to embrace eco-friendly driving habits, reducing fuel consumption and carbon emissions. By leveraging **real-time data** and **AI-driven insights**, the app provides **instant feedback** to help drivers improve their driving behaviors. With features like **gamification** and **real-time coaching**, this app makes sustainable driving an engaging experience, motivating drivers to adopt long-lasting eco-friendly habits. 

---

## 🎯 Key Features

- **🌱 AI-Powered Eco-Feedback**: Analyzes driving data in real-time, identifying behaviors like harsh braking and rapid acceleration, and provides actionable insights to improve driving style.
- **📊 Real-Time Coaching**: Gives on-the-spot feedback, guiding drivers to reduce fuel consumption and emissions.
- **🏆 Gamification**: Drivers can track their eco-driving score, see their progress, and compete on leaderboards.
- **💡 Simulation Mode**: A simulated real-time environment using CSV data for testing purposes, allowing us to showcase features even without live sensor data.

---

## 🏗️ Project Architecture

The project simulates a real-time feedback environment by processing pre-recorded CSV data row-by-row. The **Flask backend** processes the data, skipping rows at intervals to emulate real-time driving behavior. The **React frontend** presents this data to the user in an intuitive, live feedback display.

### ⚙️ Architecture Breakdown

1. **CSV Data Source**: Contains driving parameters like speed, acceleration, RPM, and fuel consumption.
2. **Backend (Flask)**:
   - Reads and processes data from the CSV in real-time.
   - Calculates an **eco-driving score** based on each trip.
   - Provides real-time feedback based on driving patterns.
3. **Frontend (React)**:
   - Displays the eco-driving score, trip summary, and coaching feedback.
   - Refreshes every 10 seconds to display new data, simulating real-time experience.

### 🌐 Tech Stack

| Component           | Technology                      |
| ------------------- | ------------------------------- |
| **Frontend**        | React (JavaScript, CSS)         |
| **Backend**         | Flask (Python)                  |
| **Data Simulation** | CSV file processed in real-time |

### 🛠️ API Endpoints

| Endpoint        | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `GET /score`    | Returns the overall eco-driving score after each trip              |
| `GET /feedback` | Provides real-time feedback every 10 seconds based on driving data |
| `GET /metrics`  | Streams essential driving metrics one row at a time, simulating real-time data flow|

---

## 🗃️ Dataset Details

The dataset used for this simulation includes the following columns:

- **tripID**: Unique identifier for each trip
- **deviceID**: Identifier for the device collecting data
- **timestamp**: Time of data capture
- **acceleration**: Acceleration values
- **speed**: Vehicle speed
- **RPM**: Engine revolutions per minute
- **fuel usage**: Fuel consumption data
- Additional vehicle telemetry data as needed

This dataset enables the backend to calculate eco-driving scores and identify inefficient driving patterns for feedback.

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.x** for Flask backend
- **Node.js and npm** for React frontend
- Python libraries: `flask`, `pandas`

### Setup Instructions

#### 1. Backend Setup (Flask)
- Navigate to the backend directory.
- Install dependencies:
  ```bash
  pip install flask pandas
  ```
- Run the Flask server:
  ```bash
  python app.py
  ```

#### 2. Frontend Setup (React)
- Navigate to the frontend directory.
- Install dependencies:
  ```bash
  npm install
  ```
- Start the React development server:
  ```bash
  npm start
  ```

#### 3. Running the Simulation
- With both servers running, the frontend fetches data from the backend every 10 seconds, providing real-time feedback based on the simulated driving data in the CSV file.

---

## 📈 Eco-Driving Score Calculation
The eco-driving score is calculated based on a variety of driving metrics gathered throughout each trip. These metrics help assess driving behaviors that impact fuel efficiency and emissions. Here are the key columns used in determining the eco-driving score:
1. **Speed**: Helps to check if the driver maintains an optimal speed. Consistent speeds within an efficient range contribute positively, while overspeeding has a negative impact.
2. **Acceleration**: Indicates how smoothly the driver accelerates. Harsh accelerations consume more fuel, so smooth acceleration improves the eco-score.
3. **Braking**: Highlights how often and how harshly the driver brakes. Gentle, anticipatory braking is favorable, while hard braking events reduce the score.
4. **Harsh Acceleration**: Specific flag for severe acceleration events, indicating aggressive driving that negatively impacts fuel efficiency.
5. **Harsh Braking**: Flags aggressive braking events, which tend to correlate with inefficient driving and lower eco-scores.
6. **RPM** (Revolutions Per Minute): High RPM levels indicate that the engine is under strain, leading to less efficient fuel use. Lower RPM during cruising contributes positively.
7. **Throttle Position** (TPos): Measures the degree to which the accelerator pedal is pressed. High throttle input suggests aggressive driving, which may decrease the score.
8. **KPL** (Kilometers per Liter): Directly measures fuel efficiency during the trip, with higher values indicating eco-friendly driving patterns.
9. **Battery Temperature** (cTemp) and Engine Load (eLoad): Provide insight into engine strain, with consistently high values signaling inefficiency.
10. **Trip Duration and Trip Distance**: These values help analyze the overall consistency in eco-driving behavior across both short and long trips.

Each of these factors contributes to the cumulative eco-driving score, which is displayed at the end of each trip. This score provides an overview of how efficiently and safely the vehicle was driven, promoting eco-friendly driving habits.

---

## 📊 Future Enhancements

1. **Real Data Integration**: Replace CSV-based simulation with actual data from IoT sensors, enabling true real-time feedback.
2. **Enhanced Machine Learning Model**: Utilize advanced ML algorithms to make feedback even more personalized.
3. **Gamification**: Introduce achievements, rewards, and badges for eco-driving milestones.
4. **Mobile Application**: Develop a mobile app version for easier accessibility and use on the go.


