import { apiFetch } from './api';

export const loginUser = (email, password) =>
  apiFetch('/auth/login', { method: 'POST', body: { email, password } });

export const registerUser = (name, email, password, role) =>
  apiFetch('/auth/register', { method: 'POST', body: { name, email, password, role } });
