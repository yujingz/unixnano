import { useKeyPress, usePrevious } from 'ahooks';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function CurrentTime() {
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const lastTime = usePrevious(currentTime);

  function getCurrentTime() {
    const timeOrigin = performance.timeOrigin;
    if (!timeOrigin) {
      return 'Your browser is not supported. Consider using Chrome, Firefox, Edge, or Opera';
    } else {
      const time = performance.now() + performance.timeOrigin;
      const seconds = Math.floor(time / 1000);
      const milliseconds = Math.floor(time % 1000);
      return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
    }
  }

  useKeyPress('space', () => {
    setPaused(!paused);
  });

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

  const isLandscape = useMediaQuery({ query: '(orientation: landscape)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div
      className="h-screen bg-slate-800 flex items-center justify-center p-4"
      onClick={() => {
        setPaused(!paused);
      }}
    >
      <div
        className={`font-mono text-center font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-amber-500 break-all ${
          isMobile && isLandscape ? 'writing-vertical-rl' : ''
        }`}
      >
        {paused ? lastTime : currentTime}
      </div>
    </div>
  );
}
