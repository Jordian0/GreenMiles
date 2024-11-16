import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaSmile } from 'react-icons/fa'; // Import smile emoji from react-icons
import 'react-circular-progressbar/dist/styles.css';
import { IoLeaf } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";
import { ImSad2 } from "react-icons/im";

// Styled components for custom styling
const MeterContainer = styled.div`
  width: fit-content;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  font-family: monospace;
  color: white;
`;

const ModesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
`;

const BatteryStatus = styled.div`
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
  margin-top: 10px;
`;

// Helper function to determine status and styling based on score
const getStatus = (score) => {
  if (score >= 90) return { text: 'Excellent', color: '#4CAF50', icon: <FaSmile className='text-yellow-400' /> };
  if (score === 60) return { text: 'Good', color: 'orange', icon: <FaThumbsUp className='text-blue-400' /> };
  if (score > 60 && score <= 80) return { text: 'Efficient', color: '#4CAF50', icon: <IoLeaf className='text-green-500' /> };
  return { text: 'Poor', color: '#FF4500', icon: <ImSad2 className='text-yellow-300' /> }; // Red
};

const BatteryMeter = () => {
  const [score, setScore] = useState(0); // State for score
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://green-miles.vercel.app/score'); // Replace with your actual API endpoint
        const data = await response.json();
        setScore(Math.round(data.trip_score)); // Round score to whole number
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    // Fetch score after 8 seconds
    const timeoutId = setTimeout(fetchData, 8000);

    return () => clearTimeout(timeoutId); // Cleanup function to clear timeout
  }, []);

  const progressValue = score 

  const { text, color, icon } = getStatus(score);

  return (
    <MeterContainer className='mt-[2%] mr-1'>
      <h1 className='mb-2'>Overall Driving Score</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CircularProgressbar
            value={progressValue}
            text={`${score}/100`}
            styles={buildStyles({
              pathColor: color, // Set path color based on score
              textColor: '#FFFFFF', // Text color remains white
              trailColor: '#2c2f36', // Background color of the progress bar
            })}
          />

          <BatteryStatus style={{ color }} className='text-5xl'>
            {text} {icon}
          </BatteryStatus>
        </>
      )}

      <ModesContainer>
        {/* Additional components or mode buttons can go here */}
      </ModesContainer>
    </MeterContainer>
  );
};

export default BatteryMeter;