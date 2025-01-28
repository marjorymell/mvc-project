const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationView = require('./views/AuthenticationView');
const ProductCatalogController = require('./controllers/ProductCatalogController');
const ProductCatalogView = require('./views/ProductCatalogView');
const ProductCatalogService = require('./services/ProductCatalogService');
const initializeUsers = require('./utils/initializeUsers');

const authenticationController = new AuthenticationController();
const authenticationView = new AuthenticationView();
const productCatalogService = new ProductCatalogService();
const productCatalogController = new ProductCatalogController(productCatalogService, authenticationController);
const productCatalogView = new ProductCatalogView();

// Initialize default users
initializeUsers(authenticationController);

async function handleProductCatalog(username) {
  while (true) {
    const choice = await productCatalogView.displayCatalogMenu();

    switch (choice) {
      case 1: // View all products
        const products = productCatalogController.getAllProducts(username);
        if (products) {
          productCatalogView.displayProducts(products);
        }
        break;
      case 2: // Add a product
        const newProductDetails = await productCatalogView.getProductDetails();
        const newProduct = productCatalogController.addProduct(username, newProductDetails.name, newProductDetails.price, newProductDetails.stock);
        if (newProduct) {
          productCatalogView.displayMessage('Product added successfully.');
        }
        break;
      case 3: // Update a product
        const updateProductDetails = await productCatalogView.getProductDetails(true);
        const updated = productCatalogController.updateProduct(username, updateProductDetails.id, updateProductDetails.name, updateProductDetails.price, updateProductDetails.stock);
        if (updated) {
          productCatalogView.displayMessage('Product updated successfully.');
        } else {
          productCatalogView.displayMessage('Failed to update product.');
        }
        break;
      case 4: // Delete a product
        const productId = await productCatalogView.getProductId();
        const deleted = productCatalogController.deleteProduct(username, productId);
        if (deleted) {
          productCatalogView.displayMessage('Product deleted successfully.');
        } else {
          productCatalogView.displayMessage('Failed to delete product.');
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
          authenticationController.register(registrationCredentials.username, registrationCredentials.password);
        }
        break;
      case 2: // Login
        const loginCredentials = await authenticationView.getCredentials();
        const loggedInUser = authenticationController.login(loginCredentials.username, loginCredentials.password);
        if (loggedInUser) {
          if (authenticationController.isAdmin(loggedInUser.username)) {
            authenticationView.displayMessage('Logged in as admin.');
            await handleProductCatalog(loggedInUser.username);
          } else {
            authenticationView.displayMessage('Logged in as regular user.');
            // Here you can add regular user functionality
          }
        }
        break;
      case 3: // Exit
        authenticationView.displayMessage('Thank you for using our service. Goodbye!');
        authenticationView.close();
        productCatalogView.close();
        return;
      default:
        authenticationView.displayMessage('Invalid option. Please try again.');
    }
  }
}

main().catch(console.error);