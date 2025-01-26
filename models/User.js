class User {
  constructor(username, password, isAdmin = false) {
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}

module.exports = User;