import { Aircraft } from '@/app/data/aircraft';
import { City } from '@/app/data/cities';

export interface FlightPhases {
  takeoff: number; // seconds
  climb: number; // seconds
  cruise: number; // seconds
  descent: number; // seconds
  landing: number; // seconds
  total: number; // seconds
}

export interface FlightData {
  distance: number; // km
  phases: FlightPhases;
  aircraft: Aircraft;
  departure: City;
  arrival: City;
}

// Calculate great circle distance between two points using Haversine formula
export function calculateGreatCircleDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// Calculate flight phases based on aircraft performance
export function calculateFlightPhases(
  distance: number,
  aircraft: Aircraft
): FlightPhases {
  // Standard phase durations (in seconds)
  const takeoffTime = 120; // 2 minutes
  const landingTime = 180; // 3 minutes
  
  // Calculate climb time based on cruise altitude and climb rate
  const climbTime = aircraft.cruiseAltitude / aircraft.climbRate;
  
  // Calculate descent time
  const descentTime = aircraft.cruiseAltitude / aircraft.descentRate;
  
  // Estimate horizontal distance covered during climb and descent
  const avgClimbSpeed = aircraft.cruiseSpeed * 0.7;
  const avgDescentSpeed = aircraft.cruiseSpeed * 0.85;
  
  const climbDistance = (avgClimbSpeed / 3600) * climbTime; // km
  const descentDistance = (avgDescentSpeed / 3600) * descentTime; // km
  
  // Calculate cruise distance
  const cruiseDistance = Math.max(0, distance - climbDistance - descentDistance);
  
  // Calculate cruise time
  const cruiseTime = (cruiseDistance / aircraft.cruiseSpeed) * 3600; // seconds
  
  const totalTime = takeoffTime + climbTime + cruiseTime + descentTime + landingTime;
  
  return {
    takeoff: takeoffTime,
    climb: climbTime,
    cruise: cruiseTime,
    descent: descentTime,
    landing: landingTime,
    total: totalTime
  };
}

// Generate points along a great circle path
export function generateGreatCirclePath(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  numPoints: number = 100
): Array<[number, number]> {
  const points: Array<[number, number]> = [];
  
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);
  
  const d = Math.acos(
    Math.sin(lat1Rad) * Math.sin(lat2Rad) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad)
  );
  
  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints;
    
    const a = Math.sin((1 - f) * d) / Math.sin(d);
    const b = Math.sin(f * d) / Math.sin(d);
    
    const x = a * Math.cos(lat1Rad) * Math.cos(lon1Rad) + b * Math.cos(lat2Rad) * Math.cos(lon2Rad);
    const y = a * Math.cos(lat1Rad) * Math.sin(lon1Rad) + b * Math.cos(lat2Rad) * Math.sin(lon2Rad);
    const z = a * Math.sin(lat1Rad) + b * Math.sin(lat2Rad);
    
    const lat = toDegrees(Math.atan2(z, Math.sqrt(x * x + y * y)));
    const lon = toDegrees(Math.atan2(y, x));
    
    points.push([lat, lon]);
  }
  
  return points;
}

// Format seconds to HH:MM:SS
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}
