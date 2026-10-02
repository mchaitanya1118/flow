'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, Badge, formatNumber } from '@estateflow/ui';
import { calculateQualityScore } from '@estateflow/search';

export default function PostPropertyWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [transactionType, setTransactionType] = useState('BUY');
  const [propertyType, setPropertyType] = useState('APARTMENT');
  const [city] = useState('Hyderabad');
  const [locality, setLocality] = useState('Kondapur');
  const [address, setAddress] = useState('Plot 42, Silicon Valley Colony');
  const [price, setPrice] = useState('14500000');
  const [areaSqFt, setAreaSqFt] = useState('1850');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('3');
  const [title, setTitle] = useState('Luxury 3 BHK Skyline Apartment with Balcony');
  const [description, setDescription] = useState(
    'Beautiful east-facing 3 BHK home featuring premium modular kitchen, teak wood doors, marble flooring, and panoramic balcony views of the city.'
  );

  const imageUrl =
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80';

  const qualityScore = calculateQualityScore({
    hasPhotos: !!imageUrl,
    photoCount: 4,
    hasFloorPlan: true,
    hasVideo: false,
    descriptionLength: description.length,
    isVerified: true,
  });

  const handleFinishPublish = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      title,
      transactionType,
      propertyType,
      price: Number(price),
      areaSqFt: Number(areaSqFt),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      address,
      locality,
      city,
      state: 'Telangana',
      postalCode: '500084',
      latitude: 17.46,
      longitude: 78.36,
      description,
      amenities: ['24/7 Security', 'Swimming Pool', 'Gymnasium', 'Power Backup'],
      images: [imageUrl],
    };

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to submit property');
      }

      alert(`Listing "${title}" successfully posted! Redirecting to search marketplace...`);
      router.push('/search');
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-3">
          <div className="flex justify-center gap-2">
            <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              🏡 Listing Creation Studio
            </Badge>
            <Badge variant="amber" className="px-3 py-1 text-xs font-extrabold">
              ⭐ Quality Score: {qualityScore}/100
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Post Your Property Listing</h1>
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-slate-300">
            Publish high-quality listings directly to thousands of verified buyers and tenants across Telangana.
          </p>

          {/* WIZARD STEPS INDICATOR */}
          <div className="pt-4 flex justify-center gap-3 text-xs font-extrabold">
            {[
              { step: 1, label: '1. Basic Details' },
              { step: 2, label: '2. Specs & Pricing' },
              { step: 3, label: '3. Photos & Publish' },
            ].map((s) => (
              <div
                key={s.step}
                className={`px-4 py-2 rounded-xl transition-all border ${
                  currentStep === s.step
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM CONTAINER */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 -mt-6 relative z-10 space-y-6">
        <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 bg-white">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              ⚠️ {errorMessage}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">Step 1: Property Location & Intent</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Type</label>
                  <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-bold">
                    <option value="BUY">For Sale</option>
                    <option value="RENT">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
                  <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-bold">
                    <option value="APARTMENT">Apartment / Flat</option>
                    <option value="VILLA">Independent Villa</option>
                    <option value="PLOT">Open Plot</option>
                    <option value="COMMERCIAL">Commercial Space</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Locality" value={locality} onChange={(e: any) => setLocality(e.target.value)} required />
                <Input label="Address" value={address} onChange={(e: any) => setAddress(e.target.value)} required />
              </div>

              <Button variant="primary" className="w-full font-bold py-3 text-xs" onClick={() => setCurrentStep(2)}>
                Next: Specs & Pricing →
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">Step 2: Specs & Expected Price</h3>
              <Input label="Listing Title" value={title} onChange={(e: any) => setTitle(e.target.value)} required />
              
              <div className="grid grid-cols-3 gap-4">
                <Input label="Total Price (₹)" type="number" value={price} onChange={(e: any) => setPrice(e.target.value)} required />
                <Input label="Area (Sq.Ft)" type="number" value={areaSqFt} onChange={(e: any) => setAreaSqFt(e.target.value)} required />
                <Input label="Bedrooms (BHK)" type="number" value={bedrooms} onChange={(e: any) => setBedrooms(e.target.value)} required />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="w-full font-bold" onClick={() => setCurrentStep(1)}>
                  ← Back
                </Button>
                <Button variant="primary" className="w-full font-bold" onClick={() => setCurrentStep(3)}>
                  Next: Photos & Publish →
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">Step 3: Verification & Publish</h3>
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{title}</span>
                  <Badge variant="emerald">₹{formatNumber(Number(price))}</Badge>
                </div>
                <p className="text-slate-600 font-medium">📍 {address}, {locality}, {city}</p>
                <p className="text-slate-500">{bedrooms} BHK • {areaSqFt} sq.ft</p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="w-full font-bold" onClick={() => setCurrentStep(2)} disabled={isSubmitting}>
                  ← Back
                </Button>
                <Button
                  variant="primary"
                  className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 py-3 shadow-lg"
                  onClick={handleFinishPublish}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting to Backend API...' : 'Publish Listing Now 🎉'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
