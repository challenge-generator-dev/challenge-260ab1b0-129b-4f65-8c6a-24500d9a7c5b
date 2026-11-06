import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../services/api';
import type { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from '../types/order';

const ORDERS_QUERY_KEY = ['orders'];
const ORDER_QUERY_KEY = (id: string) => ['orders', id];

export function useOrders() {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery<OrderResponseDto[], Error>({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: () => orderApi.getOrders(),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const createOrderMutation = useMutation<OrderResponseDto, Error, CreateOrderDto>({
    mutationFn: (orderData: CreateOrderDto) => orderApi.createOrder(orderData),
    onSuccess: (newOrder) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      console.log('[useOrders] Orden creada exitosamente:', newOrder.id);
    },
    onError: (error) => {
      console.error('[useOrders] Error al crear orden:', error.message);
    },
  });

  const updateOrderMutation = useMutation<
    OrderResponseDto,
    Error,
    { id: string; data: UpdateOrderDto }
  >({
    mutationFn: ({ id, data }) => orderApi.updateOrder(id, data),
    onSuccess: (updatedOrder) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY(updatedOrder.id) });
      console.log('[useOrders] Orden actualizada exitosamente:', updatedOrder.id);
    },
    onError: (error) => {
      console.error('[useOrders] Error al actualizar orden:', error.message);
    },
  });

  const deleteOrderMutation = useMutation<void, Error, string>({
    mutationFn: (id: string) => orderApi.deleteOrder(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      console.log('[useOrders] Orden eliminada exitosamente:', deletedId);
    },
    onError: (error) => {
      console.error('[useOrders] Error al eliminar orden:', error.message);
    },
  });

  return {
    orders: ordersQuery.data ?? [],
    isLoading: ordersQuery.isLoading,
    isError: ordersQuery.isError,
    error: ordersQuery.error,
    refetch: ordersQuery.refetch,
    createOrder: createOrderMutation.mutate,
    createOrderAsync: createOrderMutation.mutateAsync,
    isCreating: createOrderMutation.isPending,
    createError: createOrderMutation.error,
    updateOrder: updateOrderMutation.mutate,
    updateOrderAsync: updateOrderMutation.mutateAsync,
    isUpdating: updateOrderMutation.isPending,
    updateError: updateOrderMutation.error,
    deleteOrder: deleteOrderMutation.mutate,
    deleteOrderAsync: deleteOrderMutation.mutateAsync,
    isDeleting: deleteOrderMutation.isPending,
    deleteError: deleteOrderMutation.error,
  };
}

export function useOrder(id: string) {
  const queryClient = useQueryClient();

  const orderQuery = useQuery<OrderResponseDto, Error>({
    queryKey: ORDER_QUERY_KEY(id),
    queryFn: () => orderApi.getOrder(id),
    enabled: !!id,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
  });

  const updateOrderMutation = useMutation<
    OrderResponseDto,
    Error,
    { id: string; data: UpdateOrderDto }
  >({
    mutationFn: ({ id, data }) => orderApi.updateOrder(id, data),
    onSuccess: (updatedOrder) => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY(id) });
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      console.log('[useOrder] Orden actualizada:', updatedOrder.id);
    },
  });

  const deleteOrderMutation = useMutation<void, Error, string>({
    mutationFn: (orderId: string) => orderApi.deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
      console.log('[useOrder] Orden eliminada:', id);
    },
  });

  return {
    order: orderQuery.data,
    isLoading: orderQuery.isLoading,
    isError: orderQuery.isError,
    error: orderQuery.error,
    refetch: orderQuery.refetch,
    updateOrder: (data: UpdateOrderDto) =>
      updateOrderMutation.mutate({ id, data }),
    updateOrderAsync: (data: UpdateOrderDto) =>
      updateOrderMutation.mutateAsync({ id, data }),
    isUpdating: updateOrderMutation.isPending,
    updateError: updateOrderMutation.error,
    deleteOrder: () => deleteOrderMutation.mutate(id),
    deleteOrderAsync: () => deleteOrderMutation.mutateAsync(id),
    isDeleting: deleteOrderMutation.isPending,
    deleteError: deleteOrderMutation.error,
  };
}