import { Plane, Navigation as NavIcon, Globe, MapPin, Radar } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    { name: 'Home', icon: Globe },
    { name: 'Routes', icon: MapPin },
    { name: 'Flights', icon: Plane },
    { name: 'Airports', icon: NavIcon },
    { name: 'Explore', icon: Radar }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-cyan-400/10">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            onClick={() => onTabChange('Home')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-cyan-400 to-blue-500 p-2.5 rounded-lg">
                <Plane className="w-5 h-5 text-[#0a0e1a]" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-wider text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.05em' }}>
              SkyVectorX
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <motion.button
                  key={item.name}
                  onClick={() => onTabChange(item.name)}
                  className={`relative px-5 py-2.5 rounded-xl transition-all font-medium text-sm ${
                    isActive
                      ? 'text-cyan-300'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30"
                      style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)' }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
