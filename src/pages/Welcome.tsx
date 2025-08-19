import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

export const Welcome = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'user' | 'pharmacy' | null>(null);

  const handleUserTypeSelection = (type: 'user' | 'pharmacy') => {
    setUserType(type);
    navigate('/auth', { state: { userType: type } });
  };

  return (
    <MobileLayout showNavigation={false}>
      <div className="flex flex-col min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
              <Leaf size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              EcoFlow
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Sustainable Period Care
            </p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Connecting students with eco-friendly menstrual products through local pharmacies
            </p>
          </div>

          {/* Features */}
          <div className="w-full max-w-sm space-y-4 mb-8">
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-medium text-foreground mb-1">🌱 Eco-Friendly</h3>
              <p className="text-sm text-muted-foreground">Sustainable, reusable menstrual products</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-medium text-foreground mb-1">🏪 Local Pickup</h3>
              <p className="text-sm text-muted-foreground">Order online, collect from nearby pharmacies</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-medium text-foreground mb-1">💡 Student-Led</h3>
              <p className="text-sm text-muted-foreground">Supporting new-age distributors</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 space-y-4">
          <Button 
            onClick={() => handleUserTypeSelection('user')}
            className="btn-eco w-full text-base py-4"
          >
            Shop Products
          </Button>
          
          <Button 
            onClick={() => handleUserTypeSelection('pharmacy')}
            variant="outline"
            className="w-full text-base py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Partner with Us
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};