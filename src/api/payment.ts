// src/api/payments.ts
import { BASE_URL, defaultHeaders } from './config';

export async function createTransaction(/* data: any */) {
    const res = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify('fgdfgd'/* data */),
    });
    if (!res.ok) throw new Error('Error al crear la transacción');
    return res.json();
}