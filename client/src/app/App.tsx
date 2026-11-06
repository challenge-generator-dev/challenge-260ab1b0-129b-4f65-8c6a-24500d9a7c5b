import { Routes, Route, Navigate } from 'react-router-dom';
import { OrderList } from '../features/orders/OrderList';
import { OrderForm } from '../features/orders/OrderForm';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Órdenes</h1>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/new" element={<OrderForm />} />
          <Route path="/orders/:id" element={<OrderForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;