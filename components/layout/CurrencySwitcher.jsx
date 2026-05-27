'use client';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function CurrencySwitcher({ dark = false }) {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency, CURRENCIES } = useCurrency();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          dark ? 'text-white/90 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>{CURRENCIES[currency]?.symbol} {currency}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
          <div className="p-2">
            <p className="text-xs text-slate-400 font-medium px-3 py-2 uppercase tracking-wider">Select Currency</p>
            {Object.values(CURRENCIES).map((curr) => (
              <button
                key={curr.code}
                onClick={() => { setCurrency(curr.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  currency === curr.code ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl">{curr.flag}</span>
                <div className="text-left">
                  <p className="font-medium">{curr.symbol} {curr.code}</p>
                  <p className="text-xs text-slate-400">{curr.name}</p>
                </div>
                {currency === curr.code && <span className="ml-auto text-orange-500">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
