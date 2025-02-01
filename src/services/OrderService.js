const Order = require('../models/Order'); // Importe a classe Order

class OrderService {
  constructor(productCatalogService, paymentService) {
    this.orders = [];
    this.productCatalogService = productCatalogService;
    this.paymentService = paymentService;
  }

  createOrder(userId, items) {
    console.log(`OrderService: Creating order for user ${userId}`);
    let total = 0;
    const updatedItems = [];
    for (const item of items) {
      const product = this.productCatalogService.getProductById(item.productId);
      if (!product) {
        console.log(`OrderService: Product ${item.productId} not found`);
        return null;
      }
      if (product.stock < item.quantity) {
        console.log(`OrderService: Insufficient stock for product ${item.productId}`);
        return null;
      }
      total += product.price * item.quantity;
      updatedItems.push({ ...item, price: product.price });
    }

    const orderId = this.orders.length + 1;
    const newOrder = new Order(orderId, userId, updatedItems, total); // Usando a classe Order
    this.orders.push(newOrder);

    for (const item of items) {
      this.productCatalogService.updateProduct(
        item.productId,
        null,
        null,
        this.productCatalogService.getProductById(item.productId).stock - item.quantity
      );
    }

    console.log(`OrderService: Order ${orderId} created successfully`);
    return newOrder;
  }

  processPayment(orderId, paymentMethod) {
    console.log(`OrderService: Requesting payment processing for order ${orderId}`);
    const order = this.getOrderById(orderId);
    if (!order) {
      console.log(`OrderService: Order ${orderId} not found`);
      return null;
    }

    // Delegate payment processing to PaymentService
    const paymentResult = this.paymentService.processPayment(orderId, order.total, paymentMethod);
    
    // Update order status based on payment result
    order.status = paymentResult.status;
    console.log(`OrderService: Payment processed for order ${orderId}. Status: ${order.status}`);
    return paymentResult;
  }

  getOrderById(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  getUserOrders(userId) {
    return this.orders.filter(order => order.userId === userId);
  }

  updateOrderStatus(orderId, newStatus) {
    console.log(`OrderService: Updating status for order ${orderId}`);
    const updated = this.paymentService.updateOrderStatus(orderId, newStatus);
    if (updated) {
      const order = this.getOrderById(orderId);
      if (order) {
        order.status = newStatus;
        console.log(`OrderService: Order ${orderId} status updated to ${newStatus}`);
      }
    }
    return updated;
  }

  getAvailablePaymentMethods() {
    return this.paymentService.getAvailablePaymentMethods();
  }
}

module.exports = OrderService;