import { Home, ShoppingCart, User, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  icon: typeof Home;
  label: string;
  path: string;
}

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="nav-bottom">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <IconComponent 
                size={20} 
                className={isActive ? 'text-primary' : ''}
              />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};