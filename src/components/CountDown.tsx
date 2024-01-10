import { useEffect, useState } from "react";
import "../App.css";

// const total = 365 * 24 * 3600;

export default function CountDown() {
  const [currentTime, setCurrentTime] = useState(+new Date()); // MS
  const targetTime = new Date("2022-01-25T09:00:00");

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

  const days = delta / (60 * 24 * 60);
  const hours = (delta - Math.floor(days) * 3600 * 24) / 3600;
  const mins =
    (delta - Math.floor(days) * 3600 * 24 - Math.floor(hours) * 3600) / 60;

  return (
    <div className="App">
      <div className="current-time-box">{delta.toFixed(2)}</div>
      <div className="current-time-box-days">
        {Math.floor(days)} days {Math.floor(hours)} hours {Math.floor(mins)}{" "}
        mins
      </div>
    </div>
  );
}
