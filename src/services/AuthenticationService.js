const User = require('../models/User');

class AuthenticationService {
  constructor() {
    this.users = [];
    this.initializeDefaultUsers();
  }

  // Creates predefined users for system testing and demonstration
  initializeDefaultUsers() {
    this.register('admin', 'admin123', true);
    this.register('user', 'user123', false);
    console.log('Default users created.');
  }

   // Register a new user 
  register(username, password, isAdmin = false) {
    const existingUser = this.users.find(u => u.username === username);
    if (existingUser) {
      console.log('User already exists.');
      return false;
    }

    // Create and store new user
    const newUser = new User(username, password, isAdmin);
    this.users.push(newUser);
    console.log(`User ${username} registered successfully.`);
    return true;
  }

  // Authenticate user credentials
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

  // Check if a user has admin privileges
  isAdmin(username) {
    const user = this.users.find(u => u.username === username);
    return user ? user.isAdmin : false;
  }
}

module.exports = AuthenticationService;