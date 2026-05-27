'use client';

export default function FilterSidebar({ filters, onChange, type }) {
  const times = ['00:00–06:00', '06:00–12:00', '12:00–18:00', '18:00–24:00'];

  return (
    <aside className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
      <h3 className="font-bold text-slate-900 text-lg">Filters</h3>

      {/* Departure Time */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-3">Departure Time</p>
        <div className="space-y-2">
          {times.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.times?.includes(t) || false}
                onChange={(e) => {
                  const cur = filters.times || [];
                  onChange({ ...filters, times: e.target.checked ? [...cur, t] : cur.filter(x => x !== t) });
                }}
                className="w-4 h-4 accent-orange-500"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-3">Max Price (BDT)</p>
        <input
          type="range"
          min={0}
          max={type === 'flights' ? 120000 : type === 'buses' ? 6000 : 2000}
          step={type === 'flights' ? 5000 : 100}
          value={filters.maxPrice ?? (type === 'flights' ? 120000 : type === 'buses' ? 6000 : 2000)}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-orange-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>৳0</span>
          <span className="text-orange-600 font-semibold">
            ৳{(filters.maxPrice ?? (type === 'flights' ? 120000 : type === 'buses' ? 6000 : 2000)).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Class filter for trains */}
      {type === 'trains' && (
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Class</p>
          <div className="space-y-2">
            {['Shovan Chair', 'Snigdha (AC Chair)', 'First Berth', 'AC Berth'].map((c) => (
              <label key={c} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.classes?.includes(c) || false}
                  onChange={(e) => {
                    const cur = filters.classes || [];
                    onChange({ ...filters, classes: e.target.checked ? [...cur, c] : cur.filter(x => x !== c) });
                  }}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">{c}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Stops for flights */}
      {type === 'flights' && (
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Stops</p>
          <div className="space-y-2">
            {['Non-stop', '1 Stop'].map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.stops?.includes(s) || false}
                  onChange={(e) => {
                    const cur = filters.stops || [];
                    onChange({ ...filters, stops: e.target.checked ? [...cur, s] : cur.filter(x => x !== s) });
                  }}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">{s}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={() => onChange({})}
        className="w-full py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-medium hover:border-orange-300 hover:text-orange-600 transition-all"
      >
        Reset Filters
      </button>
    </aside>
  );
}
