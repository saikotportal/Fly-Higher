'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Download, Share2, Home, Calendar, MapPin, User, Hash, Printer } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';

export default function BookingConfirmation({ bookingId, bookingInfo, passengerInfo }) {
  const router = useRouter();
  const { format } = useCurrency();
  const [copied, setCopied] = useState(false);

  const copyBookingId = () => {
    navigator.clipboard.writeText(bookingId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const typeColors = {
    train: 'emerald',
    flight: 'sky',
    bus: 'amber',
  };
  const color = typeColors[bookingInfo.type] || 'orange';

  const typeIcons = {
    train: '🚂',
    flight: '✈️',
    bus: '🚌',
  };

  const detailRows = [
    { label: 'Booking ID', value: bookingId, highlight: true },
    { label: 'Journey', value: `${bookingInfo.from} → ${bookingInfo.to}` },
    { label: 'Date', value: formatDate(bookingInfo.date) },
    { label: 'Departure', value: bookingInfo.departure },
    { label: 'Arrival', value: bookingInfo.arrival },
    { label: 'Duration', value: bookingInfo.duration },
    bookingInfo.className && { label: bookingInfo.type === 'flight' ? 'Cabin' : 'Class', value: bookingInfo.className },
    bookingInfo.airline && { label: 'Airline', value: bookingInfo.airline },
    bookingInfo.name && { label: bookingInfo.type === 'train' ? 'Train' : 'Service', value: bookingInfo.name },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Success animation */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 bg-${color}-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce`}>
            <CheckCircle className={`w-10 h-10 text-${color}-600`} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Booking Confirmed!</h1>
          <p className="text-slate-500 mt-1 text-sm">Your ticket has been booked successfully</p>
        </div>

        {/* Ticket card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          {/* Ticket header */}
          <div className={`bg-gradient-to-r from-${color}-600 to-${color}-500 px-6 py-5 text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/70 uppercase tracking-widest font-medium">E-Ticket</p>
                <p className="text-2xl font-bold mt-0.5">
                  {bookingInfo.from} → {bookingInfo.to}
                </p>
                <p className="text-white/80 text-sm mt-0.5">{formatDate(bookingInfo.date)}</p>
              </div>
              <div className="text-4xl">{typeIcons[bookingInfo.type]}</div>
            </div>
          </div>

          {/* Perforated edge */}
          <div className="relative flex items-center">
            <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 -ml-2.5" />
            <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-1" />
            <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 -mr-2.5" />
          </div>

          {/* Booking details */}
          <div className="px-6 py-5 space-y-3">
            {detailRows.map(({ label, value, highlight }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide shrink-0">{label}</span>
                <span className={`text-sm font-semibold text-right ${highlight ? 'text-orange-600 font-mono text-base' : 'text-slate-800'}`}>
                  {value}
                </span>
              </div>
            ))}

            <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Total Paid</span>
              <span className="text-lg font-bold text-slate-900">{format(parseInt(bookingInfo.fare))}</span>
            </div>
          </div>

          {/* Perforated edge */}
          <div className="relative flex items-center">
            <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 -ml-2.5" />
            <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-1" />
            <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 -mr-2.5" />
          </div>

          {/* Passenger info */}
          <div className="px-6 py-5 bg-slate-50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Passenger</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{passengerInfo.firstName} {passengerInfo.lastName}</p>
                <p className="text-xs text-slate-500">{passengerInfo.email} · {passengerInfo.phone}</p>
              </div>
            </div>

            {/* Barcode placeholder */}
            <div className="mt-4 bg-white rounded-xl p-3 flex flex-col items-center gap-1">
              <div className="flex gap-px h-10">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-900"
                    style={{
                      width: Math.random() > 0.5 ? '3px' : '2px',
                      opacity: 0.7 + Math.random() * 0.3,
                    }}
                  />
                ))}
              </div>
              <p className="font-mono text-xs text-slate-500 tracking-widest">{bookingId}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button
            onClick={copyBookingId}
            className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all text-slate-600 hover:text-orange-600"
          >
            <Hash className="w-5 h-5" />
            <span className="text-xs font-medium">{copied ? 'Copied!' : 'Copy ID'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all text-slate-600 hover:text-orange-600"
          >
            <Printer className="w-5 h-5" />
            <span className="text-xs font-medium">Print</span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'Booking Confirmation', text: `Booking ID: ${bookingId}` });
              } else {
                copyBookingId();
              }
            }}
            className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all text-slate-600 hover:text-orange-600"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-xs font-medium">Share</span>
          </button>
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          View My Bookings
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-full mt-3 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors py-2"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
