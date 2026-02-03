import { useState } from 'react';
import { Search, Plane } from 'lucide-react';
import { City, majorCities } from '@/app/data/cities';
import { Aircraft, aircraftDatabase } from '@/app/data/aircraft';
import { motion } from 'motion/react';

interface ControlPanelProps {
  departure: City | null;
  arrival: City | null;
  selectedAircraft: Aircraft | null;
  onDepartureChange: (city: City | null) => void;
  onArrivalChange: (city: City | null) => void;
  onAircraftChange: (aircraft: Aircraft | null) => void;
  onSimulate: () => void;
}

export function ControlPanel({
  departure,
  arrival,
  selectedAircraft,
  onDepartureChange,
  onArrivalChange,
  onAircraftChange,
  onSimulate
}: ControlPanelProps) {
  const [departureSearch, setDepartureSearch] = useState('');
  const [arrivalSearch, setArrivalSearch] = useState('');
  const [showDepartureResults, setShowDepartureResults] = useState(false);
  const [showArrivalResults, setShowArrivalResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Commercial', 'Military', 'Cargo', 'Private/Business'];

  const filteredDepartures = majorCities.filter(city =>
    `${city.name} ${city.country} ${city.iata}`
      .toLowerCase()
      .includes(departureSearch.toLowerCase())
  ).slice(0, 8);

  const filteredArrivals = majorCities.filter(city =>
    `${city.name} ${city.country} ${city.iata}`
      .toLowerCase()
      .includes(arrivalSearch.toLowerCase())
  ).slice(0, 8);

  const filteredAircraft = aircraftDatabase.filter(aircraft =>
    selectedCategory === 'All' || aircraft.category === selectedCategory
  );

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#0f1419]/95 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-400/20 px-6 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <Plane className="w-5 h-5 text-cyan-400" />
            Flight Route Control
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Departure Input */}
          <div className="space-y-2 relative z-30">
            <label className="block text-sm text-gray-400">
              Departure City
            </label>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={departure?.name || departureSearch}
                  onChange={(e) => {
                    setDepartureSearch(e.target.value);
                    setShowDepartureResults(true);
                    if (!e.target.value) onDepartureChange(null);
                  }}
                  onFocus={() => setShowDepartureResults(true)}
                  placeholder="Search city..."
                  className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
              
              {showDepartureResults && departureSearch && !departure && (
                <div className="absolute top-full mt-2 w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg overflow-hidden shadow-xl max-h-64 overflow-y-auto">
                  {filteredDepartures.map((city) => (
                    <button
                      key={city.iata}
                      onClick={() => {
                        onDepartureChange(city);
                        setDepartureSearch('');
                        setShowDepartureResults(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-cyan-500/10 transition-colors border-b border-gray-800/50 last:border-0"
                    >
                      <div className="font-medium text-sm">{city.name}</div>
                      <div className="text-xs text-gray-500">{city.country} ({city.iata})</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {departure && (
              <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                <div>
                  <div className="text-sm font-medium text-green-400">{departure.name}</div>
                  <div className="text-xs text-gray-500">{departure.country} ({departure.iata})</div>
                </div>
                <button
                  onClick={() => onDepartureChange(null)}
                  className="text-xs text-gray-500 hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Arrival Input */}
          <div className="space-y-2 relative z-20">
            <label className="block text-sm text-gray-400">
              Arrival City
            </label>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={arrival?.name || arrivalSearch}
                  onChange={(e) => {
                    setArrivalSearch(e.target.value);
                    setShowArrivalResults(true);
                    if (!e.target.value) onArrivalChange(null);
                  }}
                  onFocus={() => setShowArrivalResults(true)}
                  placeholder="Search city..."
                  className="w-full bg-[#1a1f26] border border-cyan-500/20 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
              
              {showArrivalResults && arrivalSearch && !arrival && (
                <div className="absolute top-full mt-2 w-full bg-[#1a1f26] border border-cyan-400/30 rounded-lg overflow-hidden shadow-xl max-h-64 overflow-y-auto z-50">
                  {filteredArrivals.map((city) => (
                    <button
                      key={city.iata}
                      onClick={() => {
                        onArrivalChange(city);
                        setArrivalSearch('');
                        setShowArrivalResults(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-cyan-500/10 transition-colors border-b border-gray-800/50 last:border-0"
                    >
                      <div className="font-medium text-sm">{city.name}</div>
                      <div className="text-xs text-gray-500">{city.country} ({city.iata})</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {arrival && (
              <div className="flex items-center justify-between bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <div>
                  <div className="text-sm font-medium text-red-400">{arrival.name}</div>
                  <div className="text-xs text-gray-500">{arrival.country} ({arrival.iata})</div>
                </div>
                <button
                  onClick={() => onArrivalChange(null)}
                  className="text-xs text-gray-500 hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Aircraft Selection */}
          <div className="space-y-3">
            <label className="block text-sm text-gray-400">
              Aircraft Selection
            </label>
            
            {/* Category Tabs */}
            <div className="flex gap-1 bg-[#1a1f26] p-1 rounded-lg overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Aircraft Cards */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {filteredAircraft.map((aircraft) => (
                <motion.button
                  key={aircraft.id}
                  onClick={() => onAircraftChange(aircraft)}
                  className={`w-full bg-[#1a1f26] rounded-lg p-3 text-left transition-all border ${
                    selectedAircraft?.id === aircraft.id
                      ? 'border-cyan-500 bg-cyan-500/5'
                      : 'border-transparent hover:border-cyan-500/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex gap-3">
                    <img
                      src={aircraft.imageUrl}
                      alt={aircraft.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{aircraft.name}</div>
                      <div className="text-xs text-gray-500 truncate">{aircraft.type}</div>
                      <div className="text-xs text-cyan-400 mt-1">
                        {aircraft.cruiseSpeed} km/h
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Simulate Button */}
          <motion.button
            onClick={onSimulate}
            disabled={!departure || !arrival || !selectedAircraft}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              departure && arrival && selectedAircraft
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
            whileHover={departure && arrival && selectedAircraft ? { scale: 1.02 } : {}}
            whileTap={departure && arrival && selectedAircraft ? { scale: 0.98 } : {}}
          >
            Simulate Flight
          </motion.button>
        </div>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1f26;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
}