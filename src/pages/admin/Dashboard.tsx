import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingCart, Calendar } from 'lucide-react';
import { formatIndianRupees } from '@/services/api';

// Mock data for dashboard stats
const stats = [
  { 
    id: 1, 
    title: 'Total Users', 
    value: '1,285', 
    increase: '+12.5%', 
    description: 'From last month',
    icon: <Users className="h-8 w-8 text-pawtrack-blue" />
  },
  { 
    id: 2, 
    title: 'Products', 
    value: '456', 
    increase: '+5.2%', 
    description: 'Total inventory',
    icon: <Package className="h-8 w-8 text-pawtrack-orange" />
  },
  { 
    id: 3, 
    title: 'Orders', 
    value: '368', 
    increase: '+8.1%', 
    description: 'This month',
    icon: <ShoppingCart className="h-8 w-8 text-green-500" />
  },
  { 
    id: 4, 
    title: 'Appointments', 
    value: '128', 
    increase: '+3.7%', 
    description: 'Scheduled this week',
    icon: <Calendar className="h-8 w-8 text-purple-500" />
  }
];

// Mock data for recent orders with updated fields
const recentOrders = [
  { 
    id: '#ORD-12345', 
    customerId: 'CUST-001', 
    customer: 'John Smith', 
    date: '2023-06-01', 
    status: 'Processing', 
    amount: 12599, 
    productIds: ['PROD-001', 'PROD-003'], 
    paymentType: 'COD' 
  },
  { 
    id: '#ORD-12346', 
    customerId: 'CUST-002', 
    customer: 'Alice Johnson', 
    date: '2023-06-01', 
    status: 'Pending', 
    amount: 8950, 
    productIds: ['PROD-002'], 
    paymentType: 'COD' 
  },
  { 
    id: '#ORD-12347', 
    customerId: 'CUST-003', 
    customer: 'Robert Brown', 
    date: '2023-05-31', 
    status: 'Delivered', 
    amount: 21175, 
    productIds: ['PROD-005', 'PROD-007', 'PROD-010'], 
    paymentType: 'COD' 
  },
  { 
    id: '#ORD-12348', 
    customerId: 'CUST-004', 
    customer: 'Emily Davis', 
    date: '2023-05-31', 
    status: 'Cancelled', 
    amount: 4325, 
    productIds: ['PROD-004'], 
    paymentType: 'COD' 
  },
  { 
    id: '#ORD-12349', 
    customerId: 'CUST-005', 
    customer: 'Michael Wilson', 
    date: '2023-05-30', 
    status: 'Shipped', 
    amount: 15600, 
    productIds: ['PROD-008', 'PROD-012'], 
    paymentType: 'COD' 
  },
];

// Mock data for popular products
const popularProducts = [
  { name: 'Premium Dog Food', sales: 87, stock: 122 },
  { name: 'Cat Scratching Post', sales: 65, stock: 34 },
  { name: 'Dog Collar (Medium)', sales: 52, stock: 78 },
  { name: 'Pet Carrier', sales: 49, stock: 23 },
  { name: 'Interactive Cat Toy', sales: 43, stock: 15 },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your admin dashboard.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                  {stat.increase}
                  <span className="text-gray-500">{stat.description}</span>
                </p>
              </div>
              <div>{stat.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-6">
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm">{order.id}</td>
                      <td className="py-2 px-4 text-sm">{order.customer}</td>
                      <td className="py-2 px-4 text-sm">{order.customerId}</td>
                      <td className="py-2 px-4 text-sm">{order.date}</td>
                      <td className="py-2 px-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-sm">{order.paymentType}</td>
                      <td className="py-2 px-4 text-sm text-right">{formatIndianRupees(order.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Popular Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Sales</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {popularProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm">{product.name}</td>
                      <td className="py-2 px-4 text-sm text-right">{product.sales}</td>
                      <td className="py-2 px-4 text-sm text-right">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                          ${product.stock > 50 ? 'bg-green-100 text-green-800' : 
                          product.stock > 20 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
