import React, { useState, useEffect } from "react";
import "../App.css";

const total = 365 * 24 * 3600;

export default function CountDown() {
  const [currentTime, setCurrentTime] = useState(+new Date()); // MS
  const targetTime = new Date("2021-09-16T09:00:00");

  const delta = +targetTime / 1000 - +currentTime / 1000;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => {
      setCurrentTime(+new Date());
    }, 10);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  });

  return (
    <div className="App">
      <div className="current-time-box">{delta.toFixed(2)}</div>
      <div className="current-time-box">
        {((delta / total) * 100).toFixed(5)}%
      </div>
    </div>
  );
}
