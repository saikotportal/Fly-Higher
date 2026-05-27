'use client';
import Link from 'next/link';
import { Train, Plane, ArrowRight, Clock } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const routes = [
  {
    type: 'train', icon: Train, from: 'Dhaka', to: 'Chittagong', duration: '5h', fare: 385, color: 'emerald',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
  },
  {
    type: 'train', icon: Train, from: 'Dhaka', to: 'Sylhet', duration: '6h', fare: 270, color: 'emerald',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80',
  },
  {
    type: 'flight', icon: Plane, from: 'Dhaka', to: 'Dubai', duration: '5h 30m', fare: 32000, color: 'sky',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
  },
  {
    type: 'flight', icon: Plane, from: 'Dhaka', to: 'Kuala Lumpur', duration: '4h 10m', fare: 22000, color: 'sky',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80',
  },
  {
    type: 'train', icon: Train, from: 'Dhaka', to: 'Rajshahi', duration: '7h 35m', fare: 310, color: 'emerald',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80',
  },
  {
    type: 'flight', icon: Plane, from: 'Dhaka', to: 'Bangkok', duration: '3h 30m', fare: 18000, color: 'sky',
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&q=80',
  },
];

const colorMap = {
  emerald: { text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  sky: { text: 'text-sky-600', badge: 'bg-sky-100 text-sky-700' },
};

export default function PopularRoutes() {
  const { format } = useCurrency();

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Popular Routes
            </h2>
            <p className="text-slate-500">Most booked routes this month</p>
          </div>
          <Link href="/search/trains" className="text-orange-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            View all routes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {routes.map((route, i) => {
            const Icon = route.icon;
            const c = colorMap[route.color];
            const fromParam = route.type === 'flight'
              ? (route.from === 'Dhaka' ? 'DAC' : route.from)
              : route.from;
            const toParam = route.type === 'flight'
              ? (route.to === 'Dubai' ? 'DXB' : route.to === 'Kuala Lumpur' ? 'KUL' : route.to === 'Bangkok' ? 'BKK' : route.to)
              : route.to;
            const href = `/search/${route.type === 'train' ? 'trains' : 'flights'}?from=${fromParam}&to=${toParam}`;
            return (
              <Link key={i} href={href}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge} bg-white/90`}>
                    {route.type === 'train' ? 'Train' : 'Flight'}
                  </span>
                </div>
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${c.text}`} />
                    <span className="font-bold text-slate-900">{route.from}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-slate-900">{route.to}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Starting from</p>
                      <p className="text-lg font-bold text-orange-600">{format(route.fare)}</p>
                    </div>
                    <span className="text-xs text-orange-600 font-semibold group-hover:underline">Book now →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
