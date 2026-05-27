'use client';
import Link from 'next/link';
import { Train, Plane, Bus, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'trains',
    icon: Train,
    title: 'Train Tickets',
    desc: '15+ intercity routes across Bangladesh. Shovan to AC Berth.',
    href: '/search/trains',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  {
    id: 'flights',
    icon: Plane,
    title: 'International Flights',
    desc: '20+ routes to UAE, Malaysia, UK, USA and beyond.',
    href: '/search/flights',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
  },
  {
    id: 'buses',
    icon: Bus,
    title: 'Cross-border Buses',
    desc: 'Direct routes to Kolkata, Agartala, Kathmandu and more.',
    href: '/search/buses',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
  },
];

export default function SearchTabs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            How Can We Help?
          </h2>
          <p className="text-slate-500 text-lg">Choose your preferred mode of travel</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.id} href={s.href}
                className="group p-8 rounded-3xl border-2 border-slate-100 hover:border-orange-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center mb-5`}>
                  <Icon className={`w-7 h-7 ${s.text}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Search Now <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
