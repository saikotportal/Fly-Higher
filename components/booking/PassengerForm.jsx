'use client';
import { useState } from 'react';
import { User, Phone, CreditCard, Mail, ChevronRight, AlertCircle } from 'lucide-react';

const ID_TYPES = [
  { value: 'nid', label: 'National ID (NID)' },
  { value: 'passport', label: 'Passport' },
  { value: 'birth_cert', label: 'Birth Certificate' },
  { value: 'driving_license', label: 'Driving License' },
];

export default function PassengerForm({ bookingInfo, onSubmit }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idType: 'nid',
    idNumber: '',
    gender: '',
    nationality: 'Bangladeshi',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (data = form) => {
    const errs = {};
    if (!data.firstName.trim()) errs.firstName = 'First name is required';
    if (!data.lastName.trim()) errs.lastName = 'Last name is required';
    if (!data.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Invalid email address';
    if (!data.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^(\+?88)?01[3-9]\d{8}$/.test(data.phone.replace(/\s/g, ''))) {
      errs.phone = 'Enter a valid Bangladeshi phone number';
    }
    if (!data.idNumber.trim()) errs.idNumber = 'ID number is required';
    if (!data.gender) errs.gender = 'Please select gender';
    return errs;
  };

  const set = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const errs = validate(updated);
      setErrors(prev => ({ ...prev, [field]: errs[field] }));
    }
  };

  const blur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors(prev => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = () => {
    const allTouched = Object.fromEntries(Object.keys(form).map(k => [k, true]));
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  };

  const Field = ({ label, name, type = 'text', placeholder, icon: Icon, children }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        {children || (
          <input
            type={type}
            value={form[name]}
            onChange={e => set(name, e.target.value)}
            onBlur={() => blur(name)}
            placeholder={placeholder}
            className={`input-base ${Icon ? 'pl-10' : ''} ${errors[name] && touched[name] ? 'border-red-400 focus:ring-red-400' : ''}`}
          />
        )}
      </div>
      {errors[name] && touched[name] && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-bold text-slate-900">Passenger Details</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1 ml-9">Enter details exactly as on your travel document</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" name="firstName" placeholder="e.g. Rahman" icon={User} />
          <Field label="Last Name" name="lastName" placeholder="e.g. Ahmed">
            <input
              type="text"
              value={form.lastName}
              onChange={e => set('lastName', e.target.value)}
              onBlur={() => blur('lastName')}
              placeholder="e.g. Ahmed"
              className={`input-base ${errors.lastName && touched.lastName ? 'border-red-400 focus:ring-red-400' : ''}`}
            />
          </Field>
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email Address" name="email" type="email" placeholder="you@example.com" icon={Mail} />
          <Field label="Phone Number" name="phone" placeholder="+880 1X XXXX XXXX" icon={Phone} />
        </div>

        {/* Gender + Nationality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {['Male', 'Female', 'Other'].map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => set('gender', g)}
                  onBlur={() => blur('gender')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    form.gender === g
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-slate-200 text-slate-600 hover:border-orange-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {errors.gender && touched.gender && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.gender}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nationality</label>
            <select
              value={form.nationality}
              onChange={e => set('nationality', e.target.value)}
              className="input-base"
            >
              {['Bangladeshi', 'Indian', 'Pakistani', 'Nepali', 'Sri Lankan', 'Other'].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ID section */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              ID Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ID_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('idType', value)}
                  className={`py-2 px-3 rounded-xl border-2 text-xs font-medium transition-all text-left ${
                    form.idType === value
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-slate-200 text-slate-600 hover:border-orange-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <Field
            label={`${ID_TYPES.find(t => t.value === form.idType)?.label} Number`}
            name="idNumber"
            placeholder={
              form.idType === 'passport' ? 'e.g. A1234567' :
              form.idType === 'nid' ? 'e.g. 1234567890123' :
              'Enter ID number'
            }
            icon={CreditCard}
          />
        </div>

        {/* Notice for international */}
        {(bookingInfo?.type === 'flight' || bookingInfo?.type === 'bus') && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-800">International Travel</p>
              <p className="text-xs text-amber-700 mt-0.5">
                A valid passport is recommended for international routes. Ensure your travel documents are up to date.
              </p>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
        >
          Continue to Review
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
