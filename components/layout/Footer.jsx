import Link from 'next/link';
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                Sky<span className="text-orange-400">Route</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Bangladesh's trusted travel platform for trains, flights, and buses. Book smarter, travel better.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-orange-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {[
                { href: '/search/trains', label: 'Train Tickets' },
                { href: '/search/flights', label: 'Flight Booking' },
                { href: '/search/buses', label: 'Bus Tickets' },
                { href: '/dashboard', label: 'My Bookings' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-orange-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Cancellation Policy', 'Refund Policy', 'Terms of Service', 'Privacy Policy'].map((t) => (
                <li key={t}>
                  <a href="#" className="text-sm hover:text-orange-400 transition-colors">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>House 15, Road 8, Banani, Dhaka 1213</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>support@skyroute.com.bd</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© 2025 Fly Higher BD. All rights reserved.</p>
          <p className="text-xs text-slate-500">Built for travelers across Bangladesh 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
