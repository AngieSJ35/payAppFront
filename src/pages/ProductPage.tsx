import { useState, useEffect } from 'react'
//import { useDispatch } from 'react-redux'
//import { saveTransaction } from '../store/transactionSlice'
import { fetchProducts } from '../api/product';
import ProductCard from '../components/ProductCard';
import CreditCardModal from '../components/CreditCardModal';
import PurchaseSummary from '../components/PurchaseSummary';

const HomePage = () => {
  //const dispatch = useDispatch()
  //const [amount, setAmount] = useState('')
  //const [method, setMethod] = useState('Credit Card')
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');
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

  /*   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
  
      const payment = {
        id: crypto.randomUUID(),
        amount: parseFloat(amount),
        method
      }
  
      dispatch(saveTransaction(payment))
      setAmount('')
      setMethod('Credit Card')
      alert('✅ Pago registrado correctamente')
    } */

  return (
    <div/*  className="max-w-[750px] mx-auto p-4 sm:p-6" */ style={{ maxWidth: '100%', display: 'grid', placeItems: 'center' }}>
      <h1 className="text-xl font-bold mb-4 text-center" style={{ textAlign: 'center' }}>Lista de productos</h1>
      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Nequi</option>
          <option>Otros</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Registrar Pago
        </button>
      </form> */}
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
      {showSummary && (
        <PurchaseSummary
          productName={selectedProduct.name}
          productPrice={selectedProduct.price}
          cardNumber={data.cardNumber}
          onClose={() => setShowSummary(false)}
        />
      )}
      {/*       <p>{products[0]?.name}</p>
      <p>{products[0]?.description}</p>
      <p>{products[0]?.stock}</p> */}
    </div>
  )
}

export default HomePage