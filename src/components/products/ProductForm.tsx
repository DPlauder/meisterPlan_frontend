import type React from 'react';
import { useState } from 'react';

import {
  Package,
  FileText,
  Euro,
  Hash,
  RotateCcw,
  CheckCircle,
  Loader2,
} from 'lucide-react';

import { createProduct } from '../../services/products/productsService';

interface FormData {
  articleNum: string;
  name: string;
  description: string;
  price: string;
}

export default function NewProductForm() {
  const [formData, setFormData] = useState<FormData>({
    articleNum: '',
    name: '',
    description: '',
    price: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const parsePrice = (value: string) => {
    const normalized = value.replace(',', '.');
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Produktname ist erforderlich';
    }

    if (!formData.articleNum.trim()) {
      newErrors.articleNum = 'Artikelnummer ist erforderlich';
    }

    const parsedPrice = parsePrice(formData.price);
    if (!formData.price.trim()) {
      newErrors.price = 'Preis ist erforderlich';
    } else if (parsedPrice === null || parsedPrice <= 0) {
      newErrors.price = 'Preis muss eine Zahl groesser 0 sein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const parsedPrice = parsePrice(formData.price);
    if (parsedPrice === null) {
      setErrors((prev) => ({ ...prev, price: 'Preis ist ungueltig' }));
      return;
    }

    setIsSubmitting(true);

    try {
      const newProduct = await createProduct({
        articleNum: formData.articleNum.trim(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parsedPrice,
      });

      console.log('Neues Produkt erstellt:', newProduct);
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      articleNum: '',
      name: '',
      description: '',
      price: '',
    });
    setErrors({});
  };

  if (submitSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Produkt erfolgreich erstellt!
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Das neue Produkt wurde erfolgreich im System angelegt.
          </p>

          <button
            onClick={() => {
              handleReset();
              setSubmitSuccess(false);
            }}
            className="
              inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white
              bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg shadow-green-500/25
              hover:from-green-700 hover:to-green-800 hover:shadow-xl hover:shadow-green-500/30
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              transition-all duration-200 ease-in-out active:scale-[0.98]
            "
          >
            <Package className="w-4 h-4" />
            Weiteres Produkt anlegen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Neues Produkt anlegen
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="articleNum"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Hash className="w-4 h-4" />
              Artikelnummer *
            </label>
            <input
              id="articleNum"
              type="text"
              value={formData.articleNum}
              onChange={(e) => handleInputChange('articleNum', e.target.value)}
              placeholder="z.B. ART-2025-001"
              className={`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200
                ${errors.articleNum ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
              `}
            />
            {errors.articleNum && (
              <p className="text-sm text-red-500">{errors.articleNum}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Package className="w-4 h-4" />
              Produktname *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="z.B. Premium Werkzeugset"
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

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FileText className="w-4 h-4" />
              Beschreibung
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Kurze Produktbeschreibung"
              rows={3}
              className="
                w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200 bg-white hover:border-gray-400
                resize-none
              "
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Euro className="w-4 h-4" />
              Preis (EUR) *
            </label>
            <input
              id="price"
              type="text"
              inputMode="decimal"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="z.B. 199.99"
              className={`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200
                ${errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
              `}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white
                bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg shadow-blue-500/25
                hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/30
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-all duration-200 ease-in-out disabled:opacity-70
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Wird gespeichert...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Produkt erstellen
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="
                inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700
                bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                transition-all duration-200 ease-in-out
              "
            >
              <RotateCcw className="w-4 h-4" />
              Zuruecksetzen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
