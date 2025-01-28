const AuthenticationController = require('../controllers/AuthenticationController');
const AuthenticationView = require('../views/AuthenticationView');
const ProductCatalogController = require('../controllers/ProductCatalogController');
const ProductCatalogView = require('../views/ProductCatalogView');
const ProductCatalogService = require('../services/ProductCatalogService');
const initializeUsers = require('./initializeUsers');

const container = () => {
  const authenticationController = new AuthenticationController();
  const authenticationView = new AuthenticationView();
  const productCatalogService = new ProductCatalogService();
  const productCatalogController = new ProductCatalogController(productCatalogService, authenticationController);
  const productCatalogView = new ProductCatalogView();

  initializeUsers(authenticationController);

  return {
    authenticationController,
    authenticationView,
    productCatalogService,
    productCatalogController,
    productCatalogView,
  };
};

module.exports = container;
