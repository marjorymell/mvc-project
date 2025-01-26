const User = require('../models/User');

class AuthenticationController {
  constructor() {
    this.users = [];
  }

  register(username, password, isAdmin = false) {
    const existingUser = this.users.find(u => u.username === username);
    if (existingUser) {
      console.log('User already exists.');
      return false;
    }

    const newUser = new User(username, password, isAdmin);
    this.users.push(newUser);
    console.log(`User ${username} registered successfully.`);
    return true;
  }

  login(username, password) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      console.log('Login successful.');
      return user;
    } else {
      console.log('Invalid credentials.');
      return null;
    }
  }

  isAdmin(username) {
    const user = this.users.find(u => u.username === username);
    return user ? user.isAdmin : false;
  }
}

module.exports = AuthenticationController;