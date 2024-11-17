import React, { useState } from 'react';
import Dashboard from './Components/Dashboard';

function App() {
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

  const handleVideoEnd = () => {
    setIsVideoCompleted(true); // Update state when video ends
  };

  return (
    <div className="mt-[2%]">
      {!isVideoCompleted ? (
        <div>
          <video
            src="Volk-into.mp4" 
            aria-hidden="true"
            playsInline
            muted
            autoPlay
            onEnded={handleVideoEnd} 
            style={{ width: '98%', height: '90vh' }} 
          />
        </div>
      ) : (
        <Dashboard /> 
      )}
    </div>
  );
}

export default App;
