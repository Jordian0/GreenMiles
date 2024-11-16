import React, { useEffect, useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://green-miles.vercel.app/feedback');
        const data = await response.json();
        console.log('Fetched data:', data);  // Log the entire data object to check its structure
        
        // Ensure warnings is an array of strings or objects
        if (Array.isArray(data.warnings)) {
          setFeedback(data.warnings);  // Set feedback to the warnings array
        } else {
          console.error('Data warnings is not an array', data.warnings);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  console.log('Current feedback state:', feedback);  // Log the feedback state to ensure it is what we expect

  return (
    <div className="flex flex-col items-start gap-4 p-6 bg-gray-900/60 rounded-lg shadow-lg backdrop-blur-sm w-[750px] h-[300px] mt-[2%]">
      <h2 className="text-2xl font-bold text-white mb-4">Real-Time Feedback</h2>
      <div className="flex flex-col gap-4 w-full">
        {feedback.length === 0 ? (
          <p className="text-gray-500">No feedback available...</p>
        ) : (
          feedback.map((item, index) => {
            // Check if the item is a string or an object with a 'message' key
            const message = typeof item === 'string' ? item : item.message;

            return (
              <div key={index} className="px-4 py-3 bg-gray-800 rounded-md text-sm shadow-md text-left w-full border-l-4 border-yellow-500">
                <p className="text-base text-gray-100 leading-relaxed">{message}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Feedback;
