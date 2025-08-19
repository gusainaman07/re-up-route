import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, MapPin, Edit, LogOut, Package, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const profileOptions = [
    {
      icon: Package,
      label: 'Order History',
      action: () => navigate('/orders'),
      description: 'View your past orders'
    },
    {
      icon: Heart,
      label: 'Favorites',
      action: () => navigate('/favorites'),
      description: 'Your saved products'
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => navigate('/settings'),
      description: 'App preferences'
    },
  ];

  const mockOrders = [
    { id: '1', date: '2024-01-15', total: 67.98, status: 'Delivered' },
    { id: '2', date: '2024-01-08', total: 34.99, status: 'Ready for pickup' },
    { id: '3', date: '2023-12-22', total: 45.99, status: 'Delivered' },
  ];

  return (
    <MobileLayout>
      <Header title="Profile" />
      
      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="bg-card rounded-xl p-6 shadow-soft text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold text-foreground mb-1">{user?.name}</h2>
          <p className="text-muted-foreground mb-4">{user?.email}</p>
          <Button 
            variant="outline" 
            className="btn-secondary"
            onClick={() => navigate('/edit-profile')}
          >
            <Edit size={16} className="mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 text-center shadow-soft">
            <div className="text-2xl font-bold text-primary mb-1">{mockOrders.length}</div>
            <div className="text-xs text-muted-foreground">Orders</div>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-soft">
            <div className="text-2xl font-bold text-primary mb-1">5</div>
            <div className="text-xs text-muted-foreground">Favorites</div>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-soft">
            <div className="text-2xl font-bold text-primary mb-1">₹148</div>
            <div className="text-xs text-muted-foreground">Saved</div>
          </div>
        </div>

        {/* Profile Options */}
        <div className="space-y-3">
          {profileOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <button
                key={index}
                onClick={option.action}
                className="w-full bg-card rounded-xl p-4 shadow-soft flex items-center hover:bg-secondary transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <IconComponent size={20} className="text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-foreground">{option.label}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Orders</h3>
            <button 
              onClick={() => navigate('/orders')}
              className="text-primary text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {mockOrders.slice(0, 2).map((order) => (
              <div key={order.id} className="bg-card rounded-xl p-4 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">Order #{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-nature-gold/10 text-earth-brown'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{order.date}</span>
                  <span className="font-semibold text-foreground">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Account</h3>
          
          <button className="w-full bg-card rounded-xl p-4 shadow-soft flex items-center hover:bg-secondary transition-colors">
            <Mail size={20} className="text-muted-foreground mr-4" />
            <div className="flex-1 text-left">
              <span className="font-medium text-foreground">Notifications</span>
            </div>
          </button>

          <button className="w-full bg-card rounded-xl p-4 shadow-soft flex items-center hover:bg-secondary transition-colors">
            <MapPin size={20} className="text-muted-foreground mr-4" />
            <div className="flex-1 text-left">
              <span className="font-medium text-foreground">Delivery Preferences</span>
            </div>
          </button>
        </div>

        {/* Logout */}
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>

      <BottomNavigation />
    </MobileLayout>
  );
};