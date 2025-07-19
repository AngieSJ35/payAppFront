// src/api/products.ts
import { BASE_URL, defaultHeaders } from './config';

export async function fetchProducts() {
    const res = await fetch(`${BASE_URL}/products`, {
        headers: defaultHeaders,
    });
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
}