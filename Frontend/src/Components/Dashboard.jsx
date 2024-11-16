import React, { useState, useEffect } from 'react';
import Score from './Score';
import Insights from './Insights';
import Warnings from './Warnings';
import Speedometer from './Speedometer';
import Feedback from './Feedback';
import GoogleMap from './Googlemap';

export default function Dashboard() {
  const [speed, setSpeed] = useState(0);
  const [isSimulated, setIsSimulated] = useState(true); // To control the simulation phase

  useEffect(() => {
    let intervalId;

    if (isSimulated) {
      // First phase: Simulate speed up to 180
      let simulatedSpeed = 0;
      intervalId = setInterval(() => {
        if (simulatedSpeed < 180) {
          simulatedSpeed += 30; // Increment speed by 30
          setSpeed(simulatedSpeed);
        } else {
          clearInterval(intervalId); // Stop simulation
          setIsSimulated(false); // Transition to real-time updates
        }
      }, 100);
    } else {
      // Second phase: Fetch real-time speed from the API
      intervalId = setInterval(() => {
        fetch('https://green-miles.vercel.app/metrics')
          .then((response) => response.json())
          .then((data) => {
            setSpeed(Math.round(data.speed || 0)); // Update speed with real-time data
          })
          .catch((err) => console.error('Error fetching speed data:', err));
      }, 1000);
    }

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [isSimulated]);

  return (
    <div className="border-2 border-red-500 flex flex-col rounded-2xl w-[100vw] h-[94vh] wallpaper">
      <div>
        <h1 className="text-3xl text-center font-bold text-white mb-4 animate-pulse">
          Volkswagen Journey
        </h1>
      </div>
      <div className="flex justify-between">
        <Speedometer speed={speed} />
        <GoogleMap />
        <Warnings />
      </div>
      <div className="flex justify-between">
        <Insights />
        <Feedback />
        <Score />
      </div>
    </div>
  );
}
