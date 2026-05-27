'use client';
import { useRouter } from 'next/navigation';
import { Plane, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';

const CABIN_CLASSES = {
  ECONOMY: { name: 'Economy', multiplier: 1 },
  BUSINESS: { name: 'Business', multiplier: 3.2 },
  FIRST: { name: 'First Class', multiplier: 6 },
};

export default function FlightCard({ flight }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const { format } = useCurrency();
  const router = useRouter();

  const handleBook = () => {
    if (!selectedCabin) return;
    const fare = Math.round(flight.baseFare * CABIN_CLASSES[selectedCabin].multiplier);
    const params = new URLSearchParams({
      type: 'flight',
      id: flight.id,
      airline: flight.airlineName,
      from: flight.fromCity,
      to: flight.toCity,
      fromCode: flight.from,
      toCode: flight.to,
      date: flight.date,
      departure: flight.departure,
      arrival: flight.arrival,
      duration: flight.duration,
      stops: flight.stops.toString(),
      cabin: selectedCabin,
      cabinName: CABIN_CLASSES[selectedCabin].name,
      fare: fare.toString(),
    });
    router.push(`/booking/${flight.id}?${params}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Airline */}
          <div className="flex items-center gap-3 min-w-[160px]">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-sm"
              style={{ background: flight.airlineColor || '#1e293b' }}>
              {flight.airlineCode}
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">{flight.airlineName}</p>
              <p className="text-xs text-slate-400">{flight.flightNumber}</p>
            </div>
          </div>

          {/* Route */}
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{flight.departure}</p>
              <p className="text-sm font-semibold text-slate-700">{flight.from}</p>
              <p className="text-xs text-slate-400">{flight.fromCity}</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-2">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />{flight.duration}
              </div>
              <div className="relative flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-sky-400" />
                <div className="w-20 h-px bg-slate-200" />
                {flight.stops > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 border border-white" />
                )}
                <Plane className="w-3 h-3 text-slate-400" />
                <div className="w-20 h-px bg-slate-200" />
                <div className="w-2 h-2 rounded-full bg-orange-400" />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                flight.stops === 0 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
              </span>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{flight.arrival}</p>
              <p className="text-sm font-semibold text-slate-700">{flight.to}</p>
              <p className="text-xs text-slate-400">{flight.toCity}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-right">
              <p className="text-xs text-slate-400">from</p>
              <p className="text-xl font-bold text-orange-600">{format(flight.baseFare)}</p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-sm text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              Select Cabin {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Cabin selection */}
      {expanded && (
        <div className="border-t border-slate-100 p-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">Choose cabin class:</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {Object.entries(CABIN_CLASSES).map(([key, cabin]) => {
              const fare = Math.round(flight.baseFare * cabin.multiplier);
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCabin(key === selectedCabin ? null : key)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedCabin === key ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-orange-200'
                  }`}
                >
                  <p className="text-xs font-semibold text-slate-700">{cabin.name}</p>
                  <p className="text-sm font-bold text-orange-600 mt-0.5">{format(fare)}</p>
                </button>
              );
            })}
          </div>
          <button
            onClick={handleBook}
            disabled={!selectedCabin}
            className="btn-primary !py-2.5 !px-6 !text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}
