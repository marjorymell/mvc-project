const readline = require('readline');

class AuthenticationView {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  displayMainMenu() {
    return new Promise((resolve) => {
      console.log('\n--- Main Menu ---');
      console.log('1. Register');
      console.log('2. Login');
      console.log('3. Exit');
      this.rl.question('Choose an option: ', (answer) => {
        resolve(parseInt(answer));
      });
    });
  }

  getCredentials(isRegistration = false) {
    return new Promise((resolve) => {
      this.rl.question('Enter your username: ', (username) => {
        this.rl.question('Enter your password: ', (password) => {
          if (isRegistration) {
            this.rl.question('Confirm your password: ', (confirmPassword) => {
              resolve({ username, password, confirmPassword });
            });
          } else {
            resolve({ username, password });
          }
        });
      });
    });
  }

  displayMessage(message) {
    console.log(message);
  }

  close() {
    this.rl.close();
  }
}

module.exports = AuthenticationView;