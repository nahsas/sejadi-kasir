export type MenuItem = {
  id: string;
  name: string;
  category: 'Coffee' | 'Tea' | 'Pastry';
  price: number;
  isAvailable: boolean;
};

export type OrderItem = {
  menuItemId: string;
  quantity: number;
};

export type Order = {
  id: string;
  orderType: 'Dine In' | 'Takeaway';
  customerName: string; // Used for Takeaway or Dine In if table name not available
  tableName?: string; // Used for Dine In
  items: OrderItem[];
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  total: number;
  paymentMethod: 'Cash' | 'Credit Card' | 'GoPay';
  createdAt: Date;
};

export const menuItems: MenuItem[] = [
  { id: 'MENU001', name: 'Espresso', category: 'Coffee', price: 2.5, isAvailable: true },
  { id: 'MENU002', name: 'Latte', category: 'Coffee', price: 3.5, isAvailable: true },
  { id: 'MENU003', name: 'Cappuccino', category: 'Coffee', price: 3.5, isAvailable: false },
  { id: 'MENU004', name: 'Americano', category: 'Coffee', price: 3.0, isAvailable: true },
  { id: 'MENU005', name: 'Green Tea', category: 'Tea', price: 2.0, isAvailable: true },
  { id: 'MENU006', name: 'Croissant', category: 'Pastry', price: 2.75, isAvailable: true },
  { id: 'MENU007', name: 'Muffin', category: 'Pastry', price: 2.25, isAvailable: false },
  { id: 'MENU008', name: 'Black Tea', category: 'Tea', price: 2.0, isAvailable: true },
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    orderType: 'Dine In',
    tableName: 'Table 5',
    customerName: 'John Doe',
    items: [{ menuItemId: 'MENU002', quantity: 2 }],
    status: 'Completed',
    total: 7.0,
    paymentMethod: 'Credit Card',
    createdAt: new Date('2023-10-26T10:00:00Z'),
  },
  {
    id: 'ORD002',
    orderType: 'Takeaway',
    customerName: 'Jane Smith',
    items: [{ menuItemId: 'MENU001', quantity: 1 }, { menuItemId: 'MENU006', quantity: 1 }],
    status: 'Processing',
    total: 5.25,
    paymentMethod: 'Cash',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: 'ORD003',
    orderType: 'Takeaway',
    customerName: 'Alice Johnson',
    items: [{ menuItemId: 'MENU005', quantity: 1 }],
    status: 'Pending',
    total: 2.0,
    paymentMethod: 'GoPay',
    createdAt: new Date(),
  },
  {
    id: 'ORD004',
    orderType: 'Dine In',
    tableName: 'Table 2',
    customerName: 'Bob Brown',
    items: [{ menuItemId: 'MENU004', quantity: 1 }],
    status: 'Completed',
    total: 3.0,
    paymentMethod: 'Cash',
    createdAt: new Date(),
  },
    {
    id: 'ORD005',
    orderType: 'Takeaway',
    customerName: 'Charlie Davis',
    items: [{ menuItemId: 'MENU002', quantity: 1 }, { menuItemId: 'MENU007', quantity: 2 }],
    status: 'Cancelled',
    total: 8.0,
    paymentMethod: 'Credit Card',
    createdAt: new Date('2023-10-25T09:00:00Z'),
  },
];
