export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  address?: string;
  date: string;
  total: number;
  status: 'pendiente' | 'procecharcoalo' | 'enviado' | 'entregado' | 'cancelado';
  paymentMethod: 'credit_card' | 'debit_card' | 'transfer';
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const ORDERS: Order[] = [
  {
    id: "ORD-2023-1001",
    customerName: "María Antonieta Rojas",
    email: "maria.rojas@ejemplo.cl",
    phone: "+56 9 8765 4321",
    address: "Av. Las Condes 1234, Depto 402, Las Condes",
    date: "2023-11-15T14:30:00Z",
    total: 1250000,
    status: "entregado",
    paymentMethod: "credit_card",
    items: [
      { productId: "1", name: "Solitario Eternity 1ct", quantity: 1, price: 1250000 }
    ]
  },
  {
    id: "ORD-2023-1002",
    customerName: "Juan Pérez Díaz",
    email: "juan.perez@ejemplo.cl",
    date: "2023-11-18T09:15:00Z",
    total: 420000,
    status: "enviado",
    paymentMethod: "debit_card",
    items: [
      { productId: "3", name: "Anillo Eternelle Dorado", quantity: 1, price: 420000 }
    ]
  },
  {
    id: "ORD-2023-1003",
    customerName: "Sofía Vergara",
    email: "s.vergara@ejemplo.cl",
    address: "Alonso de Córdova 5678, Vitacura",
    date: "2023-11-20T16:45:00Z",
    total: 3370000,
    status: "procecharcoalo",
    paymentMethod: "transfer",
    items: [
      { productId: "4", name: "Tennis Necklace 3ct", quantity: 1, price: 2890000 },
      { productId: "9", name: "Aros Trébol Pavé", quantity: 1, price: 480000 }
    ]
  },
  {
    id: "ORD-2023-1004",
    customerName: "Catalina Silva",
    email: "cata.silva@ejemplo.cl",
    date: "2023-11-21T11:20:00Z",
    total: 850000,
    status: "pendiente",
    paymentMethod: "credit_card",
    items: [
      { productId: "7", name: "Aros Argolla Diamante", quantity: 1, price: 850000 }
    ]
  },
  {
    id: "ORD-2023-1005",
    customerName: "Rodrigo Gómez",
    email: "rgomez@ejemplo.cl",
    date: "2023-11-22T10:05:00Z",
    total: 1650000,
    status: "cancelado",
    paymentMethod: "credit_card",
    items: [
      { productId: "2", name: "Trilogy Pavé Zafiro", quantity: 1, price: 1650000 }
    ]
  }
];

export function getOrderById(id: string): Order | undefined {
  return ORDERS.find(o => o.id === id);
}
