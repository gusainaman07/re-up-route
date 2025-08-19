import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
  cartCount?: number;
}

export const Header = ({ title, showBack = false, showCart = false, cartCount = 0 }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-40">
      <div className="flex items-center">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      
      {showCart && (
        <button 
          onClick={() => navigate('/cart')}
          className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ShoppingCart size={20} className="text-foreground" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {cartCount}
            </span>
          )}
        </button>
      )}
    </header>
  );
};