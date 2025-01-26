const User = require('../models/User');

class AuthenticationController {
  constructor() {
    this.users = [];
  }

  register(username, password) {
    const existingUser = this.users.find(u => u.username === username);
    if (existingUser) {
      console.log('User already exists.');
      return false;
    }

    const newUser = new User(username, password);
    this.users.push(newUser);
    console.log('User registered successfully.');
    return true;
  }

  login(username, password) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      console.log('Login successful.');
      return true;
    } else {
      console.log('Invalid credentials.');
      return false;
    }
  }
}

module.exports = AuthenticationController;