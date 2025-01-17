import React from 'react';

interface PaceRow {
  finishTime: string;
  kmPace: string;
  milePace: string;
}

const HalfMarathonPaces: React.FC = () => {
  const generatePaces = (): PaceRow[] => {
    const paces: PaceRow[] = [];
    // Starting from 1:30:00 to 2:00:00, with 5-minute intervals
    for (let minutes = 90; minutes <= 120; minutes += 5) {
      const totalSeconds = minutes * 60;

      // Calculate pace per kilometer (21.0975 km in a half marathon)
      const secondsPerKm = totalSeconds / 21.0975;
      const kmMinutes = Math.floor(secondsPerKm / 60);
      const kmSeconds = Math.floor(secondsPerKm % 60);

      // Calculate pace per mile (13.1094 miles in a half marathon)
      const secondsPerMile = totalSeconds / 13.1094;
      const mileMinutes = Math.floor(secondsPerMile / 60);
      const mileSeconds = Math.floor(secondsPerMile % 60);

      paces.push({
        finishTime: `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}:00`,
        kmPace: `${kmMinutes}:${String(kmSeconds).padStart(2, '0')}/km`,
        milePace: `${mileMinutes}:${String(mileSeconds).padStart(2, '0')}/mi`,
      });
    }
    return paces;
  };

  const paces = generatePaces();

  return (
    <div className="p-5 w-full">
      <h1 className="text-center mb-5 text-2xl md:text-2xl font-bold">Half Marathon Pace Chart</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm md:text-base font-semibold">Finish Time</th>
              <th className="px-4 py-3 text-left text-sm md:text-base font-semibold">Pace per KM</th>
              <th className="px-4 py-3 text-left text-sm md:text-base font-semibold">Pace per Mile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paces.map((pace, index) => (
              <tr
                key={index}
                className={`
                  hover:bg-gray-50 
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                `}
              >
                <td className="px-4 py-3 text-sm md:text-base whitespace-nowrap">{pace.finishTime}</td>
                <td className="px-4 py-3 text-sm md:text-base whitespace-nowrap">{pace.kmPace}</td>
                <td className="px-4 py-3 text-sm md:text-base whitespace-nowrap">{pace.milePace}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HalfMarathonPaces;
