import { useState, useEffect } from 'react'
import { fetchProducts } from '../api/product';
import { createTransaction } from '../api/payment';
import ProductCard from '../components/ProductCard';
import CreditCardModal from '../components/CreditCardModal';
import PurchaseSummary from '../components/PurchaseSummary';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [transactionOK, setTrasactionOK] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(setError);
  }, []);

  const handleComprar = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleCloseOKModal = () => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setTrasactionOK(false);
      })
      .catch((error) => {
        setError(error);
        setShowSummary(false);
      });
  };


  const handleSave = (data: any) => {
    const { name, cardNumber, expiryMonth, expiryYear, cvv } = data;

    const cardDigits = cardNumber.replace(/\s/g, '');

    const isIncomplete =
      !name ||
      !cardNumber ||
      !expiryMonth ||
      !expiryYear ||
      !cvv ||
      cardDigits.length !== 16;

    if (isIncomplete) {
      setValidationError('Completa todos los campos correctamente. La tarjeta debe tener 16 dígitos.');
      return;
    }

    setData(data)
    setShowSummary(true)
    console.log('Producto comprado:', selectedProduct);
    setShowModal(false);
  };

  const onPay = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await createTransaction(data, selectedProduct)
    if (result.status != "SUCCESS") {
      setValidationError('Error al hacer la compra');
    } else setTrasactionOK(true)
  }

  return (
    <div style={{ maxWidth: '100%', display: 'grid', placeItems: 'center' }}>
      <h1 className="text-xl font-bold mb-4 text-center" style={{ textAlign: 'center' }}>Lista de productos</h1>
      {products.map((prod, idx) => (
        <div style={{ justifyContent: 'center' }}>
          <ProductCard key={idx} {...prod} onBuy={() => handleComprar(prod)}
          />
        </div>
      ))}
      {showModal && (
        <CreditCardModal onClose={handleCloseModal} onSave={handleSave} />
      )}
      {validationError != '' && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '12px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            zIndex: 9999,
          }}
        >
          {validationError}
          <br></br>
          <button
            onClick={() => setValidationError('')}
            style={{
              backgroundColor: '#f3f4f6',
              color: '#111827',
              padding: '10px 16px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            OK
          </button>
        </div>
      )}
      {transactionOK && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#88E788',
            color: '#198754',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '12px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            zIndex: 9999,
          }}
        >
          Compra exitosa
          <br></br>
          <button
            onClick={handleCloseOKModal}
            style={{
              backgroundColor: '#f3f4f6',
              color: '#111827',
              padding: '10px 16px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            OK
          </button>
        </div>
      )}
      {showSummary && (
        <PurchaseSummary
          productName={selectedProduct.name}
          productPrice={selectedProduct.price}
          cardNumber={data.cardNumber}
          onClose={() => setShowSummary(false)}
          onPay={onPay}
        />
      )}
    </div>
  )
}

export default HomePage