// International Flights Mock Data
export const AIRPORTS = [
  { code: 'DAC', name: 'Hazrat Shahjalal International', city: 'Dhaka', country: 'Bangladesh' },
  { code: 'CGP', name: 'Shah Amanat International', city: 'Chittagong', country: 'Bangladesh' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'UAE' },
  { code: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'SIN', name: 'Changi International', city: 'Singapore', country: 'Singapore' },
  { code: 'BKK', name: 'Suvarnabhumi International', city: 'Bangkok', country: 'Thailand' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan' },
  { code: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji International', city: 'Mumbai', country: 'India' },
  { code: 'CMB', name: 'Bandaranaike International', city: 'Colombo', country: 'Sri Lanka' },
  { code: 'KTM', name: 'Tribhuvan International', city: 'Kathmandu', country: 'Nepal' },
  { code: 'RUH', name: 'King Khalid International', city: 'Riyadh', country: 'Saudi Arabia' },
  { code: 'JED', name: 'King Abdulaziz International', city: 'Jeddah', country: 'Saudi Arabia' },
  { code: 'MSC', name: 'Al Masna\'a International', city: 'Muscat', country: 'Oman' },
];

export const AIRLINES = [
  { code: 'BG', name: 'Biman Bangladesh Airlines', country: 'Bangladesh', color: '#006400' },
  { code: 'EK', name: 'Emirates', country: 'UAE', color: '#D71920' },
  { code: 'QR', name: 'Qatar Airways', country: 'Qatar', color: '#5C0632' },
  { code: 'MH', name: 'Malaysia Airlines', country: 'Malaysia', color: '#003087' },
  { code: 'SQ', name: 'Singapore Airlines', country: 'Singapore', color: '#003087' },
  { code: 'TG', name: 'Thai Airways', country: 'Thailand', color: '#6E2280' },
  { code: 'EY', name: 'Etihad Airways', country: 'UAE', color: '#BE8B2A' },
  { code: 'BA', name: 'British Airways', country: 'UK', color: '#075AAA' },
  { code: 'LH', name: 'Lufthansa', country: 'Germany', color: '#05164D' },
  { code: 'AI', name: 'Air India', country: 'India', color: '#E31E24' },
  { code: 'SV', name: 'Saudi Arabian Airlines', country: 'Saudi Arabia', color: '#006400' },
  { code: 'WY', name: 'Oman Air', country: 'Oman', color: '#C8102E' },
];

const FLIGHT_ROUTES = [
  { from: 'DAC', to: 'DXB', duration: '5h 30m', airlines: ['BG', 'EK', 'EY'], baseFare: 32000, stops: 0 },
  { from: 'DAC', to: 'KUL', duration: '4h 10m', airlines: ['BG', 'MH'], baseFare: 22000, stops: 0 },
  { from: 'DAC', to: 'SIN', duration: '4h 30m', airlines: ['BG', 'SQ'], baseFare: 28000, stops: 0 },
  { from: 'DAC', to: 'DOH', duration: '5h 00m', airlines: ['BG', 'QR'], baseFare: 29000, stops: 0 },
  { from: 'DAC', to: 'BKK', duration: '3h 30m', airlines: ['BG', 'TG'], baseFare: 18000, stops: 0 },
  { from: 'DAC', to: 'LHR', duration: '12h 00m', airlines: ['BG', 'EK', 'QR'], baseFare: 65000, stops: 1 },
  { from: 'DAC', to: 'JFK', duration: '16h 30m', airlines: ['BG', 'EK', 'QR'], baseFare: 90000, stops: 1 },
  { from: 'DAC', to: 'CDG', duration: '13h 00m', airlines: ['BG', 'EK', 'LH'], baseFare: 68000, stops: 1 },
  { from: 'DAC', to: 'FRA', duration: '11h 30m', airlines: ['LH', 'EK', 'QR'], baseFare: 62000, stops: 1 },
  { from: 'DAC', to: 'NRT', duration: '8h 00m', airlines: ['BG', 'MH', 'SQ'], baseFare: 42000, stops: 1 },
  { from: 'DAC', to: 'DEL', duration: '2h 00m', airlines: ['BG', 'AI'], baseFare: 10000, stops: 0 },
  { from: 'DAC', to: 'BOM', duration: '3h 00m', airlines: ['BG', 'AI'], baseFare: 14000, stops: 0 },
  { from: 'DAC', to: 'CMB', duration: '2h 30m', airlines: ['BG'], baseFare: 15000, stops: 0 },
  { from: 'DAC', to: 'KTM', duration: '1h 20m', airlines: ['BG'], baseFare: 9000, stops: 0 },
  { from: 'DAC', to: 'RUH', duration: '5h 30m', airlines: ['BG', 'SV'], baseFare: 31000, stops: 0 },
  { from: 'DAC', to: 'JED', duration: '6h 00m', airlines: ['BG', 'SV', 'EK'], baseFare: 33000, stops: 0 },
  { from: 'CGP', to: 'DXB', duration: '6h 00m', airlines: ['EK'], baseFare: 34000, stops: 0 },
  { from: 'CGP', to: 'KUL', duration: '4h 30m', airlines: ['MH'], baseFare: 24000, stops: 0 },
  { from: 'DXB', to: 'DAC', duration: '5h 30m', airlines: ['EK', 'BG', 'EY'], baseFare: 32000, stops: 0 },
  { from: 'KUL', to: 'DAC', duration: '4h 10m', airlines: ['MH', 'BG'], baseFare: 22000, stops: 0 },
  { from: 'LHR', to: 'DAC', duration: '12h 00m', airlines: ['BA', 'EK', 'BG'], baseFare: 65000, stops: 1 },
];

const DEPARTURE_TIMES = [
  '01:30', '04:15', '06:00', '07:30', '08:45',
  '10:00', '11:30', '13:00', '14:30', '16:00',
  '17:30', '19:00', '20:30', '22:00', '23:15',
];

function addDuration(time, duration) {
  const [h, m] = time.split(':').map(Number);
  const [dh, dm] = duration.replace('h ', ':').replace('m', '').split(':').map(Number);
  let totalMin = h * 60 + m + dh * 60 + dm;
  const nextDay = totalMin >= 24 * 60;
  totalMin = totalMin % (24 * 60);
  const rh = Math.floor(totalMin / 60).toString().padStart(2, '0');
  const rm = (totalMin % 60).toString().padStart(2, '0');
  return { time: `${rh}:${rm}`, nextDay };
}

export function searchFlights(from, to, date, tripType = 'one-way') {
  const routes = FLIGHT_ROUTES.filter(
    (r) =>
      r.from.toUpperCase() === from.toUpperCase() &&
      r.to.toUpperCase() === to.toUpperCase()
  );

  if (routes.length === 0) return [];

  const results = [];

  routes.forEach((route) => {
    route.airlines.forEach((airlineCode, idx) => {
      const airline = AIRLINES.find((a) => a.code === airlineCode);
      const departure = DEPARTURE_TIMES[(idx * 5 + routes.indexOf(route) * 3) % DEPARTURE_TIMES.length];
      const { time: arrival, nextDay } = addDuration(departure, route.duration);
      const fareVariance = 1 + (Math.random() * 0.3 - 0.1);
      const baseFare = Math.round(route.baseFare * fareVariance / 100) * 100;

      results.push({
        id: `fl-${route.from}-${route.to}-${airlineCode}-${idx}`,
        airline,
        flightNumber: `${airlineCode}${Math.floor(Math.random() * 900) + 100}`,
        from: AIRPORTS.find((a) => a.code === route.from),
        to: AIRPORTS.find((a) => a.code === route.to),
        departure,
        arrival,
        nextDay,
        duration: route.duration,
        stops: route.stops,
        date,
        fare: {
          economy: baseFare,
          business: Math.round(baseFare * 2.8 / 100) * 100,
          first: Math.round(baseFare * 4.5 / 100) * 100,
        },
        seats: {
          economy: Math.floor(Math.random() * 80) + 20,
          business: Math.floor(Math.random() * 20) + 5,
          first: Math.floor(Math.random() * 8) + 2,
        },
        baggage: '23kg',
        meal: true,
        refundable: Math.random() > 0.5,
      });
    });
  });

  return results.sort((a, b) => a.fare.economy - b.fare.economy);
}

export function getPopularRoutes() {
  return [
    { from: 'DAC', to: 'DXB', price: 32000, image: 'dubai' },
    { from: 'DAC', to: 'KUL', price: 22000, image: 'kuala-lumpur' },
    { from: 'DAC', to: 'BKK', price: 18000, image: 'bangkok' },
    { from: 'DAC', to: 'DOH', price: 29000, image: 'doha' },
    { from: 'DAC', to: 'SIN', price: 28000, image: 'singapore' },
    { from: 'DAC', to: 'LHR', price: 65000, image: 'london' },
  ];
}
