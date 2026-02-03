import { useState } from 'react';
import { motion } from 'motion/react';
import { Gauge, Ruler, Clock, ArrowRight } from 'lucide-react';
import { 
  convertSpeed, 
  convertDistance, 
  convertTime,
  SpeedUnit,
  DistanceUnit,
  TimeUnit,
  formatSpeedUnit,
  formatDistanceUnit,
  formatTimeUnit
} from '@/app/utils/unitConversions';

export function UnitsConverter() {
  // Speed conversion
  const [speedValue, setSpeedValue] = useState<number>(1000);
  const [speedFromUnit, setSpeedFromUnit] = useState<SpeedUnit>('km/h');
  const [speedToUnit, setSpeedToUnit] = useState<SpeedUnit>('knots');

  // Distance conversion
  const [distanceValue, setDistanceValue] = useState<number>(1000);
  const [distanceFromUnit, setDistanceFromUnit] = useState<DistanceUnit>('km');
  const [distanceToUnit, setDistanceToUnit] = useState<DistanceUnit>('mi');

  // Time conversion
  const [timeValue, setTimeValue] = useState<number>(7200);
  const [timeFromUnit, setTimeFromUnit] = useState<TimeUnit>('s');
  const [timeToUnit, setTimeToUnit] = useState<TimeUnit>('h');

  const speedUnits: SpeedUnit[] = ['km/h', 'm/s', 'mph', 'knots', 'mach'];
  const distanceUnits: DistanceUnit[] = ['km', 'mi', 'nm'];
  const timeUnits: TimeUnit[] = ['s', 'min', 'h'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#0f1419] pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 flex items-center gap-3">
            <Gauge className="w-8 h-8 text-cyan-400" />
            Units Converter
          </h1>
          <p className="text-gray-400">
            Convert aviation-related units for speed, distance, and time
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Speed Converter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0f1419]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 px-6 py-4">
              <h2 className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                Speed Conversion
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* From */}
                <div className="space-y-3">
                  <label className="block text-sm text-gray-400">From</label>
                  <input
                    type="number"
                    value={speedValue}
                    onChange={(e) => setSpeedValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <select
                    value={speedFromUnit}
                    onChange={(e) => setSpeedFromUnit(e.target.value as SpeedUnit)}
                    className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    {speedUnits.map(unit => (
                      <option key={unit} value={unit}>{formatSpeedUnit(unit)}</option>
                    ))}
                  </select>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-cyan-400" />
                </div>

                {/* To */}
                <div className="space-y-3">
                  <label className="block text-sm text-gray-400">To</label>
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg px-4 py-3 text-lg font-semibold text-cyan-400">
                    {convertSpeed(speedValue, speedFromUnit, speedToUnit).toFixed(2)}
                  </div>
                  <select
                    value={speedToUnit}
                    onChange={(e) => setSpeedToUnit(e.target.value as SpeedUnit)}
                    className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    {speedUnits.map(unit => (
                      <option key={unit} value={unit}>{formatSpeedUnit(unit)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="mt-6 p-4 bg-[#1a1f26] rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Quick Reference</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                  {speedUnits.map(unit => (
                    <div key={unit} className="text-center">
                      <div className="text-cyan-400 font-medium">
                        {convertSpeed(speedValue, speedFromUnit, unit).toFixed(2)}
                      </div>
                      <div className="text-gray-500">{formatSpeedUnit(unit)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Distance Converter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0f1419]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 px-6 py-4">
              <h2 className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-cyan-400" />
                Distance Conversion
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* From */}
                <div className="space-y-3">
                  <label className="block text-sm text-gray-400">From</label>
                  <input
                    type="number"
                    value={distanceValue}
                    onChange={(e) => setDistanceValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <select
                    value={distanceFromUnit}
                    onChange={(e) => setDistanceFromUnit(e.target.value as DistanceUnit)}
                    className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    {distanceUnits.map(unit => (
                      <option key={unit} value={unit}>{formatDistanceUnit(unit)}</option>
                    ))}
                  </select>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-cyan-400" />
                </div>

                {/* To */}
                <div className="space-y-3">
                  <label className="block text-sm text-gray-400">To</label>
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg px-4 py-3 text-lg font-semibold text-cyan-400">
                    {convertDistance(distanceValue, distanceFromUnit, distanceToUnit).toFixed(2)}
                  </div>
                  <select
                    value={distanceToUnit}
                    onChange={(e) => setDistanceToUnit(e.target.value as DistanceUnit)}
                    className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    {distanceUnits.map(unit => (
                      <option key={unit} value={unit}>{formatDistanceUnit(unit)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="mt-6 p-4 bg-[#1a1f26] rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Quick Reference</div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  {distanceUnits.map(unit => (
                    <div key={unit} className="text-center">
                      <div className="text-cyan-400 font-medium">
                        {convertDistance(distanceValue, distanceFromUnit, unit).toFixed(2)}
                      </div>
                      <div className="text-gray-500">{formatDistanceUnit(unit)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Time Converter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0f1419]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 px-6 py-4">
              <h2 className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Time Conversion
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* From */}
                <div className="space-y-3">
                  <label className="block text-sm text-gray-400">From</label>
                  <input
                    type="number"
                    value={timeValue}
                    onChange={(e) => setTimeValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <select
                    value={timeFromUnit}
                    onChange={(e) => setTimeFromUnit(e.target.value as TimeUnit)}
                    className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    {timeUnits.map(unit => (
                      <option key={unit} value={unit}>{formatTimeUnit(unit)}</option>
                    ))}
                  </select>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-cyan-400" />
                </div>

                {/* To */}
                <div className="space-y-3">
                  <label className="block text-sm text-gray-400">To</label>
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg px-4 py-3 text-lg font-semibold text-cyan-400">
                    {convertTime(timeValue, timeFromUnit, timeToUnit).toFixed(2)}
                  </div>
                  <select
                    value={timeToUnit}
                    onChange={(e) => setTimeToUnit(e.target.value as TimeUnit)}
                    className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    {timeUnits.map(unit => (
                      <option key={unit} value={unit}>{formatTimeUnit(unit)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="mt-6 p-4 bg-[#1a1f26] rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Quick Reference</div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  {timeUnits.map(unit => (
                    <div key={unit} className="text-center">
                      <div className="text-cyan-400 font-medium">
                        {convertTime(timeValue, timeFromUnit, unit).toFixed(2)}
                      </div>
                      <div className="text-gray-500">{formatTimeUnit(unit)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
