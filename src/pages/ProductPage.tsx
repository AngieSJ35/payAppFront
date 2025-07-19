import { useState, useEffect } from 'react'
//import { useDispatch } from 'react-redux'
//import { saveTransaction } from '../store/transactionSlice'
import { fetchProducts } from '../api/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  //const dispatch = useDispatch()
  //const [amount, setAmount] = useState('')
  //const [method, setMethod] = useState('Credit Card')
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(setError);
  }, []);
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
  console.log(error)
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
          <ProductCard key={idx} {...prod} />
        </div>
      ))}

      {/*       <p>{products[0]?.name}</p>
      <p>{products[0]?.description}</p>
      <p>{products[0]?.stock}</p> */}
    </div>
  )
}

export default HomePage