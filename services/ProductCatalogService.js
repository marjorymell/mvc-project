const Product = require('../models/Product');

class ProductCatalogService {
  constructor() {
    this.products = [
      new Product(1, "Product 1", 10.99, 100),
      new Product(2, "Product 2", 20.99, 50),
      new Product(3, "Product 3", 15.99, 75)
    ];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  addProduct(name, price, stock) {
    const id = this.products.length + 1;
    const newProduct = new Product(id, name, price, stock);
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, name, price, stock) {
    const product = this.getProductById(id);
    if (product) {
      product.name = name;
      product.price = price;
      product.stock = stock;
      return true;
    }
    return false;
  }

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