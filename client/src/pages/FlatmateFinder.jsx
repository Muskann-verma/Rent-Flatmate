import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockFlatmates, cities } from '../data/mockData';
import './FlatmateFinder.css';

export default function FlatmateFinder() {
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = mockFlatmates.filter(f => {
    if (city && f.city !== city) return false;
    if (gender && f.gender !== gender) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.profession.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flatmate-page page-enter">
      {/* Hero */}
      <div className="flatmate-hero">
        <div className="flatmate-hero__glow" />
        <div className="container">
          <span className="section-label">🤝 Flatmate Finder</span>
          <h1 className="flatmate-hero__title">
            Find Someone Who<br />
            <span className="gradient-text">Gets Your Vibe</span>
          </h1>
          <p className="flatmate-hero__sub">
            Browse verified profiles. Our AI assigns compatibility scores based on lifestyle, habits, and budget.
          </p>

          {/* Search & Filters */}
          <div className="flatmate-filters">
            <div className="flatmate-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                id="flatmate-search-input"
                type="text"
                placeholder="Search by name or profession..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flatmate-search__input"
              />
            </div>
            <select id="flatmate-city-filter" className="form-control" value={city} onChange={e => setCity(e.target.value)}>
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select id="flatmate-gender-filter" className="form-control" value={gender} onChange={e => setGender(e.target.value)}>
              <option value="">Any Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {(city || gender || search) && (
              <button className="btn btn-ghost btn-sm" onClick={() => { setCity(''); setGender(''); setSearch(''); }}>
                ✕ Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flatmate-count">
          <strong>{filtered.length}</strong> people looking for flatmates
        </div>

        {/* Grid */}
        <div className="flatmate-grid">
          {filtered.map(f => (
            <div
              key={f.id}
              className={`flatmate-card ${selected === f.id ? 'flatmate-card--selected' : ''}`}
              onClick={() => setSelected(selected === f.id ? null : f.id)}
            >
              {/* Score Ring */}
              <div className="flatmate-card__score-ring">
                <div
                  className="flatmate-card__score-circle"
                  style={{ '--score': f.compatibilityScore }}
                >
                  <svg viewBox="0 0 36 36">
                    <circle className="score-bg" cx="18" cy="18" r="15.9155" />
                    <circle
                      className="score-fill"
                      cx="18" cy="18" r="15.9155"
                      style={{ strokeDasharray: `${f.compatibilityScore} 100` }}
                    />
                  </svg>
                  <span className="flatmate-card__score-val">{f.compatibilityScore}%</span>
                </div>
              </div>

              <img src={f.avatar} alt={f.name} className="flatmate-card__avatar" />

              <div className="flatmate-card__body">
                <h3 className="flatmate-card__name">{f.name}</h3>
                <div className="flatmate-card__age-gender">
                  {f.age} yrs · {f.gender}
                </div>
                <div className="flatmate-card__profession">{f.profession}</div>

                <div className="flatmate-card__meta">
                  <span className="tag">📍 {f.city}</span>
                  <span className="tag">💰 ₹{f.budget}</span>
                  <span className="tag">📅 {f.moveIn}</span>
                </div>

                <p className="flatmate-card__about">{f.about}</p>

                {/* Habits */}
                <div className="flatmate-card__habits">
                  {f.habits.map(h => (
                    <span key={h} className="badge badge-primary">{h}</span>
                  ))}
                </div>

                {/* Interests */}
                <div className="flatmate-card__interests">
                  {f.interests.map(i => (
                    <span key={i} className="tag">{i}</span>
                  ))}
                </div>

                <div className="flatmate-card__looking">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Looking in: <strong>{f.lookingIn}</strong>
                </div>
              </div>

              <div className="flatmate-card__actions">
                <Link
                  to="/chat"
                  className="btn btn-primary btn-sm"
                  onClick={e => e.stopPropagation()}
                >
                  💬 Connect
                </Link>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={e => { e.stopPropagation(); }}
                >
                  👋 Wave
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flatmate-empty">
            <div className="flatmate-empty__icon">🤔</div>
            <h3>No flatmates found</h3>
            <p>Try changing your filters or search term.</p>
            <button className="btn btn-primary" onClick={() => { setCity(''); setGender(''); setSearch(''); }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Create Profile CTA */}
        <div className="flatmate-cta-banner">
          <div className="flatmate-cta-banner__glow" />
          <div className="flatmate-cta-banner__content">
            <div className="flatmate-cta-banner__icon">✨</div>
            <div>
              <h3>Looking for a flatmate? Create your profile!</h3>
              <p>Let compatible people find you. It takes less than 2 minutes.</p>
            </div>
            <Link to="/register" className="btn btn-teal">Create Profile →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
