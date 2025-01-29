class OrderView {
    constructor() {
      process.stdin.setEncoding('utf8');
    }
  
    async displayOrderMenu() {
      console.log('\n--- Order Menu ---');
      console.log('1. Create a new order');
      console.log('2. View my orders');
      console.log('3. Update order status (Admin only)');
      console.log('4. Return to main menu');
      return parseInt(await this.getInput('Choose an option: '));
    }
  
    async getOrderItems(products) {
      const items = [];
      console.log('\nAvailable products:');
      products.forEach(product => {
        console.log(`ID: ${product.id}, Name: ${product.name}, Price: $${product.price}, Stock: ${product.stock}`);
      });
  
      while (true) {
        const productId = parseInt(await this.getInput('Enter product ID (or 0 to finish): '));
        if (productId === 0) break;
  
        const quantity = parseInt(await this.getInput('Enter quantity: '));
        items.push({ productId, quantity });
      }
  
      return items;
    }
  
    displayOrders(orders) {
      console.log('\n--- Your Orders ---');
      orders.forEach(order => {
        console.log(`Order ID: ${order.id}, Total: $${order.total}, Status: ${order.status}`);
        console.log('Items:');
        order.items.forEach(item => {
          console.log(`  Product ID: ${item.productId}, Quantity: ${item.quantity}`);
        });
        console.log('---');
      });
    }
  
    async getOrderUpdateDetails() {
      const orderId = parseInt(await this.getInput('Enter order ID to update: '));
      const newStatus = await this.getInput('Enter new status: ');
      return { orderId, newStatus };
    }
  
    getInput(prompt) {
      return new Promise((resolve) => {
        process.stdout.write(prompt);
        process.stdin.once('data', (data) => {
          resolve(data.toString().trim());
        });
      });
    }
  
    displayMessage(message) {
      console.log(message);
    }
  
    close() {
    }
  }
  
  module.exports = OrderView;