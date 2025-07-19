import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
// import CreditCardForm from './pages/CreditCardForm';
// import PaymentSummary from './pages/PaymentSummary';
// import TransactionResult from './pages/TransactionResult';
// import PaymentHistory from './pages/PaymentHistory';

import ScreenWrapper from './components/ScreenWrapper';

const App = () => {
  return (
    <BrowserRouter>
      <ScreenWrapper>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          {/* <Route path="/checkout" element={<CreditCardForm />} />
          <Route path="/summary" element={<PaymentSummary />} />
          <Route path="/result" element={<TransactionResult />} /> */}
        </Routes>
      </ScreenWrapper>
    </BrowserRouter>
  );
};

export default App;