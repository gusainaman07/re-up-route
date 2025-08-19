import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MobileLayout } from '@/components/MobileLayout';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, User, Building2 } from 'lucide-react';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const { toast } = useToast();

  const userType = location.state?.userType as 'user' | 'pharmacy' || 'user';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password, userType);
        navigate(userType === 'user' ? '/home' : '/pharmacy-dashboard');
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords don't match",
            variant: "destructive",
          });
          return;
        }
        await register(formData.name, formData.email, formData.password, userType);
        if (userType === 'pharmacy') {
          navigate('/pharmacy-verification');
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MobileLayout showNavigation={false}>
      <Header title={isLogin ? 'Sign In' : 'Create Account'} showBack />
      
      <div className="p-6">
        {/* User Type Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center bg-secondary rounded-full px-4 py-2">
            {userType === 'user' ? (
              <>
                <User size={16} className="text-primary mr-2" />
                <span className="text-sm font-medium text-secondary-foreground">Student Account</span>
              </>
            ) : (
              <>
                <Building2 size={16} className="text-primary mr-2" />
                <span className="text-sm font-medium text-secondary-foreground">Pharmacy Partner</span>
              </>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">
                {userType === 'user' ? 'Full Name' : 'Business Name'}
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={userType === 'user' ? 'Enter your full name' : 'Enter business name'}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="input-eco"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="input-eco"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="input-eco pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="input-eco"
                required
              />
            </div>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="btn-eco w-full text-base py-3"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'
            }
          </button>
        </div>

        {isLogin && (
          <div className="mt-4 text-center">
            <button className="text-muted-foreground text-sm">
              Forgot your password?
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};