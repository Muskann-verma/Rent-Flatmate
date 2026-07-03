import { apiFetch } from './api';

export const getAllProperties = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });
  const query = params.toString() ? `?${params.toString()}` : '';
  return apiFetch(`/property${query}`);
};

export const getPropertyById = (id) =>
  apiFetch(`/property/${id}`);

export const getMyProperties = (token) =>
  apiFetch('/property/mine', { token });

export const addProperty = (body, token) =>
  apiFetch('/property/add', { method: 'POST', body, token });
