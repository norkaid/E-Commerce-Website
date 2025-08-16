import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import type { CartItem, Product } from '@shared/schema';

export function useCart() {
  const { isAuthenticated } = useAuth();

  const { data: cartItems = [], isLoading, error } = useQuery<(CartItem & { product: Product })[]>({
    queryKey: ['/api/cart'],
    enabled: isAuthenticated,
  });

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartTotal = cartItems.reduce((sum, item) => {
    return sum + (parseFloat(item.product.price) * item.quantity);
  }, 0);

  const isCartEmpty = cartItems.length === 0;

  return {
    cartItems,
    cartItemCount,
    cartTotal,
    isCartEmpty,
    isLoading,
    error,
  };
}
