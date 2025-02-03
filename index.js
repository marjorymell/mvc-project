const container = require('./src/utils/container')();

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
        const products = productCatalogController.getAllProducts();
        if (products) {
          const items = await orderView.getOrderItems(products);
          if (items.length > 0) {
            const newOrder = orderController.createOrder(username, items);
            if (newOrder) {
              orderView.displayMessage('Order created successfully.');
            }
          } else {
            orderView.displayMessage('No items added to the order.');
          }
        }
        break;
      case 2: // View my orders
        const orders = orderController.getUserOrders(username);
        if (orders) {
          orderView.displayOrders(orders);
        }
        break;
        case 3: // Process payment for an order
        const availableMethods = orderController.getAvailablePaymentMethods();
        const paymentDetails = await orderView.getPaymentDetails(availableMethods);
        const paymentResult = orderController.processPayment(username, paymentDetails.orderId, paymentDetails.paymentMethod);
        orderView.displayPaymentResult(paymentResult);
        break;
        case 4: // Update order status (Admin only)
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
        case 5: // Return to main menu
        return;
      default:
        orderView.displayMessage('Invalid option. Please try again.');
    }
  }
}

async function handleProductCatalog(username) {
  while (true) {
    const choice = await productCatalogView.displayCatalogMenu();

    switch (choice) {
      case 1: // View all products
        const products = productCatalogController.getAllProducts();
        productCatalogView.displayProducts(products);
        break;
      case 2: // Add a product
        if (authenticationController.isAdmin(username)) {
          const productDetails = await productCatalogView.getProductDetails();
          const newProduct = productCatalogController.addProduct(username, productDetails.name, productDetails.price, productDetails.stock);
          if (newProduct) {
            productCatalogView.displayMessage('Product added successfully.');
          } else {
            productCatalogView.displayMessage('Failed to add product.');
          }
        } else {
          productCatalogView.displayMessage('Access denied. Admin rights required.');
        }
        break;
      case 3: // Update a product
        if (authenticationController.isAdmin(username)) {
          const updateDetails = await productCatalogView.getProductDetails(true);
          const updated = productCatalogController.updateProduct(username, updateDetails.id, updateDetails.name, updateDetails.price, updateDetails.stock);
          if (updated) {
            productCatalogView.displayMessage('Product updated successfully.');
          } else {
            productCatalogView.displayMessage('Failed to update product.');
          }
        } else {
          productCatalogView.displayMessage('Access denied. Admin rights required.');
        }
        break;
      case 4: // Delete a product
        if (authenticationController.isAdmin(username)) {
          const productId = await productCatalogView.getProductId();
          const deleted = productCatalogController.deleteProduct(username, productId);
          if (deleted) {
            productCatalogView.displayMessage('Product deleted successfully.');
          } else {
            productCatalogView.displayMessage('Failed to delete product.');
          }
        } else {
          productCatalogView.displayMessage('Access denied. Admin rights required.');
        }
        break;
      case 5: // Return to main menu
        return;
      default:
        productCatalogView.displayMessage('Invalid option. Please try again.');
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
          const registered = authenticationController.register(
            registrationCredentials.username,
            registrationCredentials.password
          );
          if (registered) {
            authenticationView.displayMessage('Registration successful. Please login.');
          }
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