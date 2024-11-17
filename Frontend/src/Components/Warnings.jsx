import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

function EngineWarnings() {
  const warnings = [
    {
      message: 'Heavy Engine Load',
      icon: <FaExclamationTriangle className="text-red-500 mr-2 animate-blink pulserate" />,
    },
    {
      message: 'Excessive Over-speeding',
      icon: <FaExclamationTriangle className="text-yellow-500 mr-2 animate-blink pulserate" />,
    },

  ];

  return (
    <div className="bg-gray-900 border   border-gray-200 rounded-lg p-4 w-[315px] mr-1   opacity-80">
      <h2 className=" font-bold mb-4 text-center text-yellow-400 text-2xl">Engine Warnings</h2>
      <br />
      <ul>
        {warnings.map((warning, index) => (
          <li key={index} className="flex items-center text-xl font-mono  mb-2 text-white">
            {warning.icon}
            <span>{warning.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EngineWarnings;