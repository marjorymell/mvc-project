const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationView = require('./views/AuthenticationView');

const authenticationController = new AuthenticationController();
const authenticationView = new AuthenticationView();

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
        authenticationController.login(loginCredentials.username, loginCredentials.password);
        break;

      case 3: // Exit
        authenticationView.displayMessage('Thank you for using our service. Goodbye!');
        authenticationView.close();
        return;

      default:
        authenticationView.displayMessage('Invalid option. Please try again.');
    }
  }
}

main().catch(console.error);