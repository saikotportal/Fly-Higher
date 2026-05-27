'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const destinations = [
  {
    city: 'Dubai', country: 'UAE', code: 'DXB',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    tag: 'Most Popular',
  },
  {
    city: 'Singapore', country: 'Singapore', code: 'SIN',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    tag: 'Trending',
  },
  {
    city: 'Bangkok', country: 'Thailand', code: 'BKK',
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80',
    tag: 'Budget Friendly',
  },
  {
    city: 'London', country: 'UK', code: 'LHR',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    tag: 'Long-haul',
  },
  {
    city: 'Kuala Lumpur', country: 'Malaysia', code: 'KUL',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80',
    tag: 'Popular',
  },
  {
    city: 'Tokyo', country: 'Japan', code: 'NRT',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    tag: 'Bucket List',
  },
];

export default function DestinationImages() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Dream Destinations
            </h2>
            <p className="text-slate-500">Explore the world from Dhaka</p>
          </div>
          <Link href="/search/flights" className="text-orange-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            All flights <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {destinations.map((dest, i) => (
            <Link
              key={dest.code}
              href={`/search/flights?from=DAC&to=${dest.code}`}
              className={`group relative overflow-hidden rounded-2xl ${i === 0 ? 'md:row-span-2' : ''}`}
              style={{ minHeight: i === 0 ? '360px' : '170px' }}
            >
              <img
                src={dest.image}
                alt={dest.city}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-semibold bg-orange-500 text-white px-2.5 py-1 rounded-full">
                  {dest.tag}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-lg leading-tight">{dest.city}</p>
                <p className="text-white/70 text-xs">{dest.country}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
