import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Building2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PharmacyVerification = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    licenseNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    description: '',
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate required fields for step 1
      const requiredFields = ['businessName', 'licenseNumber', 'address', 'city', 'state', 'zipCode'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success step
    }, 3000);
  };

  const handleFinish = () => {
    navigate('/pharmacy-dashboard');
  };

  if (step === 3) {
    return (
      <MobileLayout showNavigation={false}>
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-primary-foreground" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Verification Complete!
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-sm">
            Your pharmacy has been successfully verified. You can now start managing your product listings.
          </p>
          
          <div className="w-full max-w-xs mb-8">
            <div className="bg-gradient-earth rounded-xl p-6">
              <Building2 size={48} className="text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">{formData.businessName}</h3>
              <p className="text-white/80 text-sm">Verified Partner</p>
            </div>
          </div>
          
          <Button 
            onClick={handleFinish}
            className="btn-eco w-full max-w-xs"
          >
            Manage Listings
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showNavigation={false}>
      <Header title="Pharmacy Verification" showBack />
      
      <div className="p-4 space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
          }`}>
            1
          </div>
          <div className={`h-1 w-12 ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
          }`}>
            2
          </div>
        </div>

        {step === 1 && (
          <>
            <div className="text-center mb-6">
              <Building2 size={48} className="text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Business Information
              </h2>
              <p className="text-muted-foreground">
                Please provide your pharmacy's basic information for verification
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter your pharmacy name"
                  className="input-eco"
                  required
                />
              </div>

              <div>
                <Label htmlFor="licenseNumber">Pharmacy License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  placeholder="Enter license number"
                  className="input-eco"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter street address"
                  className="input-eco"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City"
                    className="input-eco"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="State"
                    className="input-eco"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="ZIP Code"
                  className="input-eco"
                  required
                />
              </div>
            </div>

            <Button 
              onClick={handleNextStep}
              className="btn-eco w-full"
            >
              Next Step
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-6">
              <FileText size={48} className="text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Document Upload
              </h2>
              <p className="text-muted-foreground">
                Upload required documents for verification
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Phone number"
                  className="input-eco"
                />
              </div>

              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Contact email"
                  className="input-eco"
                />
              </div>

              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of your pharmacy"
                  className="input-eco min-h-[100px]"
                />
              </div>

              {/* Document Upload Areas */}
              <div className="space-y-3">
                <Label>Required Documents</Label>
                
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                  <Upload size={32} className="text-muted-foreground mx-auto mb-2" />
                  <p className="font-medium text-foreground mb-1">Business License</p>
                  <p className="text-sm text-muted-foreground">Upload your pharmacy license</p>
                  <Button variant="outline" className="mt-3">
                    Choose File
                  </Button>
                </div>

                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                  <Upload size={32} className="text-muted-foreground mx-auto mb-2" />
                  <p className="font-medium text-foreground mb-1">Tax Certificate</p>
                  <p className="text-sm text-muted-foreground">Upload business tax certificate</p>
                  <Button variant="outline" className="mt-3">
                    Choose File
                  </Button>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-eco w-full"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                'Submit for Verification'
              )}
            </Button>
          </>
        )}

        <div className="text-xs text-muted-foreground text-center">
          Your information is secure and will only be used for verification purposes.
        </div>
      </div>
    </MobileLayout>
  );
};