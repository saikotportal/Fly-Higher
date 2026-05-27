// International Bus Routes Mock Data
export const BUS_OPERATORS = [
  { id: 'shyamoli', name: 'Shyamoli NR Travels', country: 'Bangladesh', rating: 4.2 },
  { id: 'green_line', name: 'Green Line', country: 'Bangladesh', rating: 4.0 },
  { id: 'hanif', name: 'Hanif Enterprise', country: 'Bangladesh', rating: 3.9 },
  { id: 'sohag', name: 'Sohag Paribahan', country: 'Bangladesh', rating: 3.8 },
  { id: 'tk_travels', name: 'TK Travels', country: 'India/Bangladesh', rating: 4.1 },
  { id: 'royal_coach', name: 'Royal Coach', country: 'Multi-country', rating: 4.3 },
];

export const BUS_TYPES = {
  AC: { name: 'AC Coach', multiplier: 1.4 },
  NON_AC: { name: 'Non-AC Coach', multiplier: 1 },
  SLEEPER: { name: 'AC Sleeper', multiplier: 2.0 },
  LUXURY: { name: 'Luxury Coach', multiplier: 1.8 },
};

export const BUS_ROUTES = [
  {
    id: 'bus001',
    from: 'Dhaka',
    fromCountry: 'Bangladesh',
    to: 'Kolkata',
    toCountry: 'India',
    via: 'Benapole Border',
    distance: '375 km',
    duration: '8h 00m',
    departure: '06:00',
    arrival: '14:00',
    baseFare: 1200,
    operators: ['shyamoli', 'green_line', 'hanif'],
    availableTypes: ['AC', 'NON_AC', 'LUXURY'],
    boardingPoints: ['Dhaka Kolyanpur', 'Dhaka Airport Road', 'Gazipur'],
    droppingPoints: ['Salt Lake', 'Park Street', 'Esplanade', 'Howrah Station'],
    amenities: ['AC', 'WiFi', 'Snacks', 'USB Charging'],
    visa: 'Indian Visa Required',
  },
  {
    id: 'bus002',
    from: 'Dhaka',
    fromCountry: 'Bangladesh',
    to: 'Kolkata',
    toCountry: 'India',
    via: 'Benapole Border',
    distance: '375 km',
    duration: '8h 30m',
    departure: '21:00',
    arrival: '05:30',
    baseFare: 1200,
    operators: ['shyamoli', 'sohag'],
    availableTypes: ['AC', 'SLEEPER'],
    boardingPoints: ['Dhaka Kolyanpur', 'Faridpur'],
    droppingPoints: ['Salt Lake', 'Esplanade', 'Howrah Station'],
    amenities: ['AC', 'WiFi', 'Blanket', 'USB Charging'],
    visa: 'Indian Visa Required',
  },
  {
    id: 'bus003',
    from: 'Dhaka',
    fromCountry: 'Bangladesh',
    to: 'Agartala',
    toCountry: 'India',
    via: 'Akhaura Border',
    distance: '135 km',
    duration: '5h 00m',
    departure: '08:00',
    arrival: '13:00',
    baseFare: 650,
    operators: ['hanif', 'sohag'],
    availableTypes: ['AC', 'NON_AC'],
    boardingPoints: ['Dhaka Sayedabad', 'Comilla'],
    droppingPoints: ['Agartala Bus Terminal'],
    amenities: ['AC', 'USB Charging'],
    visa: 'Indian Visa Required',
  },
  {
    id: 'bus004',
    from: 'Kolkata',
    fromCountry: 'India',
    to: 'Dhaka',
    toCountry: 'Bangladesh',
    via: 'Benapole Border',
    distance: '375 km',
    duration: '8h 00m',
    departure: '07:00',
    arrival: '15:00',
    baseFare: 1200,
    operators: ['shyamoli', 'green_line', 'tk_travels'],
    availableTypes: ['AC', 'NON_AC', 'LUXURY'],
    boardingPoints: ['Esplanade', 'Salt Lake', 'Howrah Station'],
    droppingPoints: ['Dhaka Kolyanpur', 'Dhaka Airport Road'],
    amenities: ['AC', 'WiFi', 'Snacks'],
    visa: 'Bangladesh Visa Required',
  },
  {
    id: 'bus005',
    from: 'Dhaka',
    fromCountry: 'Bangladesh',
    to: 'Kathmandu',
    toCountry: 'Nepal',
    via: 'Burimari Border',
    distance: '1450 km',
    duration: '36h 00m',
    departure: '08:00',
    arrival: '20:00',
    baseFare: 4500,
    operators: ['royal_coach'],
    availableTypes: ['AC', 'SLEEPER'],
    boardingPoints: ['Dhaka Kolyanpur'],
    droppingPoints: ['Kathmandu New Bus Park'],
    amenities: ['AC', 'WiFi', 'Meals', 'Blanket', 'USB Charging'],
    visa: 'Nepal Visa on Arrival',
    note: 'Multi-day journey with overnight stays',
  },
];

export function searchBuses(from, to, date) {
  const results = BUS_ROUTES.filter(
    (r) =>
      r.from.toLowerCase() === from.toLowerCase() &&
      r.to.toLowerCase() === to.toLowerCase()
  );

  return results.map((bus) => ({
    ...bus,
    date,
    seats: Math.floor(Math.random() * 35) + 5,
  }));
}

export const BUS_CITIES = [
  'Dhaka', 'Kolkata', 'Agartala', 'Kathmandu',
];
