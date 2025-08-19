import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    address: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to Supabase
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    navigate('/profile');
  };

  return (
    <MobileLayout showNavigation={false}>
      <Header title="Edit Profile" showBack />
      
      <div className="p-4 space-y-6">
        {/* Profile Picture */}
        <div className="text-center">
          <div className="relative inline-block">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Camera size={16} className="text-primary-foreground" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Tap to change photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="input-eco"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              className="input-eco"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              className="input-eco"
            />
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="input-eco"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your address"
              className="input-eco"
            />
          </div>
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          className="btn-eco w-full"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </MobileLayout>
  );
};