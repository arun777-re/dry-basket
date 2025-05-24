'use client';
import React from 'react';

const DummyCard: React.FC = () => {
  return (
    <div className="w-[24vw] h-[40vh] bg-gray-100 rounded-lg overflow-hidden animate-pulse shadow-md">
      {/* Simulate image */}
      <div className="h-1/2 bg-gray-200 w-full"></div>

      {/* Simulate text/content area */}
      <div className="p-4 space-y-3">
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        <div className="w-full h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default DummyCard;
