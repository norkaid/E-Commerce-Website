import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('POST', '/api/cart', { 
        productId: product.id, 
        quantity: 1 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    if (!product.stock || product.stock <= 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    addToCartMutation.mutate();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-slate-300'
        }`}
      />
    ));
  };

  const isOutOfStock = !product.stock || product.stock <= 0;
  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={product.imageUrl || 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400'} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              Sale
            </Badge>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
          
          {product.brand && (
            <p className="text-sm text-slate-500 mb-2">{product.brand}</p>
          )}

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {renderStars(parseFloat(product.rating || '0'))}
            </div>
            <span className="text-sm text-slate-600">
              {product.rating ? parseFloat(product.rating).toFixed(1) : '0.0'} 
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-slate-900">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-slate-500 line-through">
                    ${parseFloat(product.originalPrice!).toFixed(2)}
                  </span>
                )}
              </div>
              {product.stock && product.stock < 10 && product.stock > 0 && (
                <span className="text-xs text-orange-600">
                  Only {product.stock} left
                </span>
              )}
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock || addToCartMutation.isPending}
              className="bg-brand-600 text-white hover:bg-brand-700 transition-colors disabled:opacity-50"
              size="sm"
            >
              {addToCartMutation.isPending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
