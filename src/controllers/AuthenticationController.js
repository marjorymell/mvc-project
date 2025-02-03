class AuthenticationController {
  constructor(authenticationService) {
    this.authenticationService = authenticationService;
  }

  register(username, password, isAdmin = false) {
    return this.authenticationService.register(username, password, isAdmin);
  }

  login(username, password) {
    return this.authenticationService.login(username, password);
  }

  isAdmin(username) {
    return this.authenticationService.isAdmin(username);
  }
}

module.exports = AuthenticationController;