import { motion } from 'motion/react';
import { Plane, MapPin, Activity, Users, Database, Globe } from 'lucide-react';
import { Footer } from './Footer';

export function AboutPage() {
  const features = [
    {
      icon: MapPin,
      title: 'Great Circle Routes',
      description: 'Accurate geodesic path calculations using the Haversine formula for real-world flight planning'
    },
    {
      icon: Activity,
      title: 'Performance Simulation',
      description: 'Physics-based flight phase modeling including takeoff, climb, cruise, descent, and landing'
    },
    {
      icon: Database,
      title: 'Aircraft Database',
      description: 'Comprehensive specifications for commercial, military, cargo, and private aircraft'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Major airports and cities worldwide with accurate coordinates and IATA codes'
    }
  ];

  const useCases = [
    'Engineering Students',
    'Aerospace Enthusiasts',
    'Research Demonstrations',
    'Flight Planning Education',
    'Aviation Professionals',
    'Startup MVP Presentations'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#0f1419] pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl">
              <Plane className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4">About SkyVectorX</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A precision flight navigation platform delivering advanced route visualization and aircraft 
            performance simulation for aviation professionals and aerospace enthusiasts.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-center">Core Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-[#0f1419]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0f1419]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 mb-12"
        >
          <h2 className="mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            Perfect For
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg px-4 py-3 text-center border border-cyan-500/20"
              >
                {useCase}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f1419]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 mb-12"
        >
          <h2 className="mb-6">Technical Approach</h2>
          <div className="space-y-4 text-gray-400">
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-white">Great Circle Calculations:</span> Uses the Haversine formula 
                to compute accurate geodesic distances between departure and arrival points on Earth's surface
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-white">Flight Phase Modeling:</span> Computes realistic flight times 
                based on aircraft-specific performance characteristics including climb rates, cruise speeds, and descent profiles
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-white">Unit Conversion System:</span> Physics-aware conversions 
                between km/h, knots, Mach, kilometers, nautical miles, and various time units
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-white">Interactive Visualization:</span> Real-time map rendering 
                with curved flight paths, animated aircraft movement, and detailed performance metrics
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center"
        >
          <h3 className="mb-2 text-yellow-400">Academic & Educational Use</h3>
          <p className="text-sm text-gray-400">
            This platform is designed for educational, research, and demonstration purposes. 
            Flight calculations are simplified models and should not be used for actual flight planning. 
            Always consult official aviation resources and certified flight planning tools for real operations.
          </p>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>Data Sources: OpenStreetMap • Aviation Performance Databases • GIS Systems</p>
          <p className="mt-2">Built with React, TypeScript, Leaflet, and Motion</p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}