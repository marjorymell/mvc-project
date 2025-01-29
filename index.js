const container = require('./utils/container')();

const {
  authenticationController,
  authenticationView,
  productCatalogController,
  productCatalogView,
  orderController,
  orderView,
} = container;

async function handleOrders(username) {
  while (true) {
    const choice = await orderView.displayOrderMenu();

    switch (choice) {
      case 1: // Create a new order
        const products = productCatalogController.getAllProducts(username);
        if (products) {
          const items = await orderView.getOrderItems(products);
          const newOrder = orderController.createOrder(username, items);
          if (newOrder) {
            orderView.displayMessage('Order created successfully.');
          }
        }
        break;
      case 2: // View my orders
        const orders = orderController.getUserOrders(username);
        if (orders) {
          orderView.displayOrders(orders);
        }
        break;
      case 3: // Update order status (Admin only)
        if (authenticationController.isAdmin(username)) {
          const { orderId, newStatus } = await orderView.getOrderUpdateDetails();
          const updated = orderController.updateOrderStatus(username, orderId, newStatus);
          if (updated) {
            orderView.displayMessage('Order status updated successfully.');
          } else {
            orderView.displayMessage('Failed to update order status.');
          }
        } else {
          orderView.displayMessage('Access denied. Admin rights required.');
        }
        break;
      case 4: // Return to main menu
        return;
      default:
        orderView.displayMessage('Invalid option. Please try again.');
    }
  }
}

async function main() {
  while (true) {
    const choice = await authenticationView.displayMainMenu();

    switch (choice) {
      case 1: // Register
        const registrationCredentials = await authenticationView.getCredentials(true);
        if (registrationCredentials.password !== registrationCredentials.confirmPassword) {
          authenticationView.displayMessage('Passwords do not match. Please try again.');
        } else {
          authenticationController.register(
            registrationCredentials.username,
            registrationCredentials.password
          );
        }
        break;
      case 2: // Login
        const loginCredentials = await authenticationView.getCredentials();
        const loggedInUser = authenticationController.login(
          loginCredentials.username,
          loginCredentials.password
        );
        if (loggedInUser) {
          if (authenticationController.isAdmin(loggedInUser.username)) {
            authenticationView.displayMessage('Logged in as admin.');
            while (true) {
              console.log('\n--- Admin Menu ---');
              console.log('1. Manage Product Catalog');
              console.log('2. Manage Orders');
              console.log('3. Logout');
              const adminChoice = parseInt(await authenticationView.getInput('Choose an option: '));
              if (adminChoice === 1) {
                await handleProductCatalog(loggedInUser.username);
              } else if (adminChoice === 2) {
                await handleOrders(loggedInUser.username);
              } else if (adminChoice === 3) {
                break;
              } else {
                authenticationView.displayMessage('Invalid option. Please try again.');
              }
            }
          } else {
            authenticationView.displayMessage('Logged in as regular user.');
            await handleOrders(loggedInUser.username);
          }
        }
        break;
      case 3: // Exit
        authenticationView.displayMessage('Thank you for using our service. Goodbye!');
        authenticationView.close();
        productCatalogView.close();
        orderView.close();
        return;
      default:
        authenticationView.displayMessage('Invalid option. Please try again.');
    }
  }
}

main().catch(console.error);