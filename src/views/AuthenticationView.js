class AuthenticationView {
  constructor() {
    process.stdin.setEncoding('utf8');
  }

  // Displays the main menu with available authentication options
  async displayMainMenu() {
    console.log('\n--- Main Menu ---');
    console.log('1. Register');
    console.log('2. Login');
    console.log('3. Exit');
    return parseInt(await this.getInput('Choose an option: '));
  }

  // Prompts user for login or registration credentials
  async getCredentials(isRegistration = false) {
    const username = await this.getInput('Enter your username: ');
    const password = await this.getInput('Enter your password: ');

    // If registering, ask for password confirmation
    if (isRegistration) {
      const confirmPassword = await this.getInput('Confirm your password: ');
      return { username, password, confirmPassword };
    }
    return { username, password };
  }

  // Handles user input asynchronously
  getInput(prompt) {
    return new Promise((resolve) => {
      process.stdout.write(prompt);
      process.stdin.once('data', (data) => {
        // Remove extra spaces or newlines
        resolve(data.toString().trim()); 
      });
    });
  }

  displayMessage(message) {
    console.log(message);
  }

  close() {
  }
}

module.exports = AuthenticationView;