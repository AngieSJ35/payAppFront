// src/api/payments.ts
import { BASE_URL, defaultHeaders } from './config';

export async function createTransaction(data: any, selectedProduct: any) {
    const nuevoFormato = {
        productId: selectedProduct.id,
        cardData: {
            cardNumber: data.cardNumber.replace(/\s/g, ""),
            cvv: data.cvv,
            expiration: `${data.expiryMonth}/${data.expiryYear.slice(-2)}`,
            cardHolderName: data.name
        }
    };
    const res = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(nuevoFormato),
    });
    return res.json();
}