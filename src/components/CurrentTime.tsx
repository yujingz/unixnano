import { usePrevious } from 'ahooks';
import { useEffect, useState } from 'react';

export default function CurrentTime() {
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const lastTime = usePrevious(currentTime);

  function getCurrentTime() {
    const timeOrigin = performance.timeOrigin;
    if (!timeOrigin) {
      return 'Your browser is not supported. Consider using Chrome, Firefox, Edge, or Opera';
    } else {
      return (performance.now() + performance.timeOrigin).toFixed(1);
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
      className="h-screen bg-slate-800 flex items-center justify-center"
      onClick={() => {
        setPaused(!paused);
      }}
    >
      <div className="font-mono text-center font-black text-8xl text-amber-500">{paused ? lastTime : currentTime}</div>
    </div>
  );
}
