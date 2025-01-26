const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationView = require('./views/AuthenticationView');
const initializeUsers = require('./utils/initializeUsers');

const authenticationController = new AuthenticationController();
const authenticationView = new AuthenticationView();

// Initialize default users
initializeUsers(authenticationController);

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
          } else {
            authenticationView.displayMessage('Logged in as regular user.');
          }
        }
        break;

      case 3:
        authenticationView.displayMessage('Thank you for using our service. Goodbye!');
        authenticationView.close();
        return;

      default:
        authenticationView.displayMessage('Invalid option. Please try again.');
    }
  }
}

main().catch(console.error);