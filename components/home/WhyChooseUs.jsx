import { Shield, Zap, Clock, HeadphonesIcon, CreditCard, Globe } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Instant Booking', desc: 'Book your ticket in under 60 seconds. No paperwork, no queues.', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: Shield, title: 'Secure Payments', desc: 'Bank-grade encryption for every transaction. Your money is safe.', color: 'text-green-500', bg: 'bg-green-50' },
  { icon: Clock, title: 'Real-time Availability', desc: 'Live seat counts updated every minute across all routes.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Our team is always here for you, day or night.', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: CreditCard, title: 'Easy Refunds', desc: 'Cancel up to 4 hours before departure for a full refund.', color: 'text-red-500', bg: 'bg-red-50' },
  { icon: Globe, title: 'Multi-currency', desc: 'Pay in BDT, USD, EUR or MYR. We support what you prefer.', color: 'text-orange-500', bg: 'bg-orange-50' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Why Travelers Choose Fly Higher
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We've built every feature with one goal in mind: making your journey as smooth as possible.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex gap-4">
                <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
