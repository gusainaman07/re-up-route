import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { mockPharmacies } from '@/data/mockData';
import { CreditCard, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const Checkout = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const shipping = 0;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handlePlaceOrder = async () => {
    if (!selectedPharmacy) {
      toast({
        title: "Error",
        description: "Please select a pharmacy for pickup",
        variant: "destructive",
      });
      return;
    }

    setIsPlacingOrder(true);

    // Simulate order processing
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "You'll receive a confirmation email shortly",
      });
      navigate('/order-confirmation', { 
        state: { 
          orderId: Math.random().toString(36).substr(2, 9),
          pharmacy: mockPharmacies.find(p => p.id === selectedPharmacy),
          total 
        } 
      });
    }, 2000);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <MobileLayout showNavigation={false}>
      <Header title="Checkout" showBack />
      
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 p-4 space-y-6">
          {/* Order Summary */}
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="text-foreground">Free</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tax:</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 flex items-center">
                  <CreditCard size={16} className="mr-2 text-muted-foreground" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex-1">
                  Cash on Pickup
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Pharmacy Selection */}
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <h3 className="font-semibold text-foreground mb-3">Pickup Location</h3>
            <Select value={selectedPharmacy} onValueChange={setSelectedPharmacy}>
              <SelectTrigger>
                <SelectValue placeholder="Select a pharmacy for pickup" />
              </SelectTrigger>
              <SelectContent>
                {mockPharmacies.map((pharmacy) => (
                  <SelectItem key={pharmacy.id} value={pharmacy.id}>
                    <div>
                      <div className="font-medium">{pharmacy.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {pharmacy.address}, {pharmacy.city}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedPharmacy && (
              <div className="mt-3 p-3 bg-secondary rounded-lg">
                <div className="flex items-start">
                  <MapPin size={16} className="text-primary mt-0.5 mr-2" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {mockPharmacies.find(p => p.id === selectedPharmacy)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mockPharmacies.find(p => p.id === selectedPharmacy)?.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mockPharmacies.find(p => p.id === selectedPharmacy)?.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pickup Instructions */}
          <div className="bg-secondary rounded-xl p-4">
            <h4 className="font-medium text-foreground mb-2">Pickup Instructions</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• You'll receive a confirmation email with pickup details</li>
              <li>• Bring a valid ID for order verification</li>
              <li>• Orders are typically ready within 2-4 hours</li>
              <li>• Call the pharmacy if you have any questions</li>
            </ul>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="p-4 border-t border-border">
          <Button 
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder || !selectedPharmacy}
            className="btn-eco w-full text-base py-4"
          >
            {isPlacingOrder ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Placing Order...
              </>
            ) : (
              <>
                <Check size={20} className="mr-2" />
                Place Order - ${total.toFixed(2)}
              </>
            )}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};