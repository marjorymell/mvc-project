const AuthenticationController = require("../controllers/AuthenticationController")
const ProductCatalogController = require("../controllers/ProductCatalogController")
const OrderController = require("../controllers/OrderController")
const AuthenticationView = require("../views/AuthenticationView")
const ProductCatalogView = require("../views/ProductCatalogView")
const OrderView = require("../views/OrderView")
const ProductCatalogService = require("../services/ProductCatalogService")
const OrderService = require("../services/OrderService")
const PaymentService = require("../services/PaymentService")
const AuthenticationService = require("../services/AuthenticationService")

function container() {
  const authenticationService = new AuthenticationService()
  const authenticationController = new AuthenticationController(authenticationService)
  const productCatalogService = new ProductCatalogService()
  const paymentService = new PaymentService()
  const orderService = new OrderService(productCatalogService, paymentService)

  return {
    authenticationController,
    authenticationService,
    productCatalogController: new ProductCatalogController(productCatalogService, authenticationController),
    orderController: new OrderController(orderService, authenticationController),
    authenticationView: new AuthenticationView(),
    productCatalogView: new ProductCatalogView(),
    orderView: new OrderView(),
  }
}

module.exports = container

