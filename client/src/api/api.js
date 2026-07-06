// In production, VITE_API_URL points to the deployed backend on Vercel.
// In dev, falls back to '/api' which Vite proxies to localhost:5000.
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function apiFetch(endpoint, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}
