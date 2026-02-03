export type SpeedUnit = 'km/h' | 'm/s' | 'mph' | 'knots' | 'mach';
export type DistanceUnit = 'km' | 'mi' | 'nm';
export type TimeUnit = 's' | 'min' | 'h';

// Speed conversions
export function convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number {
  if (from === to) return value;
  
  // Convert to km/h first
  let kmh: number;
  switch (from) {
    case 'km/h':
      kmh = value;
      break;
    case 'm/s':
      kmh = value * 3.6;
      break;
    case 'mph':
      kmh = value * 1.60934;
      break;
    case 'knots':
      kmh = value * 1.852;
      break;
    case 'mach':
      kmh = value * 1225.044; // at sea level
      break;
  }
  
  // Convert from km/h to target unit
  switch (to) {
    case 'km/h':
      return kmh;
    case 'm/s':
      return kmh / 3.6;
    case 'mph':
      return kmh / 1.60934;
    case 'knots':
      return kmh / 1.852;
    case 'mach':
      return kmh / 1225.044;
  }
}

// Distance conversions
export function convertDistance(value: number, from: DistanceUnit, to: DistanceUnit): number {
  if (from === to) return value;
  
  // Convert to km first
  let km: number;
  switch (from) {
    case 'km':
      km = value;
      break;
    case 'mi':
      km = value * 1.60934;
      break;
    case 'nm':
      km = value * 1.852;
      break;
  }
  
  // Convert from km to target unit
  switch (to) {
    case 'km':
      return km;
    case 'mi':
      return km / 1.60934;
    case 'nm':
      return km / 1.852;
  }
}

// Time conversions
export function convertTime(value: number, from: TimeUnit, to: TimeUnit): number {
  if (from === to) return value;
  
  // Convert to seconds first
  let seconds: number;
  switch (from) {
    case 's':
      seconds = value;
      break;
    case 'min':
      seconds = value * 60;
      break;
    case 'h':
      seconds = value * 3600;
      break;
  }
  
  // Convert from seconds to target unit
  switch (to) {
    case 's':
      return seconds;
    case 'min':
      return seconds / 60;
    case 'h':
      return seconds / 3600;
  }
}

export function formatSpeedUnit(unit: SpeedUnit): string {
  const labels: Record<SpeedUnit, string> = {
    'km/h': 'km/h',
    'm/s': 'm/s',
    'mph': 'mph',
    'knots': 'kn',
    'mach': 'Mach'
  };
  return labels[unit];
}

export function formatDistanceUnit(unit: DistanceUnit): string {
  const labels: Record<DistanceUnit, string> = {
    'km': 'km',
    'mi': 'mi',
    'nm': 'NM'
  };
  return labels[unit];
}

export function formatTimeUnit(unit: TimeUnit): string {
  const labels: Record<TimeUnit, string> = {
    's': 'seconds',
    'min': 'minutes',
    'h': 'hours'
  };
  return labels[unit];
}
