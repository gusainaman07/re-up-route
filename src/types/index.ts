export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'pharmacy' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  type: 'cup' | 'pad' | 'tampon' | 'underwear';
  brand: string;
  price: number;
  description: string;
  image: string;
  capacity?: string;
  material?: string;
  lifespan?: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  pharmacy?: Pharmacy;
  createdAt: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  verified: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  userType: 'user' | 'pharmacy' | null;
}