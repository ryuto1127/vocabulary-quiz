// components/ui/Progress.js
import React from 'react';
import './Progress.css'; // Import the CSS file

const Progress = ({ value, className }) => {
  return (
    <div className={`progress-bar ${className}`}>
      <div
        className="progress-fill"
        style={{ width: `${value}%`, backgroundColor: '#4caf50', height: '8px' }}
      />
    </div>
  );
};

export default Progress;
