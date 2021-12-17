export default class User {
  constructor(name, username, email, password, logintype) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.login_type = logintype;
  }
}