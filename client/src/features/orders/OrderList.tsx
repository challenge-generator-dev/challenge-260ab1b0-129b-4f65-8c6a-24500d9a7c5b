import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../shared/hooks/useOrders';
import { OrderApiService } from '../../shared/services/api';
import { OrderResponseDto } from '../../shared/types/order';
import { Button } from '../../shared/components/Button';
import { OrderItem } from './OrderItem';

const apiService = new OrderApiService();

export function OrderList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const { data: orders, isLoading, error, refetch } = useOrders();

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta orden?')) {
      return;
    }
    try {
      await apiService.deleteOrder(id);
      refetch();
    } catch (err) {
      console.error('Error al eliminar la orden:', err);
      alert('No se pudo eliminar la orden. Intente de nuevo.');
    }
  }, [refetch]);

  const handleEdit = useCallback((id: string) => {
    navigate(`/orders/edit/${id}`);
  }, [navigate]);

  const handleView = useCallback((id: string) => {
    navigate(`/orders/${id}`);
  }, [navigate]);

  const handleCreate = useCallback(() => {
    navigate('/orders/new');
  }, [navigate]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];
  const totalPages = orders ? Math.ceil(orders.length / ordersPerPage) : 0;

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="pagination">
        <Button
          variant="ghost"
          size="small"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span className="page-info">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="ghost"
          size="small"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="order-list-container">
        <div className="loading-state">
          <div className="spinner" aria-label="Cargando órdenes"></div>
          <p>Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-list-container">
        <div className="error-state">
          <p>Error al cargar las órdenes</p>
          <Button variant="primary" onClick={() => refetch()}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <header className="order-list-header">
        <h1>Gestión de Órdenes</h1>
        <Button variant="primary" onClick={handleCreate}>
          Nueva Orden
        </Button>
      </header>

      {orders && orders.length === 0 ? (
        <div className="empty-state">
          <p>No hay órdenes registradas</p>
          <Button variant="secondary" onClick={handleCreate}>
            Crear primera orden
          </Button>
        </div>
      ) : (
        <>
          <div className="order-list">
            {currentOrders.map((order: OrderResponseDto) => (
              <OrderItem
                key={order.id}
                order={order}
                onView={() => handleView(order.id)}
                onEdit={() => handleEdit(order.id)}
                onDelete={() => handleDelete(order.id)}
              />
            ))}
          </div>
          {renderPagination()}
        </>
      )}
    </div>
  );
}