type ProductCardProps = {
    name: string;
    price: number;
    description: string;
    stock: number;
};

const ProductCard = ({ name, price, description, stock, onBuy }: ProductCardProps) => {
    return (
        <div
            style={{
                backgroundColor: '#e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '15px',
                width: '313px',
                border: '1px solid #e5e7eb',
                display: 'grid',
                gridTemplateRows: 'auto auto auto auto',
                gap: '12px',
                transition: 'box-shadow 0.3s ease',
                marginBottom: '20px'
            }}
        >
            {/* 🧾 Nombre y precio */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                }}
            >
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>{name}</h2>
                <span style={{ fontSize: '18px', fontWeight: 600, color: '#6366f1' }}>
                    ${price.toFixed(2)}
                </span>
            </div>

            {/* 📝 Descripción */}
            <p
                style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    textAlign: 'center',
                }}
            >
                {description}
            </p>

            {/* 📦 Stock */}
            <div style={{ textAlign: 'right', fontSize: '14px', fontWeight: 500 }}>
                <span style={{ color: stock > 0 ? '#10b981' : '#ef4444' }}>
                    {stock > 0 ? `Stock disponible: ${stock}` : 'Sin stock'}
                </span>
            </div>

            {/* 🛒 Botón */}
            {stock > 0 && (
                <button
                    style={{
                        padding: '10px 16px',
                        backgroundColor: '#6366f1',
                        color: 'white',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 500,
                        width: '50%',
                        margin: 'auto'
                    }}
                    onClick={onBuy}
                >
                    Pay with credit card
                </button>
            )}
        </div>
    );
};

export default ProductCard;