'use client';
import { useRouter } from 'next/navigation';
import { Train, Clock, MapPin, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { TRAIN_CLASSES } from '@/data/trains';

export default function TrainCard({ train, date }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const { format } = useCurrency();
  const router = useRouter();

  const handleBook = () => {
    if (!selectedClass) return;
    const fare = Math.round(train.baseFare * TRAIN_CLASSES[selectedClass].multiplier);
    const params = new URLSearchParams({
      type: 'train',
      id: train.id,
      name: train.name,
      from: train.from,
      to: train.to,
      date,
      departure: train.departure,
      arrival: train.arrival,
      duration: train.duration,
      class: selectedClass,
      className: TRAIN_CLASSES[selectedClass].name,
      fare: fare.toString(),
    });
    router.push(`/booking/${train.id}?${params}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Train info */}
          <div className="flex items-start gap-4 flex-1">
            <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
              <Train className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-slate-900">{train.name}</h3>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">#{train.number}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 flex-wrap">
                {train.days.length === 7 ? (
                  <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">Daily</span>
                ) : (
                  <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">{train.days.join(', ')}</span>
                )}
                {train.stops.length > 0 && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {train.stops.join(' · ')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Times */}
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{train.departure}</p>
              <p className="text-xs text-slate-400">{train.from}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />{train.duration}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="w-16 h-px bg-slate-200" />
                <div className="w-2 h-2 rounded-full bg-orange-400" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{train.arrival}</p>
              <p className="text-xs text-slate-400">{train.to}</p>
            </div>
          </div>

          {/* Price + expand */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-right">
              <p className="text-xs text-slate-400">from</p>
              <p className="text-xl font-bold text-orange-600">{format(train.baseFare)}</p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-sm text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              Select Class {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Class selection */}
      {expanded && (
        <div className="border-t border-slate-100 p-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">Choose your class:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {train.availableClasses.map((cls) => {
              const info = TRAIN_CLASSES[cls];
              const fare = Math.round(train.baseFare * info.multiplier);
              const seats = train.seats?.[cls] ?? '?';
              return (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls === selectedClass ? null : cls)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedClass === cls
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-slate-100 hover:border-orange-200'
                  }`}
                >
                  <p className="text-xs font-semibold text-slate-700">{info.name}</p>
                  <p className="text-sm font-bold text-orange-600 mt-0.5">{format(fare)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{seats} seats</span>
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={handleBook}
            disabled={!selectedClass}
            className="btn-primary !py-2.5 !px-6 !text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}
