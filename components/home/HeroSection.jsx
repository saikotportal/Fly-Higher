'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Train, Plane, Bus, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { BD_STATIONS } from '@/data/trains';
import { AIRPORTS } from '@/data/flights';
import { BUS_CITIES } from '@/data/buses';
import { getTomorrowString } from '@/lib/utils';

const tabs = [
  { id: 'trains', label: 'Trains', icon: Train, color: 'from-emerald-500 to-teal-600' },
  { id: 'flights', label: 'Flights', icon: Plane, color: 'from-blue-500 to-sky-600' },
  { id: 'buses', label: 'Buses', icon: Bus, color: 'from-purple-500 to-violet-600' },
];

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80', // airplane wing
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=80', // train
  'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=1600&q=80', // bus travel
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('trains');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(getTomorrowString());
  const router = useRouter();

  const getFromOptions = () => {
    if (activeTab === 'trains') return BD_STATIONS.map(s => ({ label: s, value: s }));
    if (activeTab === 'flights') return AIRPORTS.map(a => ({ label: `${a.city} (${a.code})`, value: a.code }));
    return BUS_CITIES.map(c => ({ label: c, value: c }));
  };

  const getToOptions = () => getFromOptions().filter(o => o.value !== from);

  const handleSearch = () => {
    if (!from || !to) return;
    const params = new URLSearchParams({ from, to, date });
    router.push(`/search/${activeTab}?${params}`);
  };

  const tabIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGES[tabIndex]}
          alt="Travel"
          className="w-full h-full object-cover transition-all duration-700"
          style={{ filter: 'brightness(0.35)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-orange-900/50" />
        <div className="absolute inset-0 hero-pattern" />
        {/* Floating orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl animate-float" style={{animationDelay:'1.5s'}} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Bangladesh's #1 Travel Platform
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Fly Higher<br />
            <span className="gradient-text">Across the World</span>
          </h1>
          <p className="text-xl text-white/70 mb-10 max-w-2xl">
            Book trains, flights, and buses in seconds. Real-time availability, best prices, no hassle.
          </p>

          {/* Search Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-100">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setFrom(''); setTo(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'text-orange-600 border-b-2 border-orange-500'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Inputs */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* From */}
                <div>
                  <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1.5 block">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <select
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="input-base pl-10 appearance-none"
                    >
                      <option value="">Select departure</option>
                      {getFromOptions().map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* To */}
                <div>
                  <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1.5 block">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <select
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="input-base pl-10 appearance-none"
                    >
                      <option value="">Select destination</option>
                      {getToOptions().map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Date */}
                <div>
                  <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1.5 block">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="input-base pl-10"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleSearch}
                disabled={!from || !to}
                className="mt-4 w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: '2M+', label: 'Happy Travelers' },
              { value: '15+', label: 'Train Routes' },
              { value: '20+', label: 'Flight Routes' },
              { value: '24/7', label: 'Customer Support' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
