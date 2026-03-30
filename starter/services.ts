import { Product, PrintService, Customer, Item, Order, OrderStatus } from "./models";

// Crear producto
export function createProduct(
  id: string,
  name: string,
  price: number,
  stock: number
): Product {
  return { id, name, price, stock };
}

// Crear servicio de impresión
export function createPrintService(
  id: string,
  type: "blanco_negro" | "color",
  pricePerPage: number
): PrintService {
  return { id, type, pricePerPage };
}

// Calcular total del pedido
export function calculateTotal(items: Item[]): number {
  let total = 0;

  items.forEach((item) => {
    // Qué: verifica si es producto o servicio
    // Para: calcular correctamente el total
    // Impacto: evita errores en precios
    if ("price" in item) {
      total += item.price;
    } else {
      total += item.pricePerPage * 10; // ejemplo: 10 páginas
    }
  });

  return total;
}

// Crear pedido
export function createOrder(
  id: string,
  customer: Customer,
  items: Item[]
): Order {
  return {
    id,
    customer,
    items,
    total: calculateTotal(items),
    status: "pendiente",
  };
}

// Actualizar estado del pedido
export function updateOrderStatus(
  order: Order,
  status: OrderStatus
): Order {
  order.status = status;
  return order;
}