import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';
import { Filter, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'cup', label: 'Menstrual Cups' },
    { value: 'pad', label: 'Pads' },
    { value: 'tampon', label: 'Tampons' },
    { value: 'underwear', label: 'Period Underwear' },
  ];

  const filteredProducts = mockProducts
    .filter(product => selectedCategory === 'all' || product.type === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <MobileLayout>
      <Header 
        title="All Products" 
        showBack 
        showCart 
        cartCount={totalItems}
      />
      
      <div className="p-4 space-y-4">
        {/* Filters */}
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>

        {/* Product Grid */}
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
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-primary">₹{product.price}</span>
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
                className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-xs py-2"
              >
                <Plus size={12} className="mr-1" />
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </MobileLayout>
  );
};