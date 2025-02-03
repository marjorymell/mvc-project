const Product = require('../models/Product');

class ProductCatalogService {
  constructor() {
    this.products = [
      new Product(1, "Product 1", 10.99, 100),
      new Product(2, "Product 2", 20.99, 50),
      new Product(3, "Product 3", 15.99, 75)
    ];
  }

  // Retrieves all available products
  getAllProducts() {
    return this.products;
  }

  // Retrieves a product by its ID
  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  // Adds a new product to the catalog
  addProduct(name, price, stock) {
    const id = this.products.length + 1;
    const newProduct = new Product(id, name, price, stock);
    this.products.push(newProduct);
    return newProduct;
  }

  // Updates product details if it exists
  updateProduct(id, name, price, stock) {
    const product = this.getProductById(id);
    if (product) {
      if (name !== null && name !== undefined) product.name = name;
      if (price !== null && price !== undefined) product.price = price;
      if (stock !== null && stock !== undefined) product.stock = stock;
      return true;
    }
    return false;
  }

  // Removes a product from the catalog
  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = ProductCatalogService;