import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cities, propertyTypes } from '../data/mockData';
import { addProperty } from '../api/propertyApi';
import { useAuth } from '../context/AuthContext';
import './PostListing.css';

const steps = ['Basic Info', 'Details', 'Amenities', 'Preview'];

const allAmenities = ['WiFi', 'AC', 'Parking', 'Security', 'Gym', 'Pool', 'Meals', 'Laundry', 'CCTV', 'Power Backup', 'Modular Kitchen', 'Workspace', 'Terrace', 'Pet Friendly'];

export default function PostListing() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    city: '',
    address: '',
    propertyType: '',
    availableFor: 'Anyone',
    rent: '',
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    description: '',
    amenities: [],
  });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const toggleAmenity = (a) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter(x => x !== a)
        : [...prev.amenities, a],
    }));
  };

  const nextStep = () => { if (step < steps.length - 1) setStep(s => s + 1); };
  const prevStep = () => { if (step > 0) setStep(s => s - 1); };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await addProperty(
        {
          title: form.title,
          city: form.city,
          address: form.address,
          propertyType: form.propertyType,
          availableFor: form.availableFor,
          rent: Number(form.rent),
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          furnished: form.furnished,
          description: form.description,
          amenities: form.amenities,
        },
        token
      );
      setSubmitted(true);
      setTimeout(() => navigate('/dashboard'), 2500);
    } catch (err) {
      setError(err.message || 'Failed to submit listing. Please try again.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="post-success page-enter">
        <div className="post-success__box">
          <div className="post-success__icon">🎉</div>
          <h2>Listing Submitted!</h2>
          <p>Your property has been submitted for review. It will be live within 24 hours.</p>
          <div className="post-success__badge">
            <span className="badge badge-teal">✓ Verified within 24 hours</span>
          </div>
          <p className="post-success__redirect">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-page page-enter">
      <div className="post-header">
        <div className="post-header__glow" />
        <div className="container">
          <h1>Post a New Listing</h1>
          <p>Reach 2 lakh+ verified tenants. It takes less than 5 minutes.</p>
        </div>
      </div>

      <div className="container post-body">
        {/* Progress Steps */}
        <div className="post-progress">
          {steps.map((s, i) => (
            <div key={s} className={`post-step ${i === step ? 'post-step--active' : i < step ? 'post-step--done' : ''}`}>
              <div className="post-step__circle">
                {i < step ? '✓' : i + 1}
              </div>
              <span className="post-step__label">{s}</span>
              {i < steps.length - 1 && <div className="post-step__line" />}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="post-form-card">
          {/* Step 0: Basic Info */}
          {step === 0 && (
            <div className="post-step-content animate-fadeIn">
              <h2 className="post-step-title">Basic Information</h2>

              <div className="post-form-grid">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Listing Title *</label>
                  <input
                    id="post-title"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Spacious 2BHK near Metro Station"
                    value={form.title}
                    onChange={e => update('title', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City *</label>
                  <select id="post-city" className="form-control" value={form.city} onChange={e => update('city', e.target.value)}>
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Property Type *</label>
                  <select id="post-type" className="form-control" value={form.propertyType} onChange={e => update('propertyType', e.target.value)}>
                    <option value="">Select Type</option>
                    {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Full Address *</label>
                  <input
                    id="post-address"
                    type="text"
                    className="form-control"
                    placeholder="Enter the complete address"
                    value={form.address}
                    onChange={e => update('address', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Details */}
          {step === 1 && (
            <div className="post-step-content animate-fadeIn">
              <h2 className="post-step-title">Property Details</h2>

              <div className="post-form-grid">
                <div className="form-group">
                  <label className="form-label">Monthly Rent (₹) *</label>
                  <input
                    id="post-rent"
                    type="number"
                    className="form-control"
                    placeholder="e.g. 15000"
                    value={form.rent}
                    onChange={e => update('rent', e.target.value)}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Available For</label>
                  <select id="post-available-for" className="form-control" value={form.availableFor} onChange={e => update('availableFor', e.target.value)}>
                    <option value="Anyone">Anyone</option>
                    <option value="Male">Male Only</option>
                    <option value="Female">Female Only</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Bedrooms</label>
                  <div className="counter-input">
                    <button type="button" className="counter-btn" onClick={() => update('bedrooms', Math.max(1, form.bedrooms - 1))}>−</button>
                    <span className="counter-val">{form.bedrooms}</span>
                    <button type="button" className="counter-btn" onClick={() => update('bedrooms', form.bedrooms + 1)}>+</button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Bathrooms</label>
                  <div className="counter-input">
                    <button type="button" className="counter-btn" onClick={() => update('bathrooms', Math.max(1, form.bathrooms - 1))}>−</button>
                    <span className="counter-val">{form.bathrooms}</span>
                    <button type="button" className="counter-btn" onClick={() => update('bathrooms', form.bathrooms + 1)}>+</button>
                  </div>
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Furnished?</label>
                  <div className="toggle-options">
                    <button
                      type="button"
                      className={`toggle-opt ${form.furnished ? 'toggle-opt--active' : ''}`}
                      onClick={() => update('furnished', true)}
                    >
                      ✓ Fully Furnished
                    </button>
                    <button
                      type="button"
                      className={`toggle-opt ${!form.furnished ? 'toggle-opt--active' : ''}`}
                      onClick={() => update('furnished', false)}
                    >
                      Unfurnished
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Description *</label>
                  <textarea
                    id="post-description"
                    className="form-control"
                    rows={4}
                    placeholder="Describe the property — highlights, nearby facilities, rules..."
                    value={form.description}
                    onChange={e => update('description', e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Amenities */}
          {step === 2 && (
            <div className="post-step-content animate-fadeIn">
              <h2 className="post-step-title">Amenities &amp; Features</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 'var(--space-6)' }}>
                Select all amenities available at your property.
              </p>
              <div className="amenity-picker">
                {allAmenities.map(a => (
                  <button
                    key={a}
                    type="button"
                    className={`amenity-pick-btn ${form.amenities.includes(a) ? 'amenity-pick-btn--active' : ''}`}
                    onClick={() => toggleAmenity(a)}
                  >
                    {form.amenities.includes(a) ? '✓ ' : ''}{a}
                  </button>
                ))}
              </div>

              {/* Photo placeholder */}
              <div className="photo-upload-area">
                <div className="photo-upload-icon">📸</div>
                <h3>Add Property Photos</h3>
                <p>Upload high-quality photos to get 3x more interest</p>
                <button type="button" className="btn btn-outline">+ Choose Photos</button>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', marginTop: 'var(--space-2)' }}>
                  JPEG, PNG — up to 10 photos, 5MB each
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <div className="post-step-content animate-fadeIn">
              <h2 className="post-step-title">Preview &amp; Submit</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: 'var(--space-6)' }}>
                Review your listing before it goes live.
              </p>

              {error && (
                <div style={{
                  background: 'rgba(255,94,125,0.1)', border: '1px solid var(--color-rose)',
                  borderRadius: 'var(--radius-md)', padding: 'var(--space-3)',
                  color: 'var(--color-rose)', fontSize: '0.9rem', marginBottom: 'var(--space-4)'
                }}>
                  ⚠️ {error}
                </div>
              )}

              <div className="preview-card">
                <div className="preview-card__header">
                  <div>
                    <h3 className="preview-card__title">{form.title || 'Untitled Listing'}</h3>
                    <div className="preview-card__location">📍 {form.address || 'No address'}, {form.city}</div>
                  </div>
                  <div className="preview-card__price">
                    ₹{form.rent ? parseInt(form.rent).toLocaleString('en-IN') : '0'}/mo
                  </div>
                </div>

                <div className="preview-card__meta">
                  <span className="tag">🏠 {form.propertyType || 'Type'}</span>
                  <span className="tag">🛏 {form.bedrooms} Bed</span>
                  <span className="tag">🚿 {form.bathrooms} Bath</span>
                  <span className="tag">👥 {form.availableFor}</span>
                  {form.furnished && <span className="badge badge-amber">✨ Furnished</span>}
                </div>

                {form.description && (
                  <p className="preview-card__desc">{form.description}</p>
                )}

                {form.amenities.length > 0 && (
                  <div className="preview-card__amenities">
                    {form.amenities.map(a => <span key={a} className="amenity-tag">{a}</span>)}
                  </div>
                )}

                <div className="preview-terms">
                  <input type="checkbox" id="agree-terms" defaultChecked />
                  <label htmlFor="agree-terms" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    I agree to RoomMatch&apos;s terms of service and listing guidelines
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="post-nav">
            <button
              type="button"
              className="btn btn-outline"
              onClick={prevStep}
              disabled={step === 0}
            >
              ← Previous
            </button>

            {step < steps.length - 1 ? (
              <button
                id="post-next-btn"
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
              >
                Next →
              </button>
            ) : (
              <button
                id="post-submit-btn"
                type="button"
                className="btn btn-teal btn-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? '⏳ Submitting...' : '🚀 Submit Listing'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
