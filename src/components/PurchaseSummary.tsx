type PurchaseSummaryProps = {
  productName: string;
  productPrice: number;
  cardNumber: string; // Formateado como "XXXX XXXX XXXX XXXX"
  onClose: () => void;
};
const DOMICILIO = 6500;
const calculateSummary = (productPrice: number, card: string) => {
  const impuesto = productPrice * 0.19;
  const total = productPrice + impuesto + DOMICILIO;
  const last4Digits = card.replace(/\s/g, '').slice(-4);

  return { impuesto, total, last4Digits };
};
const PurchaseSummary = ({ productName, productPrice, cardNumber, onClose, onPay }: PurchaseSummaryProps) => {
  const { impuesto, total, last4Digits } = calculateSummary(productPrice, cardNumber);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        color: 'black',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          bottom: '24px',
        }}
      >
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>Resumen de compra</h2>

        <div style={{ marginBottom: '12px' }}>
          <strong>Producto:</strong> {productName}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>Tarjeta:</strong> **** **** **** {last4Digits}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>Subtotal:</strong> ${productPrice.toLocaleString()}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>IVA (19%):</strong> ${impuesto.toLocaleString()}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>Envío:</strong> ${DOMICILIO.toLocaleString()}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 600, color: '#6366f1', marginBottom: '20px' }}>
          Total: ${total.toLocaleString()}
        </div>

        <button
          onClick={onPay}
          style={{
            backgroundColor: '#6366f1',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 500,
            width: '100%',
            cursor: 'pointer',
          }}
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default PurchaseSummary;