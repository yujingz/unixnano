import React, { useState, useEffect } from "react";
import "./App.css";

function getCurrentTime() {
  return (performance.now() + performance.timeOrigin).toFixed(3);
}

function App() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(getCurrentTime());
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className="App">
      <div className="current-time-box">{currentTime}</div>
    </div>
  );
}

export default App;
