'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plane, ArrowRight, Search, ArrowLeftRight, Clock } from 'lucide-react';
import { searchFlights, AIRPORTS, AIRLINES } from '@/data/flights';
import { getTomorrowString } from '@/lib/utils';
import FlightCard from '@/components/search/FlightCard';
import FilterSidebar from '@/components/search/FilterSidebar';

function FlightSearchInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [from, setFrom] = useState(searchParams.get('from') || '');
  const [to, setTo] = useState(searchParams.get('to') || '');
  const [date, setDate] = useState(searchParams.get('date') || getTomorrowString());
  const [tripType, setTripType] = useState('one-way');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (searchParams.get('from') && searchParams.get('to')) {
      handleSearch(searchParams.get('from'), searchParams.get('to'), searchParams.get('date') || getTomorrowString());
    }
  }, []);

  const handleSearch = (f = from, t = to, d = date) => {
    const res = searchFlights(f, t, d, tripType);
    setResults(res);
    setSearched(true);
  };

  const swap = () => { const tmp = from; setFrom(to); setTo(tmp); };

  const filteredResults = results.filter(flight => {
    if (filters.maxPrice && flight.baseFare > filters.maxPrice) return false;
    if (filters.stops !== undefined && filters.stops !== null && flight.stops > filters.stops) return false;
    if (filters.airlines?.length) {
      if (!filters.airlines.includes(flight.airlineCode)) return false;
    }
    if (filters.times?.length) {
      const [h] = flight.departure.split(':').map(Number);
      const matched = filters.times.some(t => {
        if (t === '00:00–06:00') return h < 6;
        if (t === '06:00–12:00') return h >= 6 && h < 12;
        if (t === '12:00–18:00') return h >= 12 && h < 18;
        if (t === '18:00–24:00') return h >= 18;
        return true;
      });
      if (!matched) return false;
    }
    return true;
  });

  const fromAirport = AIRPORTS.find(a => a.code === from);
  const toAirport = AIRPORTS.find(a => a.code === to);

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Search bar */}
      <div className="bg-gradient-to-r from-slate-900 to-sky-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Plane className="w-4 h-4" /><span>Flight Search</span>
          </div>

          {/* Trip type toggle */}
          <div className="flex gap-2 mb-4">
            {['one-way', 'round-trip'].map(type => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  tripType === type
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {type === 'one-way' ? 'One Way' : 'Round Trip'}
              </button>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* From */}
              <div className="flex-1">
                <select value={from} onChange={e => setFrom(e.target.value)} className="input-base">
                  <option value="">From airport</option>
                  {AIRPORTS.map(a => (
                    <option key={a.code} value={a.code}>
                      {a.code} — {a.city}, {a.country}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={swap} className="p-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all self-center">
                <ArrowLeftRight className="w-4 h-4" />
              </button>

              {/* To */}
              <div className="flex-1">
                <select value={to} onChange={e => setTo(e.target.value)} className="input-base">
                  <option value="">To airport</option>
                  {AIRPORTS.filter(a => a.code !== from).map(a => (
                    <option key={a.code} value={a.code}>
                      {a.code} — {a.city}, {a.country}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setDate(e.target.value)}
                className="input-base sm:w-40"
              />

              <button
                onClick={() => handleSearch()}
                disabled={!from || !to}
                className="btn-primary flex items-center gap-2 !py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <Search className="w-4 h-4" /> Search
              </button>
            </div>

            {/* Airport detail pills */}
            {(fromAirport || toAirport) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {fromAirport && (
                  <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">
                    ✈ {fromAirport.name}
                  </span>
                )}
                {toAirport && (
                  <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">
                    ✈ {toAirport.name}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {!searched ? (
          <div className="text-center py-24 text-slate-400">
            <Plane className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">Search for flights above to get started</p>
            <p className="text-sm mt-2 opacity-70">Find the best fares across all major airlines</p>
          </div>
        ) : (
          <div className="flex gap-6">
            <div className="hidden lg:block w-64 shrink-0">
              <FilterSidebar filters={filters} onChange={setFilters} type="flights" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-600 text-sm">
                  {filteredResults.length > 0 ? (
                    <>
                      <span className="font-bold text-slate-900">{filteredResults.length}</span> flights from{' '}
                      <span className="font-semibold">{from}</span>{' '}
                      <ArrowRight className="inline w-3 h-3" />{' '}
                      <span className="font-semibold">{to}</span>
                    </>
                  ) : (
                    'No flights found for this route'
                  )}
                </p>
                {filteredResults.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>Prices in BDT</span>
                  </div>
                )}
              </div>

              {filteredResults.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
                  <Plane className="w-12 h-12 mx-auto mb-4 text-slate-200" />
                  <p className="text-slate-500 font-medium">No flights found</p>
                  <p className="text-slate-400 text-sm mt-1">Try a different route or adjust your filters</p>
                </div>
              ) : (
                filteredResults.map(flight => (
                  <FlightCard key={flight.id} flight={flight} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <FlightSearchInner />
    </Suspense>
  );
}
