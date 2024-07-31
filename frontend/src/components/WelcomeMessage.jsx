import React from 'react';

function WelcomeMessage({ firstName }) {
  return (
    <div className="bg-green-200 p-4">
      Welcome, {firstName}!
    </div>
  );
}

export default WelcomeMessage;