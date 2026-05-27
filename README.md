# TravelBD — Full-Stack Travel Booking App

A Next.js 14 travel agency web app for booking trains, flights, and buses across Bangladesh and South Asia.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open https://flyhigherr.netlify.app

## 📁 Project Structure

```
travel-agency/
├── app/
│   ├── page.jsx                    # Home page
│   ├── layout.jsx                  # Root layout
│   ├── globals.css                 # Global styles + Tailwind
│   ├── login/page.jsx              # Login
│   ├── register/page.jsx           # Register
│   ├── dashboard/page.jsx          # My Bookings dashboard
│   ├── search/
│   │   ├── trains/page.jsx         # Train search
│   │   ├── flights/page.jsx        # Flight search
│   │   └── buses/page.jsx          # Bus search
│   └── booking/[id]/page.jsx       # Booking flow (3-step)
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── CurrencySwitcher.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── SearchTabs.jsx
│   │   ├── PopularRoutes.jsx
│   │   ├── WhyChooseUs.jsx
│   │   └── Testimonials.jsx
│   ├── search/
│   │   ├── TrainCard.jsx
│   │   ├── FlightCard.jsx
│   │   ├── BusCard.jsx
│   │   └── FilterSidebar.jsx
│   └── booking/
│       ├── PassengerForm.jsx       # Step 1: passenger details
│       └── BookingConfirmation.jsx # Step 3: e-ticket
├── context/
│   ├── AuthContext.jsx             # Auth state (localStorage)
│   └── CurrencyContext.jsx         # Multi-currency (BDT/USD/EUR/GBP)
├── data/
│   ├── trains.js                   # BD train routes & search fn
│   ├── flights.js                  # International flight routes
│   ├── buses.js                    # Cross-border bus routes
│   └── currencies.js               # Exchange rates
└── lib/
    └── utils.js                    # Helpers (formatDate, generateBookingId…)
```

## ✨ Features

- **3 transport types**: Trains (domestic BD), Flights (international), Buses (cross-border)
- **Search & filter**: by price, time, class, airline, stops
- **3-step booking flow**: Passenger form → Review → E-Ticket confirmation
- **Auth**: Register/Login with localStorage persistence
- **Multi-currency**: BDT, USD, EUR, GBP with live switching
- **Dashboard**: View all past bookings
- **Responsive**: Mobile-first design

## 🛠 Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Lucide React (icons)
- localStorage for auth & bookings (no backend required)

## 🔑 Environment

Copy `.env.example` to `.env.local` — no keys required for the mock data version.
