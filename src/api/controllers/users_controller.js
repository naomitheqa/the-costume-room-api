const user_data =  require("../data/logic/user_data") ;

const validator = require("../../helpers/validator");
const bcrypt = require("bcrypt");
const config = require("../../../config/env");
const jwt = require("jsonwebtoken");

export class UserController {
  async authenticate(email, password) {
    if (validator.email(email) && validator.password(password)) {
      try {
        const user = await user_data.selectUser(email);
      
        if (user == 1) {
          return 1;
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
              {
                id: user.hashid,
                email: user.email,
              },
              config.jwt_key,
              {
                expiresIn: "1h",
              }
            );
            return token;
          } else {
            return 1;
          }
        }
      } catch (err) {
        return err;
      }
    } else {
        return 0;
    }
  }
}
