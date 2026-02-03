import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { City } from '@/app/data/cities';
import { generateGreatCirclePath } from '@/app/utils/flightCalculations';
import 'leaflet/dist/leaflet.css';

interface FlightMapProps {
  departure: City | null;
  arrival: City | null;
  animationProgress?: number;
}

// Create icons as constants to avoid recreation
const departureIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#10b981" stroke="#059669" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const arrivalIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const aircraftIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 20L12 16L20 20L12 2Z" fill="#06b6d4" stroke="#0891b2" stroke-width="1"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Component to fit map bounds
function MapBounds({ departure, arrival }: { departure: City | null; arrival: City | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (departure && arrival) {
      const bounds: LatLngExpression[] = [
        [departure.lat, departure.lon],
        [arrival.lat, arrival.lon]
      ];
      map.fitBounds(bounds, { padding: [100, 100], maxZoom: 5 });
    } else if (departure || arrival) {
      const city = departure || arrival;
      if (city) {
        map.setView([city.lat, city.lon], 4);
      }
    }
  }, [departure, arrival, map]);
  
  return null;
}

// Map content component
function MapContent({ 
  departure, 
  arrival, 
  path,
  animationProgress 
}: { 
  departure: City | null; 
  arrival: City | null;
  path: Array<[number, number]>;
  animationProgress: number;
}) {
  const aircraftPosition = useMemo(() => {
    if (path.length === 0 || animationProgress <= 0 || animationProgress >= 1) {
      return null;
    }
    const index = Math.floor(animationProgress * (path.length - 1));
    return path[index];
  }, [path, animationProgress]);

  return (
    <>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      
      <MapBounds departure={departure} arrival={arrival} />
      
      {departure && (
        <Marker position={[departure.lat, departure.lon] as LatLngExpression} icon={departureIcon}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">{departure.name}</div>
              <div className="text-gray-500">{departure.country} ({departure.iata})</div>
              <div className="text-xs text-green-600 mt-1">Departure</div>
            </div>
          </Popup>
        </Marker>
      )}
      
      {arrival && (
        <Marker position={[arrival.lat, arrival.lon] as LatLngExpression} icon={arrivalIcon}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">{arrival.name}</div>
              <div className="text-gray-500">{arrival.country} ({arrival.iata})</div>
              <div className="text-xs text-red-600 mt-1">Arrival</div>
            </div>
          </Popup>
        </Marker>
      )}
      
      {path.length > 0 && (
        <>
          <Polyline
            positions={path as LatLngExpression[]}
            pathOptions={{
              color: '#06b6d4',
              weight: 2,
              opacity: 0.6,
              dashArray: '10, 10'
            }}
          />
          
          {aircraftPosition && (
            <Marker position={aircraftPosition as LatLngExpression} icon={aircraftIcon}>
              <Popup>Aircraft Position</Popup>
            </Marker>
          )}
        </>
      )}
    </>
  );
}

export function FlightMap({ departure, arrival, animationProgress = 0 }: FlightMapProps) {
  const path = useMemo(() => {
    return departure && arrival
      ? generateGreatCirclePath(departure.lat, departure.lon, arrival.lat, arrival.lon, 100)
      : [];
  }, [departure, arrival]);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full"
        style={{ background: '#0f1419' }}
        zoomControl={true}
        attributionControl={false}
      >
        <MapContent 
          departure={departure} 
          arrival={arrival} 
          path={path}
          animationProgress={animationProgress}
        />
      </MapContainer>
      
      {/* Grid overlay effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.3) 25%, rgba(6, 182, 212, 0.3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.3) 75%, rgba(6, 182, 212, 0.3) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.3) 25%, rgba(6, 182, 212, 0.3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.3) 75%, rgba(6, 182, 212, 0.3) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
