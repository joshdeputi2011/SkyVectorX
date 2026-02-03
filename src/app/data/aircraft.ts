export interface Aircraft {
  id: string;
  name: string;
  type: string;
  category: 'Commercial' | 'Military' | 'Cargo' | 'Private/Business';
  cruiseSpeed: number; // km/h
  maxSpeed: number; // km/h
  machNumber: number;
  range: number; // km
  cruiseAltitude: number; // meters
  climbRate: number; // m/s
  descentRate: number; // m/s
  imageUrl: string;
}

export const aircraftDatabase: Aircraft[] = [
  // Commercial Aircraft
  {
    id: 'a320',
    name: 'Airbus A320',
    type: 'Narrow-body airliner',
    category: 'Commercial',
    cruiseSpeed: 840,
    maxSpeed: 871,
    machNumber: 0.82,
    range: 6150,
    cruiseAltitude: 11900,
    climbRate: 12.2,
    descentRate: 10.2,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400'
  },
  {
    id: 'b787',
    name: 'Boeing 787 Dreamliner',
    type: 'Wide-body airliner',
    category: 'Commercial',
    cruiseSpeed: 913,
    maxSpeed: 954,
    machNumber: 0.85,
    range: 13620,
    cruiseAltitude: 13100,
    climbRate: 14.5,
    descentRate: 11.3,
    imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400'
  },
  {
    id: 'a380',
    name: 'Airbus A380',
    type: 'Double-deck wide-body',
    category: 'Commercial',
    cruiseSpeed: 903,
    maxSpeed: 945,
    machNumber: 0.85,
    range: 15200,
    cruiseAltitude: 13100,
    climbRate: 11.8,
    descentRate: 9.8,
    imageUrl: 'https://images.unsplash.com/photo-1583196443670-91c8dd003d98?w=400'
  },
  {
    id: 'b737',
    name: 'Boeing 737 MAX',
    type: 'Narrow-body airliner',
    category: 'Commercial',
    cruiseSpeed: 842,
    maxSpeed: 876,
    machNumber: 0.79,
    range: 6570,
    cruiseAltitude: 12500,
    climbRate: 13.1,
    descentRate: 10.5,
    imageUrl: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400'
  },
  
  // Military Aircraft
  {
    id: 'f35',
    name: 'F-35 Lightning II',
    type: 'Multirole fighter',
    category: 'Military',
    cruiseSpeed: 1450,
    maxSpeed: 1975,
    machNumber: 1.6,
    range: 2220,
    cruiseAltitude: 15240,
    climbRate: 254,
    descentRate: 152,
    imageUrl: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400'
  },
  {
    id: 'f22',
    name: 'F-22 Raptor',
    type: 'Air superiority fighter',
    category: 'Military',
    cruiseSpeed: 1960,
    maxSpeed: 2410,
    machNumber: 2.25,
    range: 2960,
    cruiseAltitude: 19800,
    climbRate: 305,
    descentRate: 183,
    imageUrl: 'https://images.unsplash.com/photo-1583952892650-ba5eb30a65b3?w=400'
  },
  {
    id: 'c130',
    name: 'C-130 Hercules',
    type: 'Military transport',
    category: 'Military',
    cruiseSpeed: 592,
    maxSpeed: 671,
    machNumber: 0.54,
    range: 3800,
    cruiseAltitude: 10000,
    climbRate: 9.8,
    descentRate: 8.2,
    imageUrl: 'https://images.unsplash.com/photo-1577863957484-7e0c4e794ad5?w=400'
  },
  
  // Cargo Aircraft
  {
    id: 'b747f',
    name: 'Boeing 747-8F',
    type: 'Wide-body freighter',
    category: 'Cargo',
    cruiseSpeed: 908,
    maxSpeed: 939,
    machNumber: 0.845,
    range: 8130,
    cruiseAltitude: 13100,
    climbRate: 10.2,
    descentRate: 8.9,
    imageUrl: 'https://images.unsplash.com/photo-1569154156633-11ce83c2b48d?w=400'
  },
  {
    id: 'an124',
    name: 'Antonov An-124',
    type: 'Strategic airlift',
    category: 'Cargo',
    cruiseSpeed: 865,
    maxSpeed: 865,
    machNumber: 0.71,
    range: 4800,
    cruiseAltitude: 12000,
    climbRate: 8.5,
    descentRate: 7.3,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400'
  },
  
  // Private/Business Aircraft
  {
    id: 'g650',
    name: 'Gulfstream G650',
    type: 'Ultra-long-range business jet',
    category: 'Private/Business',
    cruiseSpeed: 956,
    maxSpeed: 982,
    machNumber: 0.925,
    range: 13890,
    cruiseAltitude: 15545,
    climbRate: 18.3,
    descentRate: 12.7,
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400'
  },
  {
    id: 'citation',
    name: 'Cessna Citation X',
    type: 'Business jet',
    category: 'Private/Business',
    cruiseSpeed: 972,
    maxSpeed: 1126,
    machNumber: 0.935,
    range: 6019,
    cruiseAltitude: 15545,
    climbRate: 17.8,
    descentRate: 12.2,
    imageUrl: 'https://images.unsplash.com/photo-1583952892650-ba5eb30a65b3?w=400'
  },
  {
    id: 'learjet',
    name: 'Bombardier Learjet 75',
    type: 'Light business jet',
    category: 'Private/Business',
    cruiseSpeed: 861,
    maxSpeed: 861,
    machNumber: 0.81,
    range: 3704,
    cruiseAltitude: 15545,
    climbRate: 16.5,
    descentRate: 11.4,
    imageUrl: 'https://images.unsplash.com/photo-1559496417-e7f25c2e6f28?w=400'
  }
];
