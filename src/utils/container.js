const AuthenticationController = require('../controllers/AuthenticationController');
const ProductCatalogController = require('../controllers/ProductCatalogController');
const OrderController = require('../controllers/OrderController');
const AuthenticationView = require('../views/AuthenticationView');
const ProductCatalogView = require('../views/ProductCatalogView');
const OrderView = require('../views/OrderView');
const ProductCatalogService = require('../services/ProductCatalogService');
const OrderService = require('../services/OrderService');
const PaymentService = require('../services/PaymentService');

function container() {
  const authenticationController = new AuthenticationController();
  const productCatalogService = new ProductCatalogService();
  const paymentService = new PaymentService();
  const orderService = new OrderService(productCatalogService, paymentService);
  
  return {
    authenticationController,
    productCatalogController: new ProductCatalogController(productCatalogService, authenticationController),
    orderController: new OrderController(orderService, authenticationController),
    authenticationView: new AuthenticationView(),
    productCatalogView: new ProductCatalogView(),
    orderView: new OrderView(),
  };
}

module.exports = container;