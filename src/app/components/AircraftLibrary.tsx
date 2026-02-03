import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plane, Gauge, TrendingUp, Layers } from 'lucide-react';
import { aircraftDatabase, Aircraft } from '@/app/data/aircraft';

export function AircraftLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);

  const categories = ['All', 'Commercial', 'Military', 'Cargo', 'Private/Business'];

  const filteredAircraft = aircraftDatabase.filter(aircraft =>
    selectedCategory === 'All' || aircraft.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#0f1419] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 flex items-center gap-3">
            <Plane className="w-8 h-8 text-cyan-400" />
            Aircraft Library
          </h1>
          <p className="text-gray-400">
            Explore our comprehensive database of commercial, military, cargo, and private aircraft
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8 bg-[#1a1f26]/50 p-2 rounded-xl backdrop-blur-sm inline-flex"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-lg transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Aircraft Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAircraft.map((aircraft, index) => (
            <motion.div
              key={aircraft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0f1419]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer group"
              onClick={() => setSelectedAircraft(aircraft)}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {/* Aircraft Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-b from-cyan-500/10 to-transparent">
                <img
                  src={aircraft.imageUrl}
                  alt={aircraft.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-400">
                  {aircraft.category}
                </div>
              </div>

              {/* Aircraft Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="mb-1">{aircraft.name}</h3>
                  <p className="text-sm text-gray-400">{aircraft.type}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Cruise Speed</div>
                    <div className="font-medium text-cyan-400">{aircraft.cruiseSpeed} km/h</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Range</div>
                    <div className="font-medium text-cyan-400">{aircraft.range.toLocaleString()} km</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Mach</div>
                    <div className="font-medium text-cyan-400">{aircraft.machNumber}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Altitude</div>
                    <div className="font-medium text-cyan-400">{(aircraft.cruiseAltitude / 1000).toFixed(1)} km</div>
                  </div>
                </div>

                <button className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg text-sm text-cyan-400 transition-all">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aircraft Detail Modal */}
        <AnimatePresence>
          {selectedAircraft && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAircraft(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-[#0f1419] rounded-2xl border border-cyan-500/30 shadow-2xl z-50 overflow-hidden"
              >
                {/* Header */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-b from-cyan-500/20 to-transparent">
                  <img
                    src={selectedAircraft.imageUrl}
                    alt={selectedAircraft.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedAircraft(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-6">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm font-medium text-cyan-400 inline-block mb-2">
                      {selectedAircraft.category}
                    </div>
                    <h2 className="mb-1">{selectedAircraft.name}</h2>
                    <p className="text-gray-400">{selectedAircraft.type}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="mb-6 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-cyan-400" />
                    Performance Specifications
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-[#1a1f26] rounded-xl p-4 border border-cyan-500/10">
                      <div className="text-sm text-gray-500 mb-2">Cruise Speed</div>
                      <div className="text-2xl font-semibold text-cyan-400 mb-1">
                        {selectedAircraft.cruiseSpeed}
                      </div>
                      <div className="text-xs text-gray-500">km/h</div>
                    </div>

                    <div className="bg-[#1a1f26] rounded-xl p-4 border border-cyan-500/10">
                      <div className="text-sm text-gray-500 mb-2">Maximum Speed</div>
                      <div className="text-2xl font-semibold text-cyan-400 mb-1">
                        {selectedAircraft.maxSpeed}
                      </div>
                      <div className="text-xs text-gray-500">km/h</div>
                    </div>

                    <div className="bg-[#1a1f26] rounded-xl p-4 border border-cyan-500/10">
                      <div className="text-sm text-gray-500 mb-2">Mach Number</div>
                      <div className="text-2xl font-semibold text-cyan-400 mb-1">
                        {selectedAircraft.machNumber}
                      </div>
                      <div className="text-xs text-gray-500">at cruise</div>
                    </div>

                    <div className="bg-[#1a1f26] rounded-xl p-4 border border-cyan-500/10">
                      <div className="text-sm text-gray-500 mb-2">Range</div>
                      <div className="text-2xl font-semibold text-cyan-400 mb-1">
                        {selectedAircraft.range.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">kilometers</div>
                    </div>

                    <div className="bg-[#1a1f26] rounded-xl p-4 border border-cyan-500/10">
                      <div className="text-sm text-gray-500 mb-2">Cruise Altitude</div>
                      <div className="text-2xl font-semibold text-cyan-400 mb-1">
                        {(selectedAircraft.cruiseAltitude / 1000).toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">km</div>
                    </div>

                    <div className="bg-[#1a1f26] rounded-xl p-4 border border-cyan-500/10">
                      <div className="text-sm text-gray-500 mb-2">Climb Rate</div>
                      <div className="text-2xl font-semibold text-cyan-400 mb-1">
                        {selectedAircraft.climbRate.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">m/s</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
