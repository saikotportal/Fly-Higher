'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Globe, LogOut, User, LayoutDashboard, Plane } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { getInitials } from '@/lib/utils';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { currency, setCurrency, CURRENCIES } = useCurrency();
  const pathname = usePathname();
  const router = useRouter();
  const currencyRef = useRef(null);
  const userRef = useRef(null);

  const isHeroPage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) setCurrencyOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setUserOpen(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/search/trains', label: 'Trains' },
    { href: '/search/flights', label: 'Flights' },
    { href: '/search/buses', label: 'Buses' },
  ];

  const isTransparent = isHeroPage && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent
        ? 'bg-transparent'
        : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isTransparent ? 'text-white' : 'text-slate-800'}`}
              style={{ fontFamily: 'Georgia, serif' }}>
              Fly<span className="text-orange-500">Higher</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-orange-500 text-white'
                    : isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Currency Switcher */}
            <div className="relative" ref={currencyRef}>
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isTransparent
                    ? 'text-white/90 hover:bg-white/10'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>{CURRENCIES[currency]?.symbol} {currency}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-2">
                    <p className="text-xs text-slate-400 font-medium px-3 py-2 uppercase tracking-wider">Select Currency</p>
                    {Object.values(CURRENCIES).map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => { setCurrency(curr.code); setCurrencyOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                          currency === curr.code
                            ? 'bg-orange-50 text-orange-600 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
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

            {/* Auth */}
            {user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <span className={`text-sm font-medium hidden md:block ${isTransparent ? 'text-white' : 'text-slate-700'}`}>
                    {user.name.split(' ')[0]}
                  </span>
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {getInitials(user.name)}
                  </div>
                </button>
                {userOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                    <div className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-100">
                      <p className="font-semibold text-slate-800 text-sm">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard" onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-all">
                        <LayoutDashboard className="w-4 h-4" /> My Dashboard
                      </Link>
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-all">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isTransparent ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-orange-600'
                  }`}>
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary !py-2 !px-4 !text-sm">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg ${isTransparent ? 'text-white' : 'text-slate-700'}`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="p-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition-all">
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-3 mt-3">
              <p className="text-xs text-slate-400 font-medium px-4 mb-2 uppercase tracking-wider">Currency</p>
              <div className="flex gap-2 flex-wrap px-4">
                {Object.values(CURRENCIES).map((curr) => (
                  <button key={curr.code} onClick={() => { setCurrency(curr.code); setMobileOpen(false); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      currency === curr.code ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                    {curr.flag} {curr.code}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-100 pt-3 mt-3 flex gap-2">
              {user ? (
                <button onClick={handleLogout} className="flex-1 py-3 rounded-xl bg-red-50 text-red-600 font-medium text-sm">
                  Sign Out
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}
                    className="flex-1 py-3 rounded-xl border-2 border-orange-500 text-orange-600 font-medium text-sm text-center">
                    Sign In
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-medium text-sm text-center">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
