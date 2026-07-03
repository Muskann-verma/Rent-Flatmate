import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockListings, cities } from '../data/mockData';
import './Home.css';

const stats = [
  { value: '50K+', label: 'Verified Listings', icon: '🏠' },
  { value: '2L+', label: 'Happy Tenants', icon: '😊' },
  { value: '98%', label: 'Match Accuracy', icon: '🎯' },
  { value: '30+', label: 'Cities Covered', icon: '🌆' },
];

const features = [
  {
    icon: '🤖',
    title: 'AI Compatibility Score',
    desc: 'Our AI analyses 20+ lifestyle parameters to match you with the most compatible room or flatmate.',
    color: 'purple',
  },
  {
    icon: '✅',
    title: 'Verified Listings Only',
    desc: 'Every listing is verified by our team. No fake posts, no scams — only genuine properties.',
    color: 'teal',
  },
  {
    icon: '💬',
    title: 'Instant In-App Chat',
    desc: 'Chat directly with owners and potential flatmates once a request is accepted. No number sharing needed.',
    color: 'amber',
  },
  {
    icon: '🔒',
    title: 'Privacy-First Platform',
    desc: 'Your personal details stay private until you choose to share. Secure and encrypted communication.',
    color: 'rose',
  },
];

const steps = [
  { step: '01', title: 'Create Your Profile', desc: 'Tell us your preferences, budget, and lifestyle. It takes less than 2 minutes.' },
  { step: '02', title: 'Browse & Match', desc: 'Explore listings or flatmates with AI-powered compatibility scores tailored to you.' },
  { step: '03', title: 'Connect & Move In', desc: 'Send an interest request, chat securely, schedule a visit, and move in!' },
];

export default function Home() {
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.set('city', searchCity);
    if (searchType) params.set('type', searchType);
    navigate(`/listings?${params.toString()}`);
  };

  const featured = mockListings.slice(0, 4);

  return (
    <div className="home page-enter">
      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="hero__bg-glow" />
        <div className="hero__bg-grid" />
        <div className="container hero__content">
          <div className="hero__badge animate-fadeInUp">
            <span>✨</span> India&apos;s First AI-Powered Flatmate Finder
          </div>
          <h1 className="hero__title animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Find Your Perfect
            <br />
            <span className="gradient-text">Room & Flatmate</span>
          </h1>
          <p className="hero__subtitle animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            AI-driven matching. Verified listings. Zero-hassle renting.
            <br />
            Join 2 lakh+ tenants who found their home with RoomMatch.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hero__search animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="hero__search-field">
              <span className="hero__search-icon">📍</span>
              <select
                id="home-city-select"
                className="hero__search-input"
                value={searchCity}
                onChange={e => setSearchCity(e.target.value)}
              >
                <option value="">Select City</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="hero__search-divider" />
            <div className="hero__search-field">
              <span className="hero__search-icon">🏠</span>
              <select
                id="home-type-select"
                className="hero__search-input"
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
              >
                <option value="">Property Type</option>
                {['Apartment', 'PG', 'Hostel', 'House'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button type="submit" id="home-search-btn" className="hero__search-btn btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search
            </button>
          </form>

          <div className="hero__tags animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {['🔥 Bangalore', '🌊 Mumbai', '🌿 Pune', '💻 Hyderabad', '🎨 Delhi'].map(t => (
              <button key={t} className="tag" onClick={() => { setSearchCity(t.split(' ')[1]); }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Floating listing cards preview */}
        <div className="hero__float-cards">
          <div className="hero__float-card hero__float-card--1 animate-float">
            <div className="hero__float-card-img" style={{ background: 'linear-gradient(135deg, #6C47FF22, #00D4AA22)' }}>🏠</div>
            <div>
              <div className="hero__float-card-title">Spacious 2BHK</div>
              <div className="hero__float-card-price">₹18,500/mo</div>
            </div>
            <div className="badge badge-teal">AI 94%</div>
          </div>
          <div className="hero__float-card hero__float-card--2 animate-float" style={{ animationDelay: '0.5s' }}>
            <span className="hero__float-card-emoji">🎯</span>
            <div>
              <div className="hero__float-card-title">Perfect Match!</div>
              <div className="hero__float-card-sub">3 flatmates nearby</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-bar__grid">
            {stats.map(s => (
              <div key={s.label} className="stats-bar__item">
                <span className="stats-bar__icon">{s.icon}</span>
                <div className="stats-bar__value">{s.value}</div>
                <div className="stats-bar__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-label">🚀 Simple Process</span>
            <h2>How RoomMatch Works</h2>
            <p>From profile creation to moving in — in 3 simple steps.</p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={s.step} className="step-card">
                <div className="step-card__number">{s.step}</div>
                <div className="step-card__connector">{i < steps.length - 1 && <div className="step-connector" />}</div>
                <h3 className="step-card__title">{s.title}</h3>
                <p className="step-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED LISTINGS ==================== */}
      <section className="featured-listings">
        <div className="container">
          <div className="section-header section-header--row">
            <div>
              <span className="section-label">🏠 Top Picks</span>
              <h2>Featured Listings</h2>
            </div>
            <Link to="/listings" className="btn btn-outline">View All Listings →</Link>
          </div>
          <div className="featured-grid">
            {featured.map(listing => (
              <Link key={listing.id} to={`/listings/${listing.id}`} className="listing-card card">
                <div className="listing-card__img-wrap">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="listing-card__img"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <div className="listing-card__img-overlay" />
                  <div className="listing-card__badges">
                    <span className="badge badge-teal">AI {listing.aiScore}%</span>
                    {listing.furnished && <span className="badge badge-amber">Furnished</span>}
                  </div>
                  <div className="listing-card__type-badge">{listing.propertyType}</div>
                </div>
                <div className="listing-card__body">
                  <div className="listing-card__price">
                    ₹{listing.rent.toLocaleString('en-IN')}
                    <span>/mo</span>
                  </div>
                  <h3 className="listing-card__title">{listing.title}</h3>
                  <div className="listing-card__location">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {listing.address}
                  </div>
                  <div className="listing-card__meta">
                    <span className="tag">🛏 {listing.bedrooms} bed</span>
                    <span className="tag">🚿 {listing.bathrooms} bath</span>
                    <span className="tag">👥 {listing.availableFor}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">⚡ Why RoomMatch</span>
            <h2>Built for the Modern Renter</h2>
            <p>Everything you need to find the perfect home — in one place.</p>
          </div>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className={`feature-card feature-card--${f.color}`}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FLATMATE CTA ==================== */}
      <section className="flatmate-cta">
        <div className="container">
          <div className="flatmate-cta__inner">
            <div className="flatmate-cta__glow" />
            <div className="flatmate-cta__content">
              <span className="section-label">🤝 Flatmate Finder</span>
              <h2>Find Someone Who Gets Your Vibe</h2>
              <p>
                Browse profiles of verified people looking for flatmates. Our AI analyses lifestyle, habits, and preferences to show you the most compatible matches.
              </p>
              <div className="flatmate-cta__actions">
                <Link to="/flatmates" className="btn btn-primary btn-lg">
                  🎯 Find Flatmates
                </Link>
                <Link to="/register" className="btn btn-outline btn-lg">
                  Create Profile
                </Link>
              </div>
            </div>
            <div className="flatmate-cta__avatars">
              {[49, 7, 14, 47, 3].map((img, i) => (
                <div key={i} className="flatmate-cta__avatar" style={{ animationDelay: `${i * 0.15}s` }}>
                  <img src={`https://i.pravatar.cc/80?img=${img}`} alt="" />
                  <div className="flatmate-cta__score">
                    {[96, 89, 81, 94, 87][i]}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OWNER CTA ==================== */}
      <section className="owner-cta">
        <div className="container">
          <div className="owner-cta__inner">
            <div className="owner-cta__icon">🏡</div>
            <div>
              <h2>Own a Property? List It for Free</h2>
              <p>Post your room, flat, or PG in under 5 minutes and reach 2 lakh+ verified tenants instantly.</p>
            </div>
            <Link to="/post-listing" className="btn btn-teal btn-lg">
              Post Free Listing →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
