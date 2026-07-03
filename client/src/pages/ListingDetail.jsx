import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPropertyById, getAllProperties } from '../api/propertyApi';
import './ListingDetail.css';

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImg, setActiveImg] = useState(0);
  const [interestSent, setInterestSent] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getPropertyById(id);
        setListing(data.property);

        // Load similar listings from the same city
        if (data.property?.city) {
          const similar = await getAllProperties({ city: data.property.city });
          setSimilar((similar.properties || []).filter(l => l._id !== id).slice(0, 3));
        }
      } catch (err) {
        setError(err.message || 'Listing not found.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleInterest = () => {
    setInterestSent(true);
    setTimeout(() => navigate('/chat'), 1500);
  };

  // Loading state
  if (loading) {
    return (
      <div className="detail-not-found">
        <div className="container">
          <div className="not-found-box">
            <div className="not-found-icon">⏳</div>
            <h2>Loading Listing...</h2>
            <p>Fetching property details for you.</p>
          </div>
        </div>
      </div>
    );
  }

  // Error / Not Found state
  if (error || !listing) {
    return (
      <div className="detail-not-found">
        <div className="container">
          <div className="not-found-box">
            <div className="not-found-icon">🏚️</div>
            <h2>Listing Not Found</h2>
            <p>{error || 'This listing may have been removed or is no longer available.'}</p>
            <Link to="/listings" className="btn btn-primary">← Back to Listings</Link>
          </div>
        </div>
      </div>
    );
  }

  const scoreColor = '#6C47FF'; // default purple (no aiScore from backend yet)
  const images = listing.images && listing.images.length > 0 ? listing.images : [];

  return (
    <div className="detail-page page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <div className="detail-breadcrumb">
          <Link to="/listings">Listings</Link>
          <span>/</span>
          <span>{listing.city}</span>
          <span>/</span>
          <span>{listing.title}</span>
        </div>

        <div className="detail-layout">
          {/* LEFT COLUMN */}
          <div className="detail-left">
            {/* Image Gallery */}
            <div className="detail-gallery">
              <div className="detail-gallery__main">
                {images.length > 0 ? (
                  <img
                    src={images[activeImg]}
                    alt={listing.title}
                    className="detail-gallery__main-img"
                    onError={e => { e.target.src = 'https://via.placeholder.com/800x500?text=No+Image'; }}
                  />
                ) : (
                  <div className="detail-gallery__main-img" style={{ background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>🏠</div>
                )}
                <div className="detail-gallery__overlay-badges">
                  {listing.furnished && <span className="badge badge-amber">✨ Fully Furnished</span>}
                  <span className={`badge ${listing.isAvailable ? 'badge-teal' : 'badge-rose'}`}>
                    {listing.isAvailable ? '✅ Available' : '❌ Not Available'}
                  </span>
                </div>
              </div>
              {images.length > 1 && (
                <div className="detail-gallery__thumbs">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      className={`detail-gallery__thumb ${activeImg === i ? 'detail-gallery__thumb--active' : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt="" onError={e => { e.target.style.display = 'none'; }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About */}
            <div className="detail-section">
              <h2 className="detail-section__title">About This Property</h2>
              <p className="detail-section__text">{listing.description}</p>
            </div>

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div className="detail-section">
                <h2 className="detail-section__title">Amenities &amp; Features</h2>
                <div className="amenities-grid">
                  {listing.amenities.map(a => (
                    <div key={a} className="amenity-item">
                      <span className="amenity-item__icon">✓</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar */}
            {similar.length > 0 && (
              <div className="detail-section">
                <h2 className="detail-section__title">Similar Listings in {listing.city}</h2>
                <div className="similar-grid">
                  {similar.map(l => (
                    <Link key={l._id} to={`/listings/${l._id}`} className="similar-card">
                      {l.images && l.images.length > 0 ? (
                        <img src={l.images[0]} alt={l.title} className="similar-card__img" onError={e => { e.target.style.display = 'none'; }} />
                      ) : (
                        <div className="similar-card__img" style={{ background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🏠</div>
                      )}
                      <div className="similar-card__body">
                        <div className="similar-card__title">{l.title}</div>
                        <div className="similar-card__price">₹{l.rent.toLocaleString('en-IN')}/mo</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="detail-right">
            {/* Price Card */}
            <div className="detail-price-card">
              <div className="detail-price">
                ₹{listing.rent.toLocaleString('en-IN')}
                <span>/month</span>
              </div>
              <h1 className="detail-title">{listing.title}</h1>
              <div className="detail-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {listing.address}
              </div>

              {/* Quick Stats */}
              <div className="detail-quick-stats">
                <div className="detail-stat">
                  <span className="detail-stat__icon">🏠</span>
                  <span className="detail-stat__label">Type</span>
                  <span className="detail-stat__val">{listing.propertyType}</span>
                </div>
                <div className="detail-stat">
                  <span className="detail-stat__icon">🛏</span>
                  <span className="detail-stat__label">Bedrooms</span>
                  <span className="detail-stat__val">{listing.bedrooms}</span>
                </div>
                <div className="detail-stat">
                  <span className="detail-stat__icon">🚿</span>
                  <span className="detail-stat__label">Bathrooms</span>
                  <span className="detail-stat__val">{listing.bathrooms}</span>
                </div>
                <div className="detail-stat">
                  <span className="detail-stat__icon">👥</span>
                  <span className="detail-stat__label">For</span>
                  <span className="detail-stat__val">{listing.availableFor}</span>
                </div>
              </div>

              {/* Owner */}
              <div className="detail-owner">
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>👤</div>
                <div>
                  <div className="detail-owner__name">{listing.owner?.name || 'Owner'}</div>
                  <div className="detail-owner__meta">{listing.owner?.email || ''}</div>
                </div>
                <span className="badge badge-teal">Verified</span>
              </div>

              {/* CTA */}
              {!interestSent ? (
                <div className="detail-cta">
                  <button
                    id="send-interest-btn"
                    className="btn btn-primary btn-lg"
                    onClick={handleInterest}
                    style={{ width: '100%' }}
                  >
                    💌 Send Interest Request
                  </button>
                  <button
                    className="btn btn-outline btn-lg"
                    onClick={() => setShowContactForm(!showContactForm)}
                    style={{ width: '100%' }}
                  >
                    💬 Message Owner
                  </button>
                </div>
              ) : (
                <div className="interest-success">
                  <div className="interest-success__icon">🎉</div>
                  <div>
                    <strong>Interest Sent!</strong>
                    <p>Redirecting to chat...</p>
                  </div>
                </div>
              )}

              {showContactForm && (
                <div className="detail-contact-form">
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Write a message to the owner..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setShowContactForm(false); navigate('/chat'); }}>
                    Send Message
                  </button>
                </div>
              )}

              <div className="detail-note">
                🔒 Your contact details are kept private until accepted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
