import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';
import { Search, Plus, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, totalItems } = useCart();

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredProducts = mockProducts.slice(0, 4);
  const popularProducts = mockProducts.slice(2, 6);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const renderProductGrid = (products: Product[], title: string) => (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="product-card cursor-pointer"
          >
            <div className="aspect-square bg-gradient-earth rounded-lg mb-3 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">
                  {product.type === 'cup' ? '🥤' : product.type === 'pad' ? '🟤' : 
                   product.type === 'tampon' ? '🔸' : '👙'}
                </span>
              </div>
            </div>
            <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary">${product.price}</span>
              <div className="flex items-center">
                <Star size={12} className="text-nature-gold fill-current mr-1" />
                <span className="text-xs text-muted-foreground">{product.rating}</span>
              </div>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full mt-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-xs py-2"
            >
              <Plus size={12} className="mr-1" />
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <MobileLayout>
      <Header 
        title={`Hello, ${user?.name?.split(' ')[0] || 'there'}!`} 
        showCart 
        cartCount={totalItems}
      />
      
      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 input-eco"
          />
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-eco rounded-xl p-6 text-center">
          <h2 className="text-white text-lg font-semibold mb-2">
            Sustainable Period Care
          </h2>
          <p className="text-white/90 text-sm mb-4">
            Eco-friendly products delivered to your local pharmacy
          </p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-white text-primary hover:bg-white/90"
          >
            Shop All Products
          </Button>
        </div>

        {/* Products */}
        {searchQuery ? (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Search Results ({filteredProducts.length})
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="product-card cursor-pointer"
                >
                  <div className="aspect-square bg-gradient-earth rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">
                        {product.type === 'cup' ? '🥤' : product.type === 'pad' ? '🟤' : 
                         product.type === 'tampon' ? '🔸' : '👙'}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">${product.price}</span>
                    <div className="flex items-center">
                      <Star size={12} className="text-nature-gold fill-current mr-1" />
                      <span className="text-xs text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-full mt-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-xs py-2"
                  >
                    <Plus size={12} className="mr-1" />
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {renderProductGrid(featuredProducts, 'Featured Products')}
            {renderProductGrid(popularProducts, 'Popular Products')}
          </>
        )}
      </div>

      <BottomNavigation />
    </MobileLayout>
  );
};