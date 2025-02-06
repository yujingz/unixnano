import { Helmet } from 'react-helmet';

const DISTANCES = [
  { name: 'Marathon', meters: 42195 },
  { name: 'Half Marathon', meters: 21097.5 },
  { name: '10K', meters: 10000 },
  { name: '5K', meters: 5000 },
] as const;

const MARATHON_GOALS = {
  '3:00': 255, // 4:15 min/km
  '3:30': 298, // 4:58 min/km
  '4:00': 341, // 5:41 min/km
  '4:30': 383, // 6:23 min/km
} as const;

export function Pace() {
  const padZero = (num: number) => num.toString().padStart(2, '0');

  const generatePaces = () => {
    const regularPaces = Array.from({ length: 21 }, (_, i) => 480 - i * 15);
    const specialPaces = Object.values(MARATHON_GOALS);

    return [...new Set([...regularPaces, ...specialPaces])].sort((a, b) => b - a);
  };

  const isGoalPace = (pace: number) => {
    return Object.values(MARATHON_GOALS).includes(pace);
  };

  const formatPace = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${padZero(remainingSeconds)}`;
  };

  const calculateTime = (distanceInMeters: number, paceInSeconds: number) => {
    const totalSeconds = (distanceInMeters / 1000) * paceInSeconds;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
    }
    return `${minutes}:${padZero(seconds)}`;
  };

  return (
    <>
      <Helmet>
        <title>跑步配速计算器 | Running Pace Calculator for Marathon, Half Marathon, 10K, 5K</title>
        <meta
          name="description"
          content="跑步配速计算器，轻松计算全马、半马、10公里、5公里所需时间。Running pace calculator for Marathon, Half Marathon, 10K and 5K races. 包含详细配速表格"
        />
        <meta
          name="keywords"
          content="配速,半马,全马,pace calculator,half marathon,marathon,5k,10k,配速表格,跑步计算器"
        />
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="跑步配速计算器 | Running Pace Calculator" />
        <meta
          property="og:description"
          content="轻松计算全马、半马、10公里、5公里所需时间。Calculate your race times for Marathon, Half Marathon, 10K and 5K."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Pace Calculator</h1>
        <div className="text-center mb-4 text-sm">
          <p>Special paces for marathon goals:</p>
          <p>Sub 3:00 (4:15 min/km) | Sub 3:30 (4:58 min/km) | Sub 4:00 (5:41 min/km) | Sub 4:30 (6:23 min/km)</p>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="max-w-7xl mx-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Pace (min/km)</th>
                  {DISTANCES.map((distance) => (
                    <th key={distance.name} className="border p-2">
                      {distance.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {generatePaces().map((pace) => (
                  <tr key={pace} className={`hover:bg-gray-50 ${isGoalPace(pace) ? 'bg-blue-50 font-semibold' : ''}`}>
                    <td className="border p-2 font-medium">{formatPace(pace)}</td>
                    {DISTANCES.map((distance) => (
                      <td
                        key={`${pace}-${distance.name}`}
                        className={`border p-2 text-center ${isGoalPace(pace) ? 'text-blue-600' : ''}`}
                      >
                        {calculateTime(distance.meters, pace)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
