import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAllProperties } from '../api/propertyApi';
import { cities, propertyTypes, budgetRanges } from '../data/mockData';
import './Listings.css';

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [budget, setBudget] = useState('');
  const [furnished, setFurnished] = useState('');
  const [availableFor, setAvailableFor] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [search, setSearch] = useState('');

  const [listings, setListings] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const load = async () => {
      setFetchLoading(true);
      setFetchError('');
      try {
        const filters = {};
        if (city) filters.city = city;
        if (type) filters.propertyType = type;
        if (furnished === 'yes') filters.furnished = 'true';
        if (furnished === 'no') filters.furnished = 'false';
        if (availableFor) filters.availableFor = availableFor;
        const data = await getAllProperties(filters);
        setListings(data.properties || []);
      } catch (err) {
        setFetchError(err.message || 'Failed to load listings.');
      } finally {
        setFetchLoading(false);
      }
    };
    load();
  }, [city, type, furnished, availableFor]);

  const filtered = listings
    .filter(l => {
      if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !(l.address || '').toLowerCase().includes(search.toLowerCase())) return false;
      if (budget) {
        const range = budgetRanges.find(r => r.label === budget);
        if (range && (l.rent < range.min || l.rent > range.max)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.rent - b.rent;
      if (sortBy === 'price-desc') return b.rent - a.rent;
      return new Date(b.createdAt) - new Date(a.createdAt); // newest
    });

  const clearFilters = () => {
    setCity(''); setType(''); setBudget(''); setFurnished(''); setAvailableFor(''); setSearch('');
    setSearchParams({});
  };

  const hasFilters = city || type || budget || furnished || availableFor || search;

  return (
    <div className="listings-page page-enter">
      <div className="listings-page__header">
        <div className="container">
          <h1 className="listings-page__title">Find Your Perfect Room</h1>
          <p className="listings-page__subtitle">
            {fetchLoading ? 'Loading listings...' : `${filtered.length} verified listings across India`}
          </p>

          {/* Top Search */}
          <div className="listings-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              id="listings-search-input"
              type="text"
              placeholder="Search by title, location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="listings-search__input"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="listings-layout">
          {/* Sidebar */}
          <aside className="listings-sidebar">
            <div className="sidebar-header">
              <h3>Filters</h3>
              {hasFilters && (
                <button className="btn btn-ghost btn-sm" onClick={clearFilters}>Clear all</button>
              )}
            </div>

            <div className="filter-group">
              <label className="filter-label">City</label>
              <select id="filter-city" className="form-control" value={city} onChange={e => setCity(e.target.value)}>
                <option value="">All Cities</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Property Type</label>
              <div className="filter-checkboxes">
                {propertyTypes.map(t => (
                  <label key={t} className="filter-checkbox">
                    <input
                      type="radio"
                      name="type"
                      value={t}
                      checked={type === t}
                      onChange={() => setType(type === t ? '' : t)}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Budget</label>
              <div className="filter-checkboxes">
                {budgetRanges.map(r => (
                  <label key={r.label} className="filter-checkbox">
                    <input
                      type="radio"
                      name="budget"
                      value={r.label}
                      checked={budget === r.label}
                      onChange={() => setBudget(budget === r.label ? '' : r.label)}
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Furnishing</label>
              <select id="filter-furnished" className="form-control" value={furnished} onChange={e => setFurnished(e.target.value)}>
                <option value="">Any</option>
                <option value="yes">Furnished</option>
                <option value="no">Unfurnished</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Available For</label>
              <select id="filter-available" className="form-control" value={availableFor} onChange={e => setAvailableFor(e.target.value)}>
                <option value="">Anyone</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="listings-main">
            <div className="listings-toolbar">
              <span className="listings-count">
                <strong>{filtered.length}</strong> listings found
              </span>
              <select
                id="listings-sort"
                className="form-control"
                style={{ width: 'auto' }}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Loading State */}
            {fetchLoading && (
              <div className="listings-empty">
                <div className="listings-empty__icon">⏳</div>
                <h3>Loading listings...</h3>
                <p>Fetching the latest properties for you.</p>
              </div>
            )}

            {/* Error State */}
            {!fetchLoading && fetchError && (
              <div className="listings-empty">
                <div className="listings-empty__icon">⚠️</div>
                <h3>Could not load listings</h3>
                <p>{fetchError}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
              </div>
            )}

            {/* Empty State */}
            {!fetchLoading && !fetchError && filtered.length === 0 && (
              <div className="listings-empty">
                <div className="listings-empty__icon">🔍</div>
                <h3>No listings found</h3>
                <p>Try adjusting your filters or search in a different city.</p>
                <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
              </div>
            )}

            {/* Listings Grid */}
            {!fetchLoading && !fetchError && filtered.length > 0 && (
              <div className="listings-grid">
                {filtered.map(listing => (
                  <Link key={listing._id} to={`/listings/${listing._id}`} className="listing-card-full card">
                    <div className="listing-card-full__img-wrap">
                      {listing.images && listing.images.length > 0 ? (
                        <img src={listing.images[0]} alt={listing.title} className="listing-card-full__img" onError={e => { e.target.src = 'https://via.placeholder.com/400x240?text=No+Image'; }} />
                      ) : (
                        <div className="listing-card-full__img" style={{ background: 'var(--color-surface-2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3rem' }}>🏠</div>
                      )}
                      <div className="listing-card-full__img-overlay" />
                      <div className="listing-card-full__top-badges">
                        {listing.furnished && <span className="badge badge-amber">✨ Furnished</span>}
                        <span className={`badge ${listing.isAvailable ? 'badge-teal' : 'badge-rose'}`}>
                          {listing.isAvailable ? '✅ Available' : '❌ Occupied'}
                        </span>
                      </div>
                    </div>
                    <div className="listing-card-full__body">
                      <div className="listing-card-full__header">
                        <div>
                          <h3 className="listing-card-full__title">{listing.title}</h3>
                          <div className="listing-card-full__location">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            {listing.address}
                          </div>
                        </div>
                        <div className="listing-card-full__price">
                          ₹{listing.rent.toLocaleString('en-IN')}
                          <span>/mo</span>
                        </div>
                      </div>

                      <div className="listing-card-full__meta">
                        <span className="tag">🏠 {listing.propertyType}</span>
                        <span className="tag">🛏 {listing.bedrooms} Bed</span>
                        <span className="tag">🚿 {listing.bathrooms} Bath</span>
                        <span className="tag">👥 {listing.availableFor}</span>
                      </div>

                      {listing.amenities && listing.amenities.length > 0 && (
                        <div className="listing-card-full__amenities">
                          {listing.amenities.slice(0, 4).map(a => (
                            <span key={a} className="amenity-tag">{a}</span>
                          ))}
                          {listing.amenities.length > 4 && (
                            <span className="amenity-tag">+{listing.amenities.length - 4} more</span>
                          )}
                        </div>
                      )}

                      <div className="listing-card-full__footer">
                        <div className="listing-card-full__owner">
                          <span style={{ fontSize: '1.2rem' }}>👤</span>
                          <span>{listing.owner?.name || 'Owner'}</span>
                        </div>
                        <span className="btn btn-primary btn-sm">View Details →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
