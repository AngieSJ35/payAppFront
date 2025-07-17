import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveTransaction } from '../store/transactionSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('Credit Card')

  const handleSubmit = (e: React.FormEvent) => {
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
  }

  return (
    <div className="max-w-[750px] mx-auto p-4 sm:p-6">
      <h1 className="text-xl font-bold mb-4 text-center">Registro de Pago</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      </form>
    </div>
  )
}

export default HomePage