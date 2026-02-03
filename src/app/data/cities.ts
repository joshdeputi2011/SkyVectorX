export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  iata: string;
}

export const majorCities: City[] = [
  // North America
  { name: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060, iata: 'JFK' },
  { name: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437, iata: 'LAX' },
  { name: 'Chicago', country: 'USA', lat: 41.8781, lon: -87.6298, iata: 'ORD' },
  { name: 'Miami', country: 'USA', lat: 25.7617, lon: -80.1918, iata: 'MIA' },
  { name: 'San Francisco', country: 'USA', lat: 37.7749, lon: -122.4194, iata: 'SFO' },
  { name: 'Seattle', country: 'USA', lat: 47.6062, lon: -122.3321, iata: 'SEA' },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832, iata: 'YYZ' },
  { name: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207, iata: 'YVR' },
  { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lon: -99.1332, iata: 'MEX' },
  
  // Europe
  { name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278, iata: 'LHR' },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, iata: 'CDG' },
  { name: 'Frankfurt', country: 'Germany', lat: 50.1109, lon: 8.6821, iata: 'FRA' },
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041, iata: 'AMS' },
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038, iata: 'MAD' },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964, iata: 'FCO' },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784, iata: 'IST' },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173, iata: 'SVO' },
  { name: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417, iata: 'ZRH' },
  
  // Asia
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, iata: 'NRT' },
  { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074, iata: 'PEK' },
  { name: 'Shanghai', country: 'China', lat: 31.2304, lon: 121.4737, iata: 'PVG' },
  { name: 'Hong Kong', country: 'Hong Kong', lat: 22.3193, lon: 114.1694, iata: 'HKG' },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198, iata: 'SIN' },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708, iata: 'DXB' },
  { name: 'Seoul', country: 'South Korea', lat: 37.5665, lon: 126.9780, iata: 'ICN' },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018, iata: 'BKK' },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777, iata: 'BOM' },
  { name: 'Delhi', country: 'India', lat: 28.7041, lon: 77.1025, iata: 'DEL' },
  
  // Oceania
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, iata: 'SYD' },
  { name: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631, iata: 'MEL' },
  { name: 'Auckland', country: 'New Zealand', lat: -36.8485, lon: 174.7633, iata: 'AKL' },
  
  // South America
  { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333, iata: 'GRU' },
  { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729, iata: 'GIG' },
  { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816, iata: 'EZE' },
  { name: 'Santiago', country: 'Chile', lat: -33.4489, lon: -70.6693, iata: 'SCL' },
  
  // Africa
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357, iata: 'CAI' },
  { name: 'Johannesburg', country: 'South Africa', lat: -26.2041, lon: 28.0473, iata: 'JNB' },
  { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lon: 3.3792, iata: 'LOS' },
  { name: 'Nairobi', country: 'Kenya', lat: -1.2864, lon: 36.8172, iata: 'NBO' }
];
