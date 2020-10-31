import React, { useState, useEffect } from "react";
import { usePrevious } from "./utils/hooks/use-previous";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [paused, setPaused] = useState(false);
  const lastTime = usePrevious(currentTime);

  function getCurrentTime() {
    return (performance.now() + performance.timeOrigin).toFixed(3);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!paused) {
      timer = setTimeout(() => {
        setCurrentTime(getCurrentTime());
      }, 10);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  });

  return (
    <div
      className="App"
      onClick={() => {
        setPaused(!paused);
      }}
    >
      <div className="current-time-box">{paused ? lastTime : currentTime}</div>
    </div>
  );
}

export default App;
