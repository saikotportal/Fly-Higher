import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Rahim Uddin', role: 'Frequent Traveler', text: 'Booked Dhaka to Chittagong train in 2 minutes. The seat selection was seamless and the price was exactly what I expected. Best booking experience!', rating: 5, avatar: 'RU' },
  { name: 'Fatema Khanam', role: 'Business Traveler', text: 'Fly Higher made booking my Dubai flight so easy. Multi-currency support is a lifesaver — I paid in USD with no extra fees.', rating: 5, avatar: 'FK' },
  { name: 'Tanvir Ahmed', role: 'Student', text: 'Used the Kolkata bus route for the first time. Crystal clear visa info and pickup points. Will definitely use again for my next trip!', rating: 4, avatar: 'TA' },
  { name: 'Nusrat Jahan', role: 'Travel Blogger', text: 'The UI is gorgeous and super fast. No more dealing with clunky government booking sites. Fly Higher is miles ahead!', rating: 5, avatar: 'NJ' },
  { name: 'Karim Hassan', role: 'Engineer', text: 'Booked AC berth on Padma Express at midnight. Got instant confirmation. The 24/7 support even helped me with a last-minute change.', rating: 5, avatar: 'KH' },
  { name: 'Shaila Parveen', role: 'Teacher', text: 'The currency switcher is brilliant for when I travel with international colleagues. Everything just works perfectly.', rating: 4, avatar: 'SP' },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            What Our Travelers Say
          </h2>
          <p className="text-slate-500 text-lg">Join over 2 million happy travelers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'}`} />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
