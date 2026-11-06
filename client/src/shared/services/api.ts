import axios, { AxiosError, AxiosInstance } from 'axios';
import type { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from '../types/order';

const API_BASE_URL = 'http://localhost:3000';

class OrderApiService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data as { message?: string };
          const message = data?.message || `Error ${status}: ${error.message}`;
          console.error(`[OrderAPI] Error ${status}:`, message);
          return Promise.reject(new Error(message));
        } else if (error.request) {
          console.error('[OrderAPI] No se recibió respuesta del servidor');
          return Promise.reject(new Error('No se pudo conectar con el servidor'));
        } else {
          console.error('[OrderAPI] Error de configuración:', error.message);
          return Promise.reject(error);
        }
      }
    );
  }

  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
    const response = await this.client.post<OrderResponseDto>('/orders', orderData);
    console.log('[OrderAPI] Orden creada:', response.data.id);
    return response.data;
  }

  async getOrders(): Promise<OrderResponseDto[]> {
    const response = await this.client.get<OrderResponseDto[]>('/orders');
    console.log('[OrderAPI] Órdenes obtenidas:', response.data.length);
    return response.data;
  }

  async getOrder(id: string): Promise<OrderResponseDto> {
    const response = await this.client.get<OrderResponseDto>(`/orders/${id}`);
    console.log('[OrderAPI] Orden obtenida:', id);
    return response.data;
  }

  async updateOrder(id: string, updateData: UpdateOrderDto): Promise<OrderResponseDto> {
    const response = await this.client.put<OrderResponseDto>(`/orders/${id}`, updateData);
    console.log('[OrderAPI] Orden actualizada:', id);
    return response.data;
  }

  async deleteOrder(id: string): Promise<void> {
    await this.client.delete(`/orders/${id}`);
    console.log('[OrderAPI] Orden eliminada:', id);
  }
}

export const orderApi = new OrderApiService();