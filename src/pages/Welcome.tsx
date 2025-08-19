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
          <div className="mb-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
              <Leaf size={40} className="text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              EcoFlow
            </h1>
            <p className="text-xl text-muted-foreground mb-3">
              Sustainable Period Care
            </p>
            <p className="text-base text-muted-foreground max-w-md">
              Connecting students with eco-friendly menstrual products through local pharmacies
            </p>
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