'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Train, Plane, Bus, MapPin, Clock, Calendar, Tag, Shield, ChevronRight } from 'lucide-react';
import { generateBookingId, formatDate } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import PassengerForm from '@/components/booking/PassengerForm';
import BookingConfirmation from '@/components/booking/BookingConfirmation';

const STEPS = ['Details', 'Review', 'Confirmed'];

const typeConfig = {
  train: { icon: Train, color: 'emerald', label: 'Train' },
  flight: { icon: Plane, color: 'sky', label: 'Flight' },
  bus: { icon: Bus, color: 'amber', label: 'Bus' },
};

function BookingPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { format } = useCurrency();
  const { user } = useAuth();

  const [step, setStep] = useState(0); // 0=form, 1=review, 2=confirmed
  const [passengerInfo, setPassengerInfo] = useState(null);
  const [bookingId, setBookingId] = useState('');

  const bookingInfo = {
    type: searchParams.get('type') || 'train',
    id: searchParams.get('id') || '',
    name: searchParams.get('name') || '',
    airline: searchParams.get('airline') || '',
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    fromCode: searchParams.get('fromCode') || '',
    toCode: searchParams.get('toCode') || '',
    date: searchParams.get('date') || '',
    departure: searchParams.get('departure') || '',
    arrival: searchParams.get('arrival') || '',
    duration: searchParams.get('duration') || '',
    class: searchParams.get('class') || '',
    className: searchParams.get('className') || '',
    cabin: searchParams.get('cabin') || '',
    cabinName: searchParams.get('cabinName') || '',
    busType: searchParams.get('busType') || '',
    busTypeName: searchParams.get('busTypeName') || '',
    fare: searchParams.get('fare') || '0',
    stops: searchParams.get('stops') || '0',
    operator: searchParams.get('operator') || '',
  };

  const cfg = typeConfig[bookingInfo.type] || typeConfig.train;
  const TypeIcon = cfg.icon;
  const fareNum = parseInt(bookingInfo.fare);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=/booking/${bookingInfo.id}?${searchParams.toString()}`);
    }
  }, [user]);

  const handlePassengerSubmit = (data) => {
    setPassengerInfo(data);
    setStep(1);
  };

  const handleConfirm = () => {
    const id = generateBookingId();
    setBookingId(id);
    setStep(2);

    // Save to localStorage for dashboard
    try {
      const existing = JSON.parse(localStorage.getItem('trvl_bookings') || '[]');
      const newBooking = {
        id,
        type: bookingInfo.type,
        from: bookingInfo.from,
        to: bookingInfo.to,
        date: bookingInfo.date,
        departure: bookingInfo.departure,
        arrival: bookingInfo.arrival,
        fare: fareNum,
        className: bookingInfo.className || bookingInfo.cabinName || bookingInfo.busTypeName,
        name: bookingInfo.name || bookingInfo.airline,
        bookedAt: new Date().toISOString(),
        passenger: `${passengerInfo.firstName} ${passengerInfo.lastName}`,
        status: 'confirmed',
      };
      localStorage.setItem('trvl_bookings', JSON.stringify([newBooking, ...existing]));
    } catch (e) {}
  };

  if (!user) return null;

  if (step === 2) {
    return <BookingConfirmation bookingId={bookingId} bookingInfo={bookingInfo} passengerInfo={passengerInfo} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Top bar */}
      <div className={`bg-gradient-to-r from-slate-900 to-${cfg.color}-900`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <button
            onClick={() => step === 1 ? setStep(0) : router.back()}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 1 ? 'Edit Details' : 'Back to results'}
          </button>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-5">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  i === step ? 'bg-white text-slate-900' :
                  i < step ? `bg-${cfg.color}-400/30 text-white` :
                  'bg-white/10 text-white/40'
                }`}>
                  <span className={`w-4 h-4 rounded-full text-center leading-4 text-xs ${
                    i < step ? `bg-${cfg.color}-400 text-white` :
                    i === step ? 'bg-orange-500 text-white' :
                    'bg-white/20 text-white/50'
                  }`}>{i + 1}</span>
                  {s}
                </div>
                {i < STEPS.length - 1 && <div className="w-6 h-px bg-white/20" />}
              </div>
            ))}
          </div>

          {/* Journey summary card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${cfg.color}-500/30 rounded-xl flex items-center justify-center`}>
                  <TypeIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">
                    {bookingInfo.from} → {bookingInfo.to}
                  </p>
                  <p className="text-white/60 text-xs">
                    {bookingInfo.name || bookingInfo.airline || cfg.label} ·{' '}
                    {bookingInfo.className || bookingInfo.cabinName || bookingInfo.busTypeName}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-xs">Total Fare</p>
                <p className="text-white font-bold text-xl">{format(fareNum)}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-white/70 text-xs">
                <Calendar className="w-3 h-3" />
                {formatDate(bookingInfo.date)}
              </div>
              <div className="flex items-center gap-1.5 text-white/70 text-xs">
                <Clock className="w-3 h-3" />
                {bookingInfo.departure} – {bookingInfo.arrival} ({bookingInfo.duration})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Form or Review */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <PassengerForm bookingInfo={bookingInfo} onSubmit={handlePassengerSubmit} />
            )}

            {step === 1 && passengerInfo && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <h2 className="font-bold text-slate-900">Review Your Booking</h2>
                  <button onClick={() => setStep(0)} className="text-xs text-orange-600 font-semibold hover:text-orange-700">
                    Edit
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Passenger summary */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Passenger</p>
                    <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                      <p className="font-bold text-slate-900">{passengerInfo.firstName} {passengerInfo.lastName}</p>
                      <p className="text-sm text-slate-600">{passengerInfo.email}</p>
                      <p className="text-sm text-slate-600">{passengerInfo.phone}</p>
                      <p className="text-sm text-slate-500">
                        {passengerInfo.idType.toUpperCase()}: {passengerInfo.idNumber} · {passengerInfo.gender} · {passengerInfo.nationality}
                      </p>
                    </div>
                  </div>

                  {/* Journey summary */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Journey</p>
                    <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Route</span>
                        <span className="font-semibold text-slate-800">{bookingInfo.from} → {bookingInfo.to}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Date</span>
                        <span className="font-semibold text-slate-800">{formatDate(bookingInfo.date)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Time</span>
                        <span className="font-semibold text-slate-800">{bookingInfo.departure} – {bookingInfo.arrival}</span>
                      </div>
                      {(bookingInfo.className || bookingInfo.cabinName) && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Class</span>
                          <span className="font-semibold text-slate-800">{bookingInfo.className || bookingInfo.cabinName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Price</p>
                    <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Base Fare</span>
                        <span className="text-slate-800">{format(Math.round(fareNum * 0.92))}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Taxes & Fees</span>
                        <span className="text-slate-800">{format(Math.round(fareNum * 0.08))}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                        <span className="font-bold text-slate-900">Total</span>
                        <span className="font-bold text-orange-600 text-base">{format(fareNum)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security notice */}
                  <div className="flex gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                    <Shield className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-green-700">
                      Your booking is secured with 256-bit encryption. Booking confirmation will be sent to <strong>{passengerInfo.email}</strong>.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Confirm & Book
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Fare summary sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-4 text-sm">Fare Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Ticket (1 passenger)</span>
                  <span className="text-slate-700">{format(Math.round(fareNum * 0.92))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Service fee</span>
                  <span className="text-slate-700">{format(Math.round(fareNum * 0.05))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">VAT</span>
                  <span className="text-slate-700">{format(Math.round(fareNum * 0.03))}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-orange-600">{format(fareNum)}</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-orange-900">Have a promo code?</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 text-sm border border-orange-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-700 placeholder-slate-400"
                />
                <button className="px-3 py-2 text-sm font-semibold text-orange-600 border-2 border-orange-400 rounded-xl hover:bg-orange-100 transition-colors">
                  Apply
                </button>
              </div>
              <p className="text-xs text-orange-600/70 mt-2">Try: TRVL10 for 10% off</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
              <p className="text-xs font-bold text-slate-700">What's included</p>
              {[
                '1 passenger ticket',
                'Digital e-ticket via email',
                '24/7 customer support',
                'Free cancellation within 2 hrs',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BookingPageInner />
    </Suspense>
  );
}
