class Order {
  constructor(id, userId, items, total) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.total = total;
    this.status = 'pending'; 
  }
}

module.exports = Order;