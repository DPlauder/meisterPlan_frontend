import type React from 'react';
import { useState } from 'react';

import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Hash,
  RotateCcw,
  CheckCircle,
  ChevronDown,
  Loader2,
} from 'lucide-react';

import { createBusinessCustomer } from '../../services/businessCustomers/businessCustomerService';
interface FormData {
  name: string;
  email: string;
  phine: string;
  adress: string;
  city: string;
  postalCode: string;
  country: string;
  taxNumber: string;
}

const countries = [
  'Deutschland',
  'Österreich',
  'Schweiz',
  'Niederlande',
  'Belgien',
  'Frankreich',
  'Italien',
  'Spanien',
  'Polen',
  'Tschechien',
];

export default function NewBusinessCustomerForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phine: '',
    adress: '',
    city: '',
    postalCode: '',
    country: '',
    taxNumber: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Stadt ist erforderlich';
    }

    // Optional validation for phone
    if (formData.phine && !/^[\d\s\-+()]+$/.test(formData.phine)) {
      newErrors.phine = 'Ungültige Telefonnummer';
    }

    // Optional validation for postal code
    if (formData.postalCode && !/^\d{4,5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Ungültige Postleitzahl (4-5 Ziffern)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newCustomer = await createBusinessCustomer({
        name: formData.name,
        email: formData.email,
        phine: formData.phine || undefined,
        adress: formData.adress || undefined,
        city: formData.city,
        postalCode: formData.postalCode || undefined,
        country: formData.country || undefined,
        taxNumber: formData.taxNumber || undefined,
      });

      console.log('Neuer Kunde erstellt:', newCustomer);
      setSubmitSuccess(true);

      // Reset form
      setTimeout(() => {
        handleReset();
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      // Optionale Fehleranzeige im UI
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phine: '',
      adress: '',
      city: '',
      postalCode: '',
      country: '',
      taxNumber: '',
    });
    setErrors({});
  };

  const handleCountrySelect = (country: string) => {
    handleInputChange('country', country);
    setIsCountryOpen(false);
  };

  if (submitSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Kunde erfolgreich erstellt!
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Der neue Kunde wurde erfolgreich in das System aufgenommen.
          </p>

          <button
            onClick={() => setSubmitSuccess(false)}
            className="
              inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white
              bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg shadow-green-500/25
              hover:from-green-700 hover:to-green-800 hover:shadow-xl hover:shadow-green-500/30
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              transition-all duration-200 ease-in-out active:scale-[0.98]
            "
          >
            <User className="w-4 h-4" />
            Weiteren Kunden anlegen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5" />
          Neuen Kunden anlegen
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name - Required */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Building className="w-4 h-4" />
              Firmenname *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="z.B. Mustermann GmbH"
              className={`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200
                ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
              `}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email - Required */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Mail className="w-4 h-4" />
              E-Mail-Adresse *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="kontakt@mustermann.de"
              className={`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200
                ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
              `}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone - Optional */}
          <div className="space-y-2">
            <label
              htmlFor="phine"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Phone className="w-4 h-4" />
              Telefonnummer
            </label>
            <input
              id="phine"
              type="tel"
              value={formData.phine}
              onChange={(e) => handleInputChange('phine', e.target.value)}
              placeholder="+49 123 456789"
              className={`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200
                ${errors.phine ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
              `}
            />
            {errors.phine && (
              <p className="text-sm text-red-500">{errors.phine}</p>
            )}
          </div>

          {/* Address - Optional */}
          <div className="space-y-2">
            <label
              htmlFor="adress"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <MapPin className="w-4 h-4" />
              Adresse
            </label>
            <textarea
              id="adress"
              value={formData.adress}
              onChange={(e) => handleInputChange('adress', e.target.value)}
              placeholder="Musterstraße 123"
              rows={2}
              className="
                w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200 bg-white hover:border-gray-400
                resize-none
              "
            />
          </div>

          {/* City and Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-700"
              >
                Stadt *
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Berlin"
                className={`
                  w-full px-3 py-2 border rounded-lg shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-200
                  ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
                `}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="postalCode"
                className="text-sm font-medium text-gray-700"
              >
                Postleitzahl
              </label>
              <input
                id="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange('postalCode', e.target.value)
                }
                placeholder="12345"
                className={`
                  w-full px-3 py-2 border rounded-lg shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-200
                  ${errors.postalCode ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
                `}
              />
              {errors.postalCode && (
                <p className="text-sm text-red-500">{errors.postalCode}</p>
              )}
            </div>
          </div>

          {/* Country - Optional */}
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="text-sm font-medium text-gray-700"
            >
              Land
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="
                  w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-200 hover:border-gray-400
                  flex items-center justify-between text-left
                "
              >
                <span
                  className={
                    formData.country ? 'text-gray-900' : 'text-gray-500'
                  }
                >
                  {formData.country || 'Land auswählen'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCountryOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isCountryOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="
                        w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50
                        focus:outline-none transition-colors duration-150
                        first:rounded-t-lg last:rounded-b-lg
                      "
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tax Number - Optional */}
          <div className="space-y-2">
            <label
              htmlFor="taxNumber"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Hash className="w-4 h-4" />
              Steuernummer
            </label>
            <input
              id="taxNumber"
              type="text"
              value={formData.taxNumber}
              onChange={(e) => handleInputChange('taxNumber', e.target.value)}
              placeholder="DE123456789"
              className="
                w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200 bg-white hover:border-gray-400
              "
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white
                bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/25
                hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/30
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
                transition-all duration-200 ease-in-out active:scale-[0.98]
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Wird erstellt...
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  Kunde erstellen
                </>
              )}
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="
                sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium
                text-slate-700 bg-white border-2 border-slate-300 rounded-xl
                hover:bg-slate-50 hover:border-slate-400
                focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
                transition-all duration-200 ease-in-out active:scale-[0.98]
              "
            >
              <RotateCcw className="w-4 h-4" />
              Zurücksetzen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
