// import { usePrevious } from "../utils/hooks/use-previous";
import { usePrevious } from 'ahooks';
import { useEffect, useState } from 'react';

import '../App.css';

export default function CurrentTime() {
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const lastTime = usePrevious(currentTime);

  function getCurrentTime() {
    const timeOrigin = performance.timeOrigin;
    if (!timeOrigin) {
      return 'Your browser is not supported. Consider using Chrome, Firefox, Edge, or Opera';
    } else {
      return (performance.now() + performance.timeOrigin).toFixed(3);
    }
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
