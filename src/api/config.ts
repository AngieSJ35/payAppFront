// src/api/config.ts
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://3.81.235.62:3000';

export const defaultHeaders = {
    'Content-Type': 'application/json',
};