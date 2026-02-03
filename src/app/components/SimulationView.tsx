import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Plane, Clock, Gauge, Activity, MapPin, TrendingUp } from 'lucide-react';
import { FlightMap } from './FlightMap';
import { FlightData } from '@/app/utils/flightCalculations';
import { formatDuration } from '@/app/utils/flightCalculations';

interface SimulationViewProps {
  flightData: FlightData | null;
}

export function SimulationView({ flightData }: SimulationViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!flightData) return;

    let animationFrame: number;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (isPlaying) {
        setProgress(prev => {
          const increment = deltaTime / (flightData.phases.total * 10);
          const newProgress = prev + increment;
          if (newProgress >= 1) {
            setIsPlaying(false);
            return 1;
          }
          return newProgress;
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, flightData]);

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  if (!flightData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Plane className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl text-gray-400 mb-2">No Flight Data Available</h3>
          <p className="text-sm text-gray-500">
            Please select departure, arrival cities and aircraft, then click "Simulate Flight"
          </p>
        </div>
      </div>
    );
  }

  const getCurrentPhase = () => {
    const { phases } = flightData;
    const currentTime = progress * phases.total;
    
    if (currentTime < phases.takeoff) return 'Takeoff';
    if (currentTime < phases.takeoff + phases.climb) return 'Climb';
    if (currentTime < phases.takeoff + phases.climb + phases.cruise) return 'Cruise';
    if (currentTime < phases.takeoff + phases.climb + phases.cruise + phases.descent) return 'Descent';
    return 'Landing';
  };

  const currentPhase = getCurrentPhase();

  const phaseData = [
    { name: 'Takeoff', time: flightData.phases.takeoff, color: 'bg-green-500', textColor: 'text-green-400', percent: (flightData.phases.takeoff / flightData.phases.total) * 100 },
    { name: 'Climb', time: flightData.phases.climb, color: 'bg-blue-500', textColor: 'text-blue-400', percent: (flightData.phases.climb / flightData.phases.total) * 100 },
    { name: 'Cruise', time: flightData.phases.cruise, color: 'bg-cyan-500', textColor: 'text-cyan-400', percent: (flightData.phases.cruise / flightData.phases.total) * 100 },
    { name: 'Descent', time: flightData.phases.descent, color: 'bg-yellow-500', textColor: 'text-yellow-400', percent: (flightData.phases.descent / flightData.phases.total) * 100 },
    { name: 'Landing', time: flightData.phases.landing, color: 'bg-red-500', textColor: 'text-red-400', percent: (flightData.phases.landing / flightData.phases.total) * 100 }
  ];

  return (
    <div className="flex h-full">
      {/* Left Side - Map with Animation */}
      <div className="flex-1 relative bg-[#0a0e1a]">
        <FlightMap
          departure={flightData.departure}
          arrival={flightData.arrival}
          animationProgress={progress}
        />

        {/* Floating Control Panel on Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#0f1419]/95 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-2xl overflow-hidden"
        >
          <div className="px-8 py-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-sm text-gray-400 mb-1">Flight Simulation</div>
              <div className="font-semibold text-lg">
                {flightData.departure.iata} → {flightData.arrival.iata}
              </div>
              <div className="text-sm text-cyan-400 mt-1">
                {flightData.aircraft.name}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-cyan-400 font-medium">{(progress * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-[#1a1f26] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            {/* Phase Info */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Current Phase</div>
                <div className="font-medium text-cyan-400">{currentPhase}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Elapsed Time</div>
                <div className="font-medium text-cyan-400">
                  {formatDuration(progress * flightData.phases.total)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Remaining</div>
                <div className="font-medium text-cyan-400">
                  {formatDuration((1 - progress) * flightData.phases.total)}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    {progress === 0 ? 'Start' : 'Resume'}
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={handleReset}
                className="bg-[#1a1f26] hover:bg-[#252a31] border border-cyan-400/20 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Information Panels */}
      <div className="w-96 bg-[#0a0e1a] border-l border-cyan-400/10 overflow-y-auto p-6 space-y-4" style={{ height: 'calc(100vh - 5rem)' }}>
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
            <div>
              <div className="text-xs text-gray-500 mb-2">Route</div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">{flightData.departure.iata}</div>
                  <div className="text-xs text-gray-500">{flightData.departure.name}</div>
                  <div className="text-xs text-gray-600">{flightData.departure.country}</div>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 px-4">
                  <div className="h-px bg-gradient-to-r from-green-500 via-cyan-400 to-red-500 flex-1"></div>
                  <Plane className="w-4 h-4 text-cyan-400" />
                  <div className="h-px bg-gradient-to-r from-cyan-400 to-red-500 flex-1"></div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-400">{flightData.arrival.iata}</div>
                  <div className="text-xs text-gray-500">{flightData.arrival.name}</div>
                  <div className="text-xs text-gray-600">{flightData.arrival.country}</div>
                </div>
              </div>
            </div>

            {/* Distance & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1f26] rounded-lg p-4 border border-cyan-400/10">
                <div className="text-xs text-gray-500 mb-1">Total Distance</div>
                <div className="text-2xl font-bold text-cyan-400">
                  {flightData.distance.toFixed(0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">kilometers</div>
              </div>
              <div className="bg-[#1a1f26] rounded-lg p-4 border border-cyan-400/10">
                <div className="text-xs text-gray-500 mb-1">Total Flight Time</div>
                <div className="text-2xl font-bold text-cyan-400">
                  {formatDuration(flightData.phases.total)}
                </div>
                <div className="text-xs text-gray-500 mt-1">duration</div>
              </div>
            </div>

            {/* Aircraft */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-400/20">
              <div className="text-xs text-gray-500 mb-2">Selected Aircraft</div>
              <div className="font-semibold text-white">{flightData.aircraft.name}</div>
              <div className="text-xs text-gray-400 mt-1">{flightData.aircraft.type}</div>
              <div className="text-xs text-gray-400">{flightData.aircraft.category}</div>
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
            {/* Visual Timeline / Segmented Bar */}
            <div>
              <div className="text-xs text-gray-500 mb-2">Phase Timeline</div>
              <div className="flex h-4 rounded-full overflow-hidden border border-cyan-400/20">
                {phaseData.map((phase, index) => (
                  <div
                    key={index}
                    className={`${phase.color} relative group cursor-pointer`}
                    style={{ width: `${phase.percent}%` }}
                    title={`${phase.name}: ${formatDuration(phase.time)} (${phase.percent.toFixed(1)}%)`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Details Table */}
            <div className="space-y-2">
              <div className="text-xs text-gray-500 mb-3">Time Breakdown</div>
              {phaseData.map((phase, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between text-sm p-3 rounded-lg transition-all ${
                    currentPhase === phase.name 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30' 
                      : 'bg-[#1a1f26] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${phase.color}`}></div>
                    <div>
                      <div className="font-medium text-white">{phase.name}</div>
                      <div className="text-xs text-gray-500">{phase.percent.toFixed(1)}% of total</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${phase.textColor}`}>{formatDuration(phase.time)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Time */}
            <div className="pt-3 border-t border-cyan-400/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 font-medium">Total Duration</span>
                <span className="font-bold text-cyan-400 text-lg">{formatDuration(flightData.phases.total)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Aircraft Performance Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f1419]/95 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-400/20 px-6 py-4">
            <h2 className="flex items-center gap-2 font-semibold text-lg">
              <Activity className="w-5 h-5 text-cyan-400" />
              Aircraft Performance
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Cruise Speed */}
              <div className="bg-[#1a1f26] rounded-lg p-4 border border-cyan-400/10">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  <div className="text-xs text-gray-500">Cruise Speed</div>
                </div>
                <div className="text-xl font-bold text-cyan-400">
                  {flightData.aircraft.cruiseSpeed}
                </div>
                <div className="text-xs text-gray-500 mt-1">km/h</div>
              </div>

              {/* Max Speed */}
              <div className="bg-[#1a1f26] rounded-lg p-4 border border-cyan-400/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <div className="text-xs text-gray-500">Max Speed</div>
                </div>
                <div className="text-xl font-bold text-cyan-400">
                  {flightData.aircraft.maxSpeed}
                </div>
                <div className="text-xs text-gray-500 mt-1">km/h</div>
              </div>

              {/* Mach Number */}
              <div className="bg-[#1a1f26] rounded-lg p-4 border border-cyan-400/10">
                <div className="text-xs text-gray-500 mb-2">Mach Number</div>
                <div className="text-xl font-bold text-cyan-400">
                  Mach {flightData.aircraft.machNumber.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 mt-1">cruise mach</div>
              </div>

              {/* Range */}
              <div className="bg-[#1a1f26] rounded-lg p-4 border border-cyan-400/10">
                <div className="text-xs text-gray-500 mb-2">Maximum Range</div>
                <div className="text-xl font-bold text-cyan-400">
                  {flightData.aircraft.range.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">kilometers</div>
              </div>

              {/* Cruise Altitude */}
              <div className="bg-[#1a1f26] rounded-lg p-4 border border-cyan-400/10">
                <div className="text-xs text-gray-500 mb-2">Cruise Altitude</div>
                <div className="text-xl font-bold text-cyan-400">
                  {(flightData.aircraft.cruiseAltitude / 1000).toFixed(1)}
                </div>
                <div className="text-xs text-gray-500 mt-1">kilometers</div>
              </div>

              {/* Climb Rate */}
              <div className="bg-[#1a1f26] rounded-lg p-4 border border-cyan-400/10">
                <div className="text-xs text-gray-500 mb-2">Climb Rate</div>
                <div className="text-xl font-bold text-cyan-400">
                  {flightData.aircraft.climbRate.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500 mt-1">meters/second</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
