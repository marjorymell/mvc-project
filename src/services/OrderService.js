const Order = require('../models/Order');

class OrderService {
  constructor(productCatalogService, paymentService) {
    this.orders = [];
    this.productCatalogService = productCatalogService;
    this.paymentService = paymentService;
  }

  // Creates a new order if products are available
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
        console.log(`OrderService: Insufficient stock for product ${item.productId}. Available: ${product.stock}, Requested: ${item.quantity}`);
        return null;
      }
      total += product.price * item.quantity;
      updatedItems.push({ ...item, price: product.price });
    }

    const orderId = this.orders.length + 1;
    const newOrder = new Order(orderId, userId, updatedItems, total);
    this.orders.push(newOrder);

    // Updates stock after order creation
    for (const item of items) {
      const product = this.productCatalogService.getProductById(item.productId);
      this.productCatalogService.updateProduct(
        item.productId,
        null,
        null,
        product.stock - item.quantity 
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

  // Retrieves an order by ID
  getOrderById(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  // Retrieves all orders for a specific user
  getUserOrders(userId) {
    return this.orders.filter(order => order.userId === userId);
  }

  // Updates the status of an existing order
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