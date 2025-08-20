import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const shipping = 0; // Free shipping
  const tax = totalPrice * 0.08; // 8% tax
  const total = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <MobileLayout>
        <Header title="Shopping Cart" showBack />
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <ShoppingBag size={64} className="text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Start shopping to add products to your cart</p>
          <Button 
            onClick={() => navigate('/products')}
            className="btn-eco"
          >
            Shop Products
          </Button>
        </div>

        <BottomNavigation />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <Header title="Shopping Cart" showBack />
      
      <div className="flex flex-col min-h-screen">
        {/* Cart Items */}
        <div className="flex-1 p-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-4 shadow-soft">
              <div className="flex items-start space-x-4">
                {/* Product Image */}
                <div className="w-16 h-16 bg-gradient-earth rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.product.brand}</p>
                  <p className="font-semibold text-primary">₹{item.product.price}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-medium text-foreground w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <p className="font-semibold text-foreground">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            className="w-full text-destructive text-sm font-medium py-2"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="p-4 border-t border-border space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax:</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-foreground border-t border-border pt-2">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            onClick={() => navigate('/checkout')}
            className="btn-eco w-full text-base py-4"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </MobileLayout>
  );
};