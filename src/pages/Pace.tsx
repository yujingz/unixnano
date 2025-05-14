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
    return (Object.values(MARATHON_GOALS) as number[]).includes(pace);
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
        <title>Running Pace Calculator | Marathon, Half Marathon, 10K, 5K Times & Paces</title>
        <meta
          name="description"
          content="Free running pace calculator with comprehensive pace charts for marathons, half marathons, 10K and 5K races. Calculate your target times with specific goal paces including sub-3:00, 3:30, 4:00, and 4:30 marathon times."
        />
        <meta
          name="keywords"
          content="running pace calculator, marathon pace chart, half marathon calculator, 10K pace, 5K time calculator, race pace, min/km calculator, sub 3 marathon pace, running pace conversion"
        />
        <meta name="author" content="unixnano.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English, Chinese" />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Running Pace Calculator | Marathon, Half Marathon, 10K, 5K" />
        <meta
          property="og:description"
          content="Calculate your exact race times for different paces. Includes special pace charts for sub-3:00, 3:30, 4:00 and 4:30 marathon goals."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://unixnano.com/pace" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="zh_CN" />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Running Pace Calculator | Marathon, Half Marathon, 10K, 5K" />
        <meta
          name="twitter:description"
          content="Interactive pace calculator for runners. Find your perfect pace for any race distance."
        />

        {/* Structured data for rich results */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Running Pace Calculator",
            "description": "Calculate running pace and finish times for various race distances",
            "applicationCategory": "SportsApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": ["Marathon pace calculation", "Half marathon pace calculation", "10K pace calculation", "5K pace calculation", "Goal pace guides"]
          }
        `}</script>
      </Helmet>
      <div className="p-4">
        <div className="absolute top-2 right-4 text-gray-600 text-sm">
          <a href="mailto:feedback@unixnano.com" className="hover:text-gray-900">
            Feedbacks? feedback@unixnano.com
          </a>
        </div>
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
