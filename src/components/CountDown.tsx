import React, { useState, useEffect } from "react";
import "../App.css";

export default function CountDown() {
  const [currentTime, setCurrentTime] = useState(+new Date());
  const targetTime = new Date("2021-09-16T09:00:00");
  const delta = +targetTime - +currentTime;

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
      <div className="current-time-box">{delta}</div>
    </div>
  );
}
