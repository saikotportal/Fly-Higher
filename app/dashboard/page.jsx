'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Train, Plane, Bus, Calendar, MapPin, Clock, Tag, LogOut, User, ArrowRight } from 'lucide-react';
import { formatDate, getInitials } from '@/lib/utils';

const typeIcon = { train: Train, flight: Plane, bus: Bus };
const typeColor = {
  train: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  flight: 'bg-sky-50 text-sky-600 border-sky-200',
  bus: 'bg-violet-50 text-violet-600 border-violet-200',
};

export default function DashboardPage() {
  const { user, loading, logout, getBookings } = useAuth();
  const { format } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const bookings = getBookings();

  const handleLogout = () => { logout(); router.push('/'); };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {getInitials(user.name)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Hey, {user.name.split(' ')[0]}!</h1>
                <p className="text-slate-400 text-sm">{user.email} · {user.provider === 'google' ? '🔵 Google' : '✉️ Email'}</p>
              </div>
            </div>
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: Tag, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Train Trips', value: bookings.filter(b => b.type === 'train').length, icon: Train, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Flights', value: bookings.filter(b => b.type === 'flight').length, icon: Plane, color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'Bus Trips', value: bookings.filter(b => b.type === 'bus').length, icon: Bus, color: 'text-violet-600', bg: 'bg-violet-50' },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { href: '/search/trains', label: 'Book Train', icon: Train },
            { href: '/search/flights', label: 'Book Flight', icon: Plane },
            { href: '/search/buses', label: 'Book Bus', icon: Bus },
          ].map((l) => {
            const Icon = l.icon;
            return (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-all shadow-sm">
                <Icon className="w-4 h-4" /> {l.label}
              </Link>
            );
          })}
        </div>

        {/* Bookings */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-5" style={{ fontFamily: 'Georgia, serif' }}>My Bookings</h2>
          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <Tag className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No bookings yet</h3>
              <p className="text-slate-400 text-sm mb-6">Start your journey by searching for trains, flights or buses.</p>
              <Link href="/search/trains" className="btn-primary inline-flex items-center gap-2 !py-2.5 !px-5 !text-sm">
                Search Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const Icon = typeIcon[booking.type] || Tag;
                const colors = typeColor[booking.type] || 'bg-slate-50 text-slate-600 border-slate-200';
                return (
                  <div key={booking.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${colors}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900">{booking.from}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-bold text-slate-900">{booking.to}</span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(booking.date)}</span>
                            {booking.departure && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{booking.departure}</span>}
                            {booking.className && <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />{booking.className}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-orange-600">{format(booking.totalFare)}</p>
                        <p className="text-xs text-slate-400">{booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}</p>
                        <p className="text-xs text-slate-300 mt-1 font-mono">{booking.id}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
