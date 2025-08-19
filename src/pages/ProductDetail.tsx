import { useLocation, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { Star, ShoppingCart, Leaf, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  
  const product = location.state?.product as Product;

  if (!product) {
    navigate('/products');
    return null;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const productFeatures = [
    { icon: Leaf, label: 'Eco-Friendly', value: 'Sustainable materials' },
    { icon: Award, label: 'Quality', value: `${product.rating}/5 rating` },
    { icon: Clock, label: 'Lifespan', value: product.lifespan || 'Long-lasting' },
  ];

  return (
    <MobileLayout showNavigation={false}>
      <Header 
        title={product.name} 
        showBack 
        showCart 
        cartCount={totalItems}
      />
      
      <div className="flex flex-col min-h-screen">
        {/* Product Image */}
        <div className="bg-gradient-earth p-8 flex items-center justify-center">
          <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center">
            <span className="text-6xl">
              {product.type === 'cup' ? '🥤' : product.type === 'pad' ? '🟤' : 
               product.type === 'tampon' ? '🔸' : '👙'}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold text-foreground">{product.name}</h1>
              <span className="text-2xl font-bold text-primary">${product.price}</span>
            </div>
            <p className="text-muted-foreground mb-3">{product.brand}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star size={16} className="text-nature-gold fill-current mr-1" />
                <span className="font-medium text-foreground">{product.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.inStock 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Features</h3>
            <div className="space-y-3">
              {productFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <IconComponent size={16} className="text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{feature.label}: </span>
                      <span className="text-muted-foreground">{feature.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Details */}
          {(product.material || product.capacity) && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
              <div className="bg-secondary rounded-xl p-4 space-y-2">
                {product.material && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span className="font-medium text-foreground">{product.material}</span>
                  </div>
                )}
                {product.capacity && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-medium text-foreground">{product.capacity}</span>
                  </div>
                )}
                {product.lifespan && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lifespan:</span>
                    <span className="font-medium text-foreground">{product.lifespan}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="p-6 border-t border-border">
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="btn-eco w-full text-base py-4"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};