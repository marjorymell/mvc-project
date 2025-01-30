const AuthenticationController = require('../controllers/AuthenticationController');
const AuthenticationView = require('../views/AuthenticationView');
const ProductCatalogController = require('../controllers/ProductCatalogController');
const ProductCatalogView = require('../views/ProductCatalogView');
const ProductCatalogService = require('../services/ProductCatalogService');
const OrderController = require('../controllers/OrderController');
const OrderView = require('../views/OrderView');
const OrderService = require('../services/OrderService');
const initializeUsers = require('./initializeUsers');

const container = () => {
  const authenticationController = new AuthenticationController();
  const authenticationView = new AuthenticationView();
  const productCatalogService = new ProductCatalogService();
  const productCatalogController = new ProductCatalogController(productCatalogService, authenticationController);
  const productCatalogView = new ProductCatalogView();
  const orderService = new OrderService(productCatalogService);
  const orderController = new OrderController(orderService, authenticationController);
  const orderView = new OrderView();

  initializeUsers(authenticationController);

  return {
    authenticationController,
    authenticationView,
    productCatalogService,
    productCatalogController,
    productCatalogView,
    orderService,
    orderController,
    orderView,
  };
};

module.exports = container;