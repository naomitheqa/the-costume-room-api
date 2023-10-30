export class User {
  constructor(id, firstName, lastName, email, password, usertype, enableExpiry, expiryDate, isFirstLogin) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.usertype = usertype;
    this.enableExpiry = enableExpiry;
    this.expiryDate = expiryDate;
    this.isFirstLogin = isFirstLogin;
  }
}
