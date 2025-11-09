import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Life Management Application</h1>
      <p>Welcome to your Life Management App!</p>
      <p>This is a placeholder frontend. The backend API is ready at {process.env.REACT_APP_API_URL || 'http://localhost:3000'}</p>
    </div>
  );
}

export default App;
