import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
/* import CreditCardForm from './pages/CreditCardForm'
import PaymentSummary from './pages/PaymentSummary'
import TransactionResult from './pages/TransactionResult' */
//import PaymentHistory from './pages/PaymentHistory' // luego lo construimos 👀

const App = () => {
  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<ProductPage />} />
{/*     <Route path="/checkout" element={<CreditCardForm />} />
    <Route path="/summary" element={<PaymentSummary />} />
    <Route path="/result" element={<TransactionResult />} /> */}
  </Routes>
</BrowserRouter>
  )
}
export default App
