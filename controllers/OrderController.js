class OrderController {
    constructor(orderService, authenticationController) {
      this.orderService = orderService;
      this.authenticationController = authenticationController;
    }
  
    createOrder(username, items) {
      return this.orderService.createOrder(username, items);
    }
  
    getUserOrders(username) {
      return this.orderService.getUserOrders(username);
    }
  
    updateOrderStatus(username, orderId, newStatus) {
      if (this.authenticationController.isAdmin(username)) {
        return this.orderService.updateOrderStatus(orderId, newStatus);
      } else {
        console.log("Access denied. Admin rights required.");
        return false;
      }
    }
  }
  
  module.exports = OrderController;