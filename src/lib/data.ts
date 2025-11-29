
export type MenuItem = {
  id: string;
  name: string;
  category: 'Coffee' | 'Tea' | 'Pastry';
  price: number;
  isAvailable: boolean;
};

export type OrderItem = {
  id: number;
  pesanan_id: number;
  menu_id: number;
  jumlah: number;
  subtotal: string;
  note: string | null;
  varian: string | null;
  additionals: any;
  dimsum_additionals: any;
  additional_price: string;
  base_price: number;
  is_locked: boolean;
  cancelled_qty: number;
  cancellation_notes: string | null;
  cancelled_at: string | null;
  jumlah_asli: number | null;
};

export type Order = {
  id: number;
  no_meja: string;
  status: string; // 'pending', 'diproses', 'selesai'
  total: string;
  created_at: string;
  note: string | null;
  updated_at: string;
  cancellation_reason: string | null;
  cancelled_at: string | null;
  location_type: 'DINE_IN' | 'TAKEAWAY';
  pickup_time: string | null;
  discount_code: string | null;
  discount_amount: string | null;
  total_after_discount: string | null;
  processed_at: string | null;
  completed_at: string | null;
  is_hidden: boolean | null;
  archived_at: string | null;
  location_area: string | null;
  metode_pembayaran: string | null;
  bank_qris: string | null;
  is_final: boolean | null;
  detail_pesanans: OrderItem[];
};


// The following are mock data and will be replaced by API calls.
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

export const orders: any[] = [];
