function initializeUsers(authController) {
    // Create admin user
    const adminCreated = authController.register('admin', 'admin123', true);
    if (adminCreated) {
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  
    // Create regular user
    const userCreated = authController.register('user', 'user123', false);
    if (userCreated) {
      console.log('Regular user created successfully.');
    } else {
      console.log('Regular user already exists.');
    }
  }
  
  module.exports = initializeUsers;