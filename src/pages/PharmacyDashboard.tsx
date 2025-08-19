import { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { mockProducts } from '@/data/mockData';
import { Package, Plus, Edit, Trash2, BarChart3, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PharmacyDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for pharmacy
  const pharmacyStats = {
    totalProducts: 12,
    totalOrders: 45,
    monthlyRevenue: 2340,
    pendingOrders: 7,
  };

  const recentOrders = [
    { id: '001', customer: 'Sarah J.', items: 'Eco Cup Small, Organic Pads', total: 58.98, status: 'Ready' },
    { id: '002', customer: 'Emma K.', items: 'Period Underwear', total: 34.99, status: 'Pending' },
    { id: '003', customer: 'Lisa M.', items: 'Eco Cup Large', total: 49.99, status: 'Completed' },
  ];

  const managedProducts = mockProducts.slice(0, 4);

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
      }`}
    >
      <Icon size={16} className="mr-2" />
      {label}
    </button>
  );

  return (
    <MobileLayout showNavigation={false}>
      <Header title={`Welcome, ${user?.name}`} />
      
      <div className="p-4 space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <TabButton id="overview" label="Overview" icon={BarChart3} />
          <TabButton id="products" label="Products" icon={Package} />
          <TabButton id="orders" label="Orders" icon={Users} />
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{pharmacyStats.totalProducts}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Orders This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{pharmacyStats.totalOrders}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">${pharmacyStats.monthlyRevenue}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-nature-gold">{pharmacyStats.pendingOrders}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-card rounded-xl p-4 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">#{order.id} - {order.customer}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Ready' ? 'bg-primary/10 text-primary' :
                        order.status === 'Pending' ? 'bg-nature-gold/10 text-earth-brown' :
                        'bg-secondary text-secondary-foreground'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{order.items}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">${order.total}</span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Manage Products</h3>
              <Button className="btn-eco">
                <Plus size={16} className="mr-2" />
                Add Product
              </Button>
            </div>

            <div className="space-y-4">
              {managedProducts.map((product) => (
                <div key={product.id} className="bg-card rounded-xl p-4 shadow-soft">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-earth rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">
                        {product.type === 'cup' ? '🥤' : product.type === 'pad' ? '🟤' : 
                         product.type === 'tampon' ? '🔸' : '👙'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground mb-1">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">${product.price}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.inStock 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-destructive">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <h3 className="font-semibold text-foreground">All Orders</h3>
            <div className="space-y-4">
              {recentOrders.concat([
                { id: '004', customer: 'Anna P.', items: 'Organic Tampons', total: 8.99, status: 'Completed' },
                { id: '005', customer: 'Maya R.', items: 'Cloth Pads Set', total: 24.99, status: 'Ready' },
              ]).map((order) => (
                <div key={order.id} className="bg-card rounded-xl p-4 shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">#{order.id} - {order.customer}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Ready' ? 'bg-primary/10 text-primary' :
                      order.status === 'Pending' ? 'bg-nature-gold/10 text-earth-brown' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{order.items}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">${order.total}</span>
                    <div className="flex space-x-2">
                      {order.status === 'Pending' && (
                        <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
                          Mark Ready
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
};