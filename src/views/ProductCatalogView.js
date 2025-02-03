class ProductCatalogView {
  constructor() {
    process.stdin.setEncoding('utf8');
  }

  // Displays the product catalog menu with available actions
  async displayCatalogMenu() {
    console.log('\n--- Product Catalog Menu ---');
    console.log('1. View all products');
    console.log('2. Add a product');
    console.log('3. Update a product');
    console.log('4. Delete a product');
    console.log('5. Return to main menu');
    return parseInt(await this.getInput('Choose an option: '));
  }

  // Displays all products in the catalog
  displayProducts(products) {
    console.log('\n--- Product Catalog ---');
    products.forEach(product => {
      console.log(`ID: ${product.id}, Name: ${product.name}, Price: $${product.price}, Stock: ${product.stock}`);
    });
  }

  // Retrieves product details for adding or updating
  async getProductDetails(isUpdate = false) {
    const details = {};

    // If updating, ask for product ID
    if (isUpdate) {
      details.id = parseInt(await this.getInput('Enter product ID to update: '));
    }
    details.name = await this.getInput('Enter product name: ');
    details.price = parseFloat(await this.getInput('Enter product price: '));
    details.stock = parseInt(await this.getInput('Enter product stock: '));
    return details;
  }

  // Prompts user for a product ID to delete
  async getProductId() {
    return parseInt(await this.getInput('Enter product ID to delete: '));
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

module.exports = ProductCatalogView;