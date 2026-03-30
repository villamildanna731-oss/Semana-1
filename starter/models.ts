// Qué: define los estados posibles de un pedido
// Para: controlar el flujo del pedido
// Impacto: evita valores inválidos
export type OrderStatus = "pendiente" | "en_proceso" | "completado" | "entregado";

// Qué: representa un producto de papelería
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

// Qué: representa un servicio de impresión
export interface PrintService {
  id: string;
  type: "blanco_negro" | "color"; // type literal
  pricePerPage: number;
}

// Qué: cliente que realiza pedidos
export interface Customer {
  id: string;
  name: string;
  phone: string;
}

// Qué: unión de tipos (producto o servicio)
// Para: manejar ambos en un mismo pedido
// Impacto: flexibilidad en el sistema
export type Item = Product | PrintService;

// Qué: pedido del cliente
export interface Order {
  id: string;
  customer: Customer;
  items: Item[];
  total: number;
  status: OrderStatus;
}