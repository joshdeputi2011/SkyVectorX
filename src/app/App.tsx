import { useState } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { HomePage } from '@/app/components/HomePage';
import { FlightMap } from '@/app/components/FlightMap';
import { ControlPanel } from '@/app/components/ControlPanel';
import { InfoPanel } from '@/app/components/InfoPanel';
import { AircraftLibrary } from '@/app/components/AircraftLibrary';
import { UnitsConverter } from '@/app/components/UnitsConverter';
import { AboutPage } from '@/app/components/AboutPage';
import { SimulationView } from '@/app/components/SimulationView';
import { City, majorCities } from '@/app/data/cities';
import { Aircraft, aircraftDatabase } from '@/app/data/aircraft';
import { 
  calculateGreatCircleDistance, 
  calculateFlightPhases,
  FlightData 
} from '@/app/utils/flightCalculations';
import { SpeedUnit, DistanceUnit } from '@/app/utils/unitConversions';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [departure, setDeparture] = useState<City | null>(null);
  const [arrival, setArrival] = useState<City | null>(null);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>('km/h');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');

  const handleSimulate = () => {
    if (!departure || !arrival || !selectedAircraft) return;

    const distance = calculateGreatCircleDistance(
      departure.lat,
      departure.lon,
      arrival.lat,
      arrival.lon
    );

    const phases = calculateFlightPhases(distance, selectedAircraft);

    const data: FlightData = {
      distance,
      phases,
      aircraft: selectedAircraft,
      departure,
      arrival
    };

    setFlightData(data);
    setActiveTab('Flights');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomePage onNavigate={setActiveTab} />;

      case 'Routes':
        return (
          <div className="min-h-screen pt-20 bg-[#0a0e1a] flex">
            {/* Left Sidebar - Control Panel */}
            <div className="w-96 flex-shrink-0 bg-[#0a0e1a] border-r border-cyan-400/10 overflow-y-auto" style={{ height: 'calc(100vh - 5rem)' }}>
              <div className="p-6">
                <ControlPanel
                  departure={departure}
                  arrival={arrival}
                  selectedAircraft={selectedAircraft}
                  onDepartureChange={setDeparture}
                  onArrivalChange={setArrival}
                  onAircraftChange={setSelectedAircraft}
                  onSimulate={handleSimulate}
                />
              </div>
            </div>
            
            {/* Right Side - Map Container */}
            <div className="flex-1 relative" style={{ height: 'calc(100vh - 5rem)' }}>
              <FlightMap 
                departure={departure} 
                arrival={arrival}
              />
              
              {/* Info Panel - Floating on map */}
              {flightData && (
                <div className="absolute top-6 right-6 z-20">
                  <InfoPanel 
                    flightData={flightData}
                    speedUnit={speedUnit}
                    distanceUnit={distanceUnit}
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'Airports':
        return <AircraftLibrary />;

      case 'Flights':
        return (
          <div className="min-h-screen pt-20 bg-[#0a0e1a]">
            <SimulationView flightData={flightData} />
          </div>
        );

      case 'Explore':
        return <UnitsConverter />;

      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="dark min-h-screen bg-[#0a0e1a] text-white">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}