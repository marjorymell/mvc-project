class OrderView {
  constructor() {
    process.stdin.setEncoding('utf8');
  }

  // Displays the order management menu
  async displayOrderMenu() {
    console.log('\n--- Order Menu ---');
    console.log('1. Create a new order');
    console.log('2. View my orders');
    console.log('3. Process payment for an order');
    console.log('4. Update order status (Admin only)');
    console.log('5. Return to main menu');
    return parseInt(await this.getInput('Choose an option: '));
  }
  
    // Displays available products for purchase
    displayAvailableProducts(products) {
      console.log('\nAvailable products:');
      products.forEach(product => {
        console.log(`ID: ${product.id}, Name: ${product.name}, Price: $${product.price}, Stock: ${product.stock}`);
      });
    }
  
     // Allows user to select products and specify quantities for an order
    async getOrderItems(products) {
      const items = [];
      let continueOrdering = true;
      this.displayAvailableProducts(products);

      while (continueOrdering) {
  
        const productId = parseInt(await this.getInput('Enter product ID (or 0 to finish): '));
        if (productId === 0) {
          continueOrdering = false;
          continue;
        }
  
        const product = products.find(p => p.id === productId);
        if (!product) {
          console.log('Invalid product ID. Please try again.');
          continue;
        }
  
        const quantity = parseInt(await this.getInput('Enter quantity: '));
        if (isNaN(quantity) || quantity <= 0) {
          console.log('Invalid quantity. Please enter a positive number.');
          continue;
        }
  
        if (quantity > product.stock) {
          console.log(`Insufficient stock. Available: ${product.stock}, Requested: ${quantity}`);
          continue;
        }
  
        items.push({ productId, quantity });
      }
  
      return items;
    }
  
     // Displays a list of user orders
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
  
    // Allows admin to update order status
    async getOrderUpdateDetails() {
      const orderId = parseInt(await this.getInput('Enter order ID to update: '));
      const newStatus = await this.getInput('Enter new status: ');
      return { orderId, newStatus };
    }

    // Handles user input for processing a payment
    async getPaymentDetails(availableMethods) {
      console.log('\nAvailable payment methods:');
      availableMethods.forEach((method, index) => {
        console.log(`${index + 1}. ${method}`);
      });
      const methodIndex = parseInt(await this.getInput('Choose a payment method: ')) - 1;
      const orderId = parseInt(await this.getInput('Enter the order ID to process payment: '));
      return { orderId, paymentMethod: availableMethods[methodIndex] };
    }
  
    displayPaymentResult(result) {
      console.log(`\nPayment Result: ${result.message}`);
      console.log(`Order Status: ${result.status}`);
    }

     // Handles user input asynchronously
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