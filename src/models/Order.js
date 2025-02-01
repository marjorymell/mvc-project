class Order {
    constructor(id, userId, items, total, status = 'pending') {
      this.id = id;
      this.userId = userId;
      this.items = items; 
      this.total = total;
      this.status = status;
    }
  }
  
  module.exports = Order;