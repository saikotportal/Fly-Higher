'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Train, ArrowRight, Search, ArrowLeftRight } from 'lucide-react';
import { searchTrains, BD_STATIONS } from '@/data/trains';
import { getTomorrowString } from '@/lib/utils';
import TrainCard from '@/components/search/TrainCard';
import FilterSidebar from '@/components/search/FilterSidebar';

function TrainSearchInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [from, setFrom] = useState(searchParams.get('from') || '');
  const [to, setTo] = useState(searchParams.get('to') || '');
  const [date, setDate] = useState(searchParams.get('date') || getTomorrowString());
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (searchParams.get('from') && searchParams.get('to')) {
      handleSearch(searchParams.get('from'), searchParams.get('to'), searchParams.get('date') || getTomorrowString());
    }
  }, []);

  const handleSearch = (f = from, t = to, d = date) => {
    const res = searchTrains(f, t, d);
    setResults(res);
    setSearched(true);
  };

  const swap = () => { const tmp = from; setFrom(to); setTo(tmp); };

  const filteredResults = results.filter(train => {
    if (filters.maxPrice && train.baseFare > filters.maxPrice) return false;
    if (filters.times?.length) {
      const [h] = train.departure.split(':').map(Number);
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

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Search bar */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Train className="w-4 h-4" /><span>Train Search</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <select value={from} onChange={e => setFrom(e.target.value)} className="input-base">
                  <option value="">From station</option>
                  {BD_STATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={swap} className="p-3 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all self-center">
                <ArrowLeftRight className="w-4 h-4" />
              </button>
              <div className="flex-1">
                <select value={to} onChange={e => setTo(e.target.value)} className="input-base">
                  <option value="">To station</option>
                  {BD_STATIONS.filter(s => s !== from).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <input type="date" value={date} min={new Date().toISOString().split('T')[0]}
                onChange={e => setDate(e.target.value)} className="input-base sm:w-40" />
              <button onClick={() => handleSearch()}
                disabled={!from || !to}
                className="btn-primary flex items-center gap-2 !py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {!searched ? (
          <div className="text-center py-24 text-slate-400">
            <Train className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">Search for trains above to get started</p>
          </div>
        ) : (
          <div className="flex gap-6">
            <div className="hidden lg:block w-64 shrink-0">
              <FilterSidebar filters={filters} onChange={setFilters} type="trains" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-600 text-sm">
                  {filteredResults.length > 0
                    ? <><span className="font-bold text-slate-900">{filteredResults.length}</span> trains found from <span className="font-semibold">{from}</span> <ArrowRight className="inline w-3 h-3" /> <span className="font-semibold">{to}</span></>
                    : 'No trains found for this route'}
                </p>
              </div>
              {filteredResults.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
                  <Train className="w-12 h-12 mx-auto mb-4 text-slate-200" />
                  <p className="text-slate-500 font-medium">No trains found</p>
                  <p className="text-slate-400 text-sm mt-1">Try a different route or adjust your filters</p>
                </div>
              ) : (
                filteredResults.map(train => <TrainCard key={train.id} train={train} date={date} />)
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrainsPage() {
  return <Suspense fallback={<div className="min-h-screen pt-16 flex items-center justify-center"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>}><TrainSearchInner /></Suspense>;
}
