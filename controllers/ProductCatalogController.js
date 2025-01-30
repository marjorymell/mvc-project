class ProductCatalogController {
    constructor(productCatalogService, authenticationController) {
      this.productCatalogService = productCatalogService;
      this.authenticationController = authenticationController;
    }
  
    getAllProducts() {
        return this.productCatalogService.getAllProducts();
    }
  
    addProduct(username, name, price, stock) {
      if (this.authenticationController.isAdmin(username)) {
        return this.productCatalogService.addProduct(name, price, stock);
      } else {
        console.log("Access denied. Admin rights required.");
        return null;
      }
    }
  
    updateProduct(username, id, name, price, stock) {
      if (this.authenticationController.isAdmin(username)) {
        return this.productCatalogService.updateProduct(id, name, price, stock);
      } else {
        console.log("Access denied. Admin rights required.");
        return false;
      }
    }
  
    deleteProduct(username, id) {
      if (this.authenticationController.isAdmin(username)) {
        return this.productCatalogService.deleteProduct(id);
      } else {
        console.log("Access denied. Admin rights required.");
        return false;
      }
    }
  }
  
  module.exports = ProductCatalogController;