'use client';
import { useRouter } from 'next/navigation';
import { Bus, Clock, MapPin, ChevronDown, ChevronUp, Wifi, Wind, Zap, Coffee } from 'lucide-react';
import { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { BUS_TYPES, BUS_OPERATORS } from '@/data/buses';

const amenityIcon = { WiFi: Wifi, AC: Wind, 'USB Charging': Zap, Snacks: Coffee, Meals: Coffee };

export default function BusCard({ bus }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const { format } = useCurrency();
  const router = useRouter();

  const handleBook = () => {
    if (!selectedType || !selectedOperator) return;
    const fare = Math.round(bus.baseFare * BUS_TYPES[selectedType].multiplier);
    const op = BUS_OPERATORS.find(o => o.id === selectedOperator);
    const params = new URLSearchParams({
      type: 'bus',
      id: bus.id,
      operator: op?.name || selectedOperator,
      from: bus.from,
      to: bus.to,
      date: bus.date,
      departure: bus.departure,
      arrival: bus.arrival,
      duration: bus.duration,
      busType: selectedType,
      busTypeName: BUS_TYPES[selectedType].name,
      fare: fare.toString(),
      via: bus.via,
    });
    router.push(`/booking/${bus.id}?${params}`);
  };

  const operators = BUS_OPERATORS.filter(o => bus.operators.includes(o.id));

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Bus info */}
          <div className="flex items-start gap-4 flex-1">
            <div className="w-11 h-11 bg-violet-50 rounded-xl flex items-center justify-center shrink-0">
              <Bus className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-bold text-slate-900">{bus.from} → {bus.to}</h3>
                {bus.visa && (
                  <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                    {bus.visa}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{bus.via}</span>
                <span>{bus.distance}</span>
                {bus.seats && <span className="text-green-600 font-medium">{bus.seats} seats left</span>}
              </div>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {bus.amenities?.slice(0, 4).map((a) => {
                  const Icon = amenityIcon[a] || Zap;
                  return (
                    <span key={a} className="flex items-center gap-1 text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full">
                      <Icon className="w-3 h-3" />{a}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Times */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{bus.departure}</p>
              <p className="text-xs text-slate-400">{bus.from}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />{bus.duration}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <div className="w-12 h-px bg-slate-200" />
                <div className="w-2 h-2 rounded-full bg-orange-400" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{bus.arrival}</p>
              <p className="text-xs text-slate-400">{bus.to}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-right">
              <p className="text-xs text-slate-400">from</p>
              <p className="text-xl font-bold text-orange-600">{format(bus.baseFare)}</p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-sm text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              Select Options {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 p-6 space-y-4">
          {/* Bus type */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Bus Type</p>
            <div className="flex flex-wrap gap-2">
              {bus.availableTypes.map((t) => {
                const info = BUS_TYPES[t];
                return (
                  <button key={t}
                    onClick={() => setSelectedType(t === selectedType ? null : t)}
                    className={`px-3 py-2 rounded-xl border-2 text-sm transition-all ${
                      selectedType === t ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold' : 'border-slate-100 text-slate-600 hover:border-orange-200'
                    }`}
                  >
                    {info.name} — {format(Math.round(bus.baseFare * info.multiplier))}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Operator */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Operator</p>
            <div className="flex flex-wrap gap-2">
              {operators.map((op) => (
                <button key={op.id}
                  onClick={() => setSelectedOperator(op.id === selectedOperator ? null : op.id)}
                  className={`px-3 py-2 rounded-xl border-2 text-sm transition-all ${
                    selectedOperator === op.id ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold' : 'border-slate-100 text-slate-600 hover:border-orange-200'
                  }`}
                >
                  {op.name} ⭐ {op.rating}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleBook}
            disabled={!selectedType || !selectedOperator}
            className="btn-primary !py-2.5 !px-6 !text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}
