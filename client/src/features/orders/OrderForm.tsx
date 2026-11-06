import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderApiService } from '../../shared/services/api';
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from '../../shared/types/order';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';

const apiService = new OrderApiService();

export function OrderForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<CreateOrderDto>({
    customerName: '',
    customerEmail: '',
    items: [],
    total: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      loadOrder(id);
    }
  }, [id, isEditMode]);

  const loadOrder = async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const order = await apiService.getOrder(orderId);
      setFormData({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        total: order.total,
      });
    } catch (err) {
      console.error('Error al cargar la orden:', err);
      setError('No se pudo cargar la orden. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customerName || formData.customerName.trim().length < 2) {
      errors.customerName = 'El nombre del cliente es requerido (mínimo 2 caracteres)';
    }

    if (!formData.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      errors.customerEmail = 'Ingrese un correo electrónico válido';
    }

    if (!formData.items || formData.items.length === 0) {
      errors.items = 'Debe agregar al menos un item a la orden';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: keyof CreateOrderDto, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [fieldErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isEditMode && id) {
        const updateData: UpdateOrderDto = {
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          items: formData.items,
          total: formData.total,
        };
        await apiService.updateOrder(id, updateData);
      } else {
        await apiService.createOrder(formData);
      }
      navigate('/orders');
    } catch (err) {
      console.error('Error al guardar la orden:', err);
      setError('No se pudo guardar la orden. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = useCallback(() => {
    navigate('/orders');
  }, [navigate]);

  if (loading && isEditMode && !formData.customerName) {
    return (
      <div className="order-form-container">
        <div className="loading-state">
          <div className="spinner" aria-label="Cargando orden"></div>
          <p>Cargando orden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-form-container">
      <header className="order-form-header">
        <h1>{isEditMode ? 'Editar Orden' : 'Nueva Orden'}</h1>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="order-form" noValidate>
        <Input
          label="Nombre del Cliente"
          type="text"
          value={formData.customerName}
          onChange={(e) => handleInputChange('customerName', e.target.value)}
          error={fieldErrors.customerName}
          required
          placeholder="Ingrese el nombre del cliente"
        />

        <Input
          label="Correo Electrónico"
          type="email"
          value={formData.customerEmail}
          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
          error={fieldErrors.customerEmail}
          required
          placeholder="cliente@ejemplo.com"
        />

        <Input
          label="Total"
          type="number"
          value={formData.total}
          onChange={(e) => handleInputChange('total', parseFloat(e.target.value) || 0)}
          min={0}
          step={0.01}
          required
        />

        {fieldErrors.items && (
          <div className="field-error" role="alert">
            {fieldErrors.items}
          </div>
        )}

        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}