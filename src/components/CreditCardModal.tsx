import { useState } from 'react';
import visa from './../assets/Visa-Logo.png'
import mastercard from './../assets/Mastercard-Logo.png'
type CreditCardModalProps = {
    onClose: () => void;
    onSave: (data: { name: string; cardNumber: string; expiryMonth: string; expiryYear: string; cvv: string }) => void;
};

const CreditCardModal = ({ onClose, onSave }: CreditCardModalProps) => {
    const [form, setForm] = useState({
        name: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        address: '',
        city: '',
        postalCode: ''
    });
    const [step, setStep] = useState(1);
    const [cardType, setCardType] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const getCardType = (number: string) => {
        if (/^4/.test(number)) return 'visa';
        if (/^5[1-5]/.test(number)) return 'mastercard';
        return 'unknown';
    };

    const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '').slice(0, 16);
        const formatted = rawValue.replace(/(.{4})/g, '$1 ').trim();
        setForm({ ...form, cardNumber: formatted });
        const cardtype = getCardType(rawValue)
        setCardType(cardtype)
    }
    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999,
                }}
            >
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '12px',
                        borderRadius: '12px',
                        width: '326px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    }}
                >
                    {step == 1 && (
                        <>
                            <div
                                style={{
                                    position: 'relative', // importante para posicionar absolutamente dentro
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <h2
                                    style={{
                                        marginBottom: '16px',
                                        marginLeft: '10px',
                                        fontSize: '20px',
                                        fontWeight: 600,
                                        maxWidth: '303px',
                                        color: 'black',
                                    }}
                                >
                                    Datos de la tarjeta
                                </h2>

                                <img
                                    src={
                                        cardType === 'visa'
                                            ? visa
                                            : cardType === 'mastercard'
                                                ? mastercard
                                                : ''
                                    }
                                    alt=""
                                    style={{
                                        left: '200',
                                        top: '50%',
                                        width: '80px'
                                    }}
                                />
                            </div>

                            {/* Nombre */}
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nombre en la tarjeta"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    maxWidth: '303px'
                                }}
                            />

                            {/* Número con formato */}
                            <input
                                type="text"
                                name="cardNumber"
                                value={form.cardNumber}
                                onChange={handleCardNumber}
                                placeholder="Número de tarjeta"
                                maxLength={19}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    fontFamily: 'monospace',
                                    maxWidth: '303px',
                                }}
                            />



                            {/* Fecha de vencimiento */}
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', maxWidth: '323px' }}>
                                <select
                                    name="expiryMonth"
                                    value={form.expiryMonth}
                                    onChange={handleChange}
                                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                                >
                                    <option value="">Mes</option>
                                    {Array.from({ length: 12 }, (_, i) => {
                                        const month = (i + 1).toString().padStart(2, '0');
                                        return <option key={month} value={month}>{month}</option>;
                                    })}
                                </select>

                                <select
                                    name="expiryYear"
                                    value={form.expiryYear}
                                    onChange={handleChange}
                                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                                >
                                    <option value="">Año</option>
                                    {Array.from({ length: 10 }, (_, i) => {
                                        const year = (new Date().getFullYear() + i).toString();
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>

                            {/* CVV */}
                            <input
                                type="password"
                                name="cvv"
                                value={form.cvv}
                                onChange={handleChange}
                                placeholder="CVV"
                                maxLength={3}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    maxWidth: '303px'
                                }}
                            />

                            {/* Botones */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '323px' }}>
                                <button
                                    onClick={() => setStep(2)}
                                    style={{
                                        backgroundColor: '#6366f1',
                                        color: '#fff',
                                        padding: '10px 16px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Continuar
                                </button>
                                <button
                                    onClick={onClose}
                                    style={{
                                        backgroundColor: '#f3f4f6',
                                        color: '#111827',
                                        padding: '10px 16px',
                                        borderRadius: '6px',
                                        border: '1px solid #d1d5db',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </>
                    )}

                    {step == 2 &&
                        <>
                            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600, maxWidth: '303px', color: 'black' }}>Datos para el envio</h2>

                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Dirección de entrega"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    maxWidth: '303px'
                                }}
                            />
                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="Ciudad"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    maxWidth: '303px'
                                }}
                            />
                            <input
                                type="text"
                                name="postalCode"
                                value={form.postalCode}
                                onChange={handleChange}
                                placeholder="Código postal"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    maxWidth: '303px'
                                }}
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    onClick={() => onSave(form)}
                                    style={{
                                        backgroundColor: '#6366f1',
                                        color: '#fff',
                                        padding: '10px 16px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Continuar
                                </button>
                                <button
                                    onClick={() => setStep(1)}
                                    style={{
                                        backgroundColor: '#f3f4f6',
                                        color: '#111827',
                                        padding: '10px 16px',
                                        borderRadius: '6px',
                                        border: '1px solid #d1d5db',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Volver
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div >

        </>
    );
};

export default CreditCardModal;