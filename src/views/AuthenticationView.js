class AuthenticationView {
  constructor() {
    process.stdin.setEncoding('utf8');
  }

  async displayMainMenu() {
    console.log('\n--- Main Menu ---');
    console.log('1. Register');
    console.log('2. Login');
    console.log('3. Exit');
    return parseInt(await this.getInput('Choose an option: '));
  }

  async getCredentials(isRegistration = false) {
    const username = await this.getInput('Enter your username: ');
    const password = await this.getInput('Enter your password: ');
    if (isRegistration) {
      const confirmPassword = await this.getInput('Confirm your password: ');
      return { username, password, confirmPassword };
    }
    return { username, password };
  }

  getInput(prompt) {
    return new Promise((resolve) => {
      process.stdout.write(prompt);
      process.stdin.once('data', (data) => {
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