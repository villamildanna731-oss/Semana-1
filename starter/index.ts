// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// ============================================

console.log('🏛️ PROYECTO: PAPELERÍA Y FOTOCOPIAS\n');

// ============================================
// 1. Entidades del dominio
// ============================================

// QUÉ: representa un producto de papelería
// PARA: almacenar productos disponibles
// IMPACTO: permite gestionar inventario
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

// QUÉ: representa un servicio de impresión
// PARA: ofrecer servicios como copias o impresiones
// IMPACTO: permite calcular costos por página
interface PrintService {
  id: string;
  type: 'blanco_negro' | 'color';
  pricePerPage: number;
}

// QUÉ: cliente que realiza pedidos
// PARA: identificar quién compra
// IMPACTO: permite seguimiento de pedidos
interface Customer {
  id: string;
  name: string;
  phone: string;
}

// QUÉ: representa un pedido
// PARA: agrupar productos/servicios de un cliente
// IMPACTO: permite gestionar pedidos correctamente
interface Order {
  id: string;
  customer: Customer;
  items: Item[];
  total: number;
  status: OrderStatus;
}

// ============================================
// 2. Types (union y literales)
// ============================================

// QUÉ: estados posibles de un pedido
// PARA: controlar el flujo del pedido
// IMPACTO: evita estados inválidos
type OrderStatus = 'pendiente' | 'en_proceso' | 'completado' | 'entregado';

// QUÉ: unión de tipos
// PARA: permitir productos o servicios en un pedido
// IMPACTO: flexibilidad en el sistema
type Item = Product | PrintService;

// ============================================
// 3. Funciones
// ============================================

// QUÉ: crea un producto
function createProduct(id: string, name: string, price: number, stock: number): Product {
  return { id, name, price, stock };
}

// QUÉ: crea un servicio de impresión
function createPrintService(
  id: string,
  type: 'blanco_negro' | 'color',
  pricePerPage: number
): PrintService {
  return { id, type, pricePerPage };
}

// QUÉ: calcula el total de un pedido
// PARA: sumar precios de productos y servicios
// IMPACTO: evita errores en cobros
function calculateTotal(items: Item[]): number {
  let total = 0;

  items.forEach((item) => {
    if ('price' in item) {
      total += item.price;
    } else {
      total += item.pricePerPage * 10; // ejemplo: 10 páginas
    }
  });

  return total;
}

// QUÉ: crea un pedido
function createOrder(
  id: string,
  customer: Customer,
  items: Item[]
): Order {
  return {
    id,
    customer,
    items,
    total: calculateTotal(items),
    status: 'pendiente',
  };
}

// QUÉ: filtra pedidos por estado
// PARA: encontrar pedidos específicos
// IMPACTO: mejora la gestión
function filterByStatus(orders: Order[], status: OrderStatus): Order[] {
  return orders.filter((order) => order.status === status);
}

// ============================================
// 4. Pruebas
// ============================================

const customer: Customer = {
  id: '1',
  name: 'Danna',
  phone: '3001234567',
};

const product = createProduct('p1', 'Cuaderno', 5000, 10);
const printService = createPrintService('s1', 'color', 300);

const order1 = createOrder('o1', customer, [product]);
const order2 = createOrder('o2', customer, [printService]);

order2.status = 'completado';

const orders: Order[] = [order1, order2];

console.log('📦 Todos los pedidos:', orders);
console.log('✅ Pedidos completados:', filterByStatus(orders, 'completado'));

// ============================================
// FIN
// ============================================

console.log('\n🚦 Proyecto funcionando correctamente');