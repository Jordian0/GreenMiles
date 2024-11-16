import React, { useEffect, useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://green-miles.vercel.app/feedback');
        const data = await response.json();
        setFeedback(data.warnings);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    // Fetch feedback data (adjust interval as needed)
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-start gap-4 p-6 bg-gray-900/60 rounded-lg shadow-lg backdrop-blur-sm w-[750px] h-[300px] mt-[2%]">
      <h2 className="text-2xl font-bold text-white mb-4">Real-Time Feedback</h2>
      <div className="flex flex-col gap-4 w-full">
        {feedback.map((message, index) => (
          <div key={index} className="px-4 py-3 bg-gray-800 rounded-md text-sm shadow-md text-left w-full border-l-4 border-yellow-500">
            <p className="text-base text-gray-100 leading-relaxed">{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;