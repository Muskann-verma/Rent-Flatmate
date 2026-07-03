import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyProperties } from '../api/propertyApi';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');
  const [myListings, setMyListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [listingsError, setListingsError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoadingListings(true);
      setListingsError('');
      try {
        const data = await getMyProperties(token);
        setMyListings(data.properties || []);
      } catch (err) {
        setListingsError(err.message || 'Failed to load your listings.');
      } finally {
        setLoadingListings(false);
      }
    };
    if (token) load();
  }, [token]);

  const stats = [
    { icon: '🏠', label: 'Active Listings', value: String(myListings.filter(l => l.isAvailable).length), color: 'purple' },
    { icon: '💌', label: 'Interest Requests', value: '—', color: 'teal' },
    { icon: '💬', label: 'Active Chats', value: '—', color: 'amber' },
    { icon: '👀', label: 'Profile Views', value: '—', color: 'rose' },
  ];

  return (
    <div className="dashboard-page page-enter">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header__inner">
            <div className="dashboard-header__user">
              <div className="dashboard-user-avatar-placeholder">
                {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div>
                <div className="dashboard-user-name">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</div>
                <div className="dashboard-user-role">
                  <span className="badge badge-primary">{user?.role === 'owner' ? 'Owner' : 'Tenant'} Dashboard</span>
                  <span className="dashboard-user-email">{user?.email}</span>
                </div>
              </div>
            </div>
            <Link to="/post-listing" className="btn btn-primary">
              + Post New Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="container dashboard-body">
        {/* Stats */}
        <div className="dashboard-stats">
          {stats.map(s => (
            <div key={s.label} className={`dashboard-stat-card dashboard-stat-card--${s.color}`}>
              <div className="dashboard-stat-icon">{s.icon}</div>
              <div className="dashboard-stat-val">{s.value}</div>
              <div className="dashboard-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          {['listings', 'analytics'].map(tab => (
            <button
              key={tab}
              id={`dashboard-tab-${tab}`}
              className={`dashboard-tab ${activeTab === tab ? 'dashboard-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'listings' ? '🏠 My Listings' : '📊 Analytics'}
            </button>
          ))}
        </div>

        {/* My Listings Tab */}
        {activeTab === 'listings' && (
          <div className="dashboard-content animate-fadeIn">
            <div className="dashboard-section-header">
              <h3>My Listings</h3>
              <Link to="/post-listing" className="btn btn-outline btn-sm">+ Add Listing</Link>
            </div>

            {loadingListings && (
              <div style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-text-muted)' }}>
                ⏳ Loading your listings...
              </div>
            )}

            {!loadingListings && listingsError && (
              <div style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-rose)' }}>
                ⚠️ {listingsError}
              </div>
            )}

            {!loadingListings && !listingsError && myListings.length === 0 && (
              <div style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🏠</div>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>No listings yet</h3>
                <p>Post your first property to reach thousands of tenants.</p>
                <Link to="/post-listing" className="btn btn-primary" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>
                  + Post a Listing
                </Link>
              </div>
            )}

            {!loadingListings && !listingsError && myListings.length > 0 && (
              <div className="listings-table">
                <div className="listings-table__head">
                  <span>Property</span>
                  <span>Rent</span>
                  <span>Type</span>
                  <span>City</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                {myListings.map(listing => (
                  <div key={listing._id} className="listings-table__row">
                    <div className="listings-table__property">
                      {listing.images && listing.images.length > 0 ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="listings-table__thumb"
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="listings-table__thumb" style={{ background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', borderRadius: 'var(--radius-md)' }}>🏠</div>
                      )}
                      <div>
                        <div className="listings-table__title">{listing.title}</div>
                        <div className="listings-table__address">{listing.address}</div>
                      </div>
                    </div>
                    <span className="listings-table__rent">₹{listing.rent.toLocaleString('en-IN')}/mo</span>
                    <span className="tag">{listing.propertyType}</span>
                    <span className="tag">{listing.city}</span>
                    <span className={`badge ${listing.isAvailable ? 'badge-teal' : 'badge-rose'}`}>
                      {listing.isAvailable ? 'Available' : 'Occupied'}
                    </span>
                    <div className="listings-table__actions">
                      <Link to={`/listings/${listing._id}`} className="btn btn-ghost btn-sm">View</Link>
                      <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-rose)' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="dashboard-content animate-fadeIn">
            <div className="dashboard-section-header">
              <h3>Analytics Overview</h3>
              <span className="badge badge-primary">Last 30 days</span>
            </div>
            <div className="analytics-grid">
              {[
                { label: 'Profile Views', value: '—', change: 'Coming soon', up: true },
                { label: 'Interest Received', value: '—', change: 'Coming soon', up: true },
                { label: 'Total Listings', value: String(myListings.length), change: 'All time', up: true },
                { label: 'Active Listings', value: String(myListings.filter(l => l.isAvailable).length), change: 'Currently live', up: true },
              ].map(a => (
                <div key={a.label} className="analytics-card">
                  <div className="analytics-card__label">{a.label}</div>
                  <div className="analytics-card__value">{a.value}</div>
                  <div className={`analytics-card__change ${a.up ? 'up' : 'down'}`}>
                    {a.up ? '↑' : '↓'} {a.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Simple bar chart mock */}
            <div className="analytics-chart">
              <div className="analytics-chart__title">Weekly Views (coming soon)</div>
              <div className="analytics-chart__bars">
                {[30, 55, 40, 70, 90, 65, 80].map((h, i) => (
                  <div key={i} className="analytics-chart__bar-wrap">
                    <div
                      className="analytics-chart__bar"
                      style={{ height: `${h}%` }}
                      title={`${h} views`}
                    />
                    <span className="analytics-chart__label">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
