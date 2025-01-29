const Order = require('../models/Order');

class OrderService {
  constructor(productCatalogService) {
    this.orders = [];
    this.productCatalogService = productCatalogService;
  }

  createOrder(userId, items) {
    // Check stock and calculate total
    let total = 0;
    const updatedItems = [];
    for (const item of items) {
      const product = this.productCatalogService.getProductById(item.productId);
      if (!product) {
        console.log(`Product ${item.productId} not found`);
        return null;
      }
      if (product.stock < item.quantity) {
        console.log(`Insufficient stock for product ${item.productId}. Available: ${product.stock}, Requested: ${item.quantity}`);
        return null;
      }
      total += product.price * item.quantity;
      updatedItems.push({ ...item, price: product.price });
    }

    const orderId = this.orders.length + 1;
    const newOrder = new Order(orderId, userId, updatedItems, total);
    this.orders.push(newOrder);

    // Update stock
    for (const item of items) {
      this.productCatalogService.updateProduct(
        item.productId,
        null,
        null,
        this.productCatalogService.getProductById(item.productId).stock - item.quantity
      );
    }

    console.log(`Order ${orderId} created successfully.`);
    return newOrder;
  }

  getOrderById(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  getUserOrders(userId) {
    return this.orders.filter(order => order.userId === userId);
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.getOrderById(orderId);
    if (order) {
      order.status = newStatus;
      console.log(`Order ${orderId} status updated to ${newStatus}.`);
      return true;
    }
    return false;
  }
}

module.exports = OrderService;