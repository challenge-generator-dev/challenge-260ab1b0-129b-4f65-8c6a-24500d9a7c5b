import { useCallback } from 'react';
import { OrderResponseDto } from '../../shared/types/order';
import { Button } from '../../shared/components/Button';

export interface OrderItemProps {
  order: OrderResponseDto;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function OrderItem({ order, onView, onEdit, onDelete }: OrderItemProps) {
  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }, []);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }, []);

  const getStatusBadgeClass = useCallback((status: string): string => {
    const statusMap: Record<string, string> = {
      pending: 'status-badge--pending',
      processing: 'status-badge--processing',
      completed: 'status-badge--completed',
      cancelled: 'status-badge--cancelled',
    };
    return statusMap[status.toLowerCase()] || 'status-badge--default';
  }, []);

  const itemCount = order.items?.length || 0;

  return (
    <article className="order-item" aria-label={`Orden ${order.id}`}>
      <header className="order-item-header">
        <div className="order-item-id">
          <span className="label">ID:</span>
          <span className="value">{order.id}</span>
        </div>
        <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
          {order.status || 'Sin estado'}
        </span>
      </header>

      <section className="order-item-details">
        <div className="detail-row">
          <span className="label">Cliente:</span>
          <span className="value">{order.customerName}</span>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">{order.customerEmail}</span>
        </div>
        <div className="detail-row">
          <span className="label">Items:</span>
          <span className="value">{itemCount} producto{itemCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="detail-row">
          <span className="label">Total:</span>
          <span className="value total">{formatCurrency(order.total)}</span>
        </div>
        <div className="detail-row">
          <span className="label">Fecha:</span>
          <span className="value">{order.createdAt ? formatDate(order.createdAt) : 'N/A'}</span>
        </div>
      </section>

      <footer className="order-item-actions">
        <Button
          variant="ghost"
          size="small"
          onClick={onView}
          aria-label={`Ver detalles de la orden ${order.id}`}
        >
          Ver
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={onEdit}
          aria-label={`Editar la orden ${order.id}`}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          size="small"
          onClick={onDelete}
          aria-label={`Eliminar la orden ${order.id}`}
        >
          Eliminar
        </Button>
      </footer>
    </article>
  );
}