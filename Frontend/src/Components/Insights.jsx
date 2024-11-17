import React, { useState, useEffect } from 'react';

export default function Insights() {
  const [data, setData] = useState({
    Engine_Load: 42,
    GPS_Speed: 21,
    Air_Intake_Temp: 23,
    kpl: 2,
    throttle_Position: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://green-miles.vercel.app/metrics');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const realTimeData = await response.json();
        setData(realTimeData); // Update component state with real-time data
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup function to stop fetching on unmount
  }, []);

  const getColor = (key) => {
    switch (key) {
      case 'eLoad':
        return 'lightpink';
      case 'gps_speed':
        return 'green';
      case 'iat':
        return 'skyblue';
      case 'kpl':
        return 'orange';
      case 'rpm':
        return 'red';
      case 'tPos':
        return 'lightgreen';
      case 'speed':
        return 'purple';
      case 'cTemp':
        return 'gray';
      default:
        return 'black';
    }
  };

  return (
    <div className="bg-gray-900 opacity-80 w-[350px] p-1 rounded-lg">
      <h2 className="text-white bg-black text-center font-mono mb-1">Vehicle Stats</h2>
      {Object.entries(data).map(([key, value]) => {
        
        if (key.toLowerCase() === 'gps_speed' || key.toLowerCase() === 'speed') return null;

        return (
          <h1 key={key} style={{ color: getColor(key) }} className='mt-3'>
            {key}: {value}
          </h1>
        );
      })}
    </div>
  );
}
