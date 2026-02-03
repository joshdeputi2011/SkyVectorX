import { motion } from 'motion/react';
import { Clock, Gauge, MapPin, TrendingUp, Activity } from 'lucide-react';
import { FlightData } from '@/app/utils/flightCalculations';
import { formatDuration } from '@/app/utils/flightCalculations';
import { convertSpeed, convertDistance, SpeedUnit, DistanceUnit } from '@/app/utils/unitConversions';

interface InfoPanelProps {
  flightData: FlightData | null;
  speedUnit: SpeedUnit;
  distanceUnit: DistanceUnit;
}

export function InfoPanel({ flightData, speedUnit, distanceUnit }: InfoPanelProps) {
  if (!flightData) return null;

  const { distance, phases, aircraft, departure, arrival } = flightData;

  const phaseData = [
    { name: 'Takeoff', time: phases.takeoff, color: 'bg-green-500', percent: (phases.takeoff / phases.total) * 100 },
    { name: 'Climb', time: phases.climb, color: 'bg-blue-500', percent: (phases.climb / phases.total) * 100 },
    { name: 'Cruise', time: phases.cruise, color: 'bg-cyan-500', percent: (phases.cruise / phases.total) * 100 },
    { name: 'Descent', time: phases.descent, color: 'bg-yellow-500', percent: (phases.descent / phases.total) * 100 },
    { name: 'Landing', time: phases.landing, color: 'bg-red-500', percent: (phases.landing / phases.total) * 100 }
  ];

  const formatSpeed = (speed: number) => convertSpeed(speed, 'km/h', speedUnit).toFixed(0);
  const formatDist = (dist: number) => convertDistance(dist, 'km', distanceUnit).toFixed(0);

  return (
    <div className="w-96 space-y-4">
      {/* Flight Summary Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#0f1419]/95 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-400/20 px-6 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Flight Summary
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Route */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-sm font-medium">{departure.iata}</div>
                <div className="text-xs text-gray-500">{departure.name}</div>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="h-px bg-gradient-to-r from-green-500 to-red-500 flex-1"></div>
                <div className="text-xs text-gray-500">→</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">{arrival.iata}</div>
                <div className="text-xs text-gray-500">{arrival.name}</div>
              </div>
            </div>
          </div>

          {/* Distance & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a1f26] rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Total Distance</div>
              <div className="text-2xl font-semibold text-cyan-400">
                {formatDist(distance)}
              </div>
              <div className="text-xs text-gray-500 mt-1">{distanceUnit}</div>
            </div>
            <div className="bg-[#1a1f26] rounded-lg p-4">
              <div className="text-xs text-gray-500 mb-1">Flight Time</div>
              <div className="text-2xl font-semibold text-cyan-400">
                {formatDuration(phases.total)}
              </div>
              <div className="text-xs text-gray-500 mt-1">duration</div>
            </div>
          </div>

          {/* Aircraft */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-500/20">
            <div className="text-xs text-gray-500 mb-2">Selected Aircraft</div>
            <div className="font-medium">{aircraft.name}</div>
            <div className="text-xs text-gray-500 mt-1">{aircraft.type}</div>
          </div>
        </div>
      </motion.div>

      {/* Flight Phase Breakdown */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0f1419]/95 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-400/20 px-6 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <Clock className="w-5 h-5 text-cyan-400" />
            Flight Phases
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Timeline Bar */}
          <div className="flex h-3 rounded-full overflow-hidden">
            {phaseData.map((phase, index) => (
              <div
                key={index}
                className={phase.color}
                style={{ width: `${phase.percent}%` }}
                title={`${phase.name}: ${formatDuration(phase.time)}`}
              />
            ))}
          </div>

          {/* Phase Details */}
          <div className="space-y-2">
            {phaseData.map((phase, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${phase.color}`}></div>
                  <span className="text-gray-400">{phase.name}</span>
                </div>
                <span className="font-medium">{formatDuration(phase.time)}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Aircraft Performance */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0f1419]/95 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-400/20 px-6 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <Activity className="w-5 h-5 text-cyan-400" />
            Performance Data
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Cruise Speed</div>
              <div className="font-semibold text-cyan-400">
                {formatSpeed(aircraft.cruiseSpeed)} {speedUnit}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Max Speed</div>
              <div className="font-semibold text-cyan-400">
                {formatSpeed(aircraft.maxSpeed)} {speedUnit}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Mach Number</div>
              <div className="font-semibold text-cyan-400">
                {aircraft.machNumber.toFixed(2)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Range</div>
              <div className="font-semibold text-cyan-400">
                {formatDist(aircraft.range)} {distanceUnit}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Cruise Altitude</div>
              <div className="font-semibold text-cyan-400">
                {(aircraft.cruiseAltitude / 1000).toFixed(1)} km
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Climb Rate</div>
              <div className="font-semibold text-cyan-400">
                {aircraft.climbRate.toFixed(1)} m/s
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}