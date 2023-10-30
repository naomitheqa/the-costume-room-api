const user_data = require("../data/logic/user_data");

const validator = require("../../helpers/validator");
const bcrypt = require("bcrypt");
const config = require("../../../config/env");
const jwt = require("jsonwebtoken");

export class UserController {
  async authenticate(email, password) {
    if (validator.email(email) && validator.password(password)) {
      try {
        const user = await user_data.selectUserByEmail(email);

        if (user == 1) {
          return 1;
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
              },
              config.jwt_key,
              {
                expiresIn: "1h",
              }
            );
            return { token: token, id: user.id };
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

  async updatePassword(id, cpassword, npassword) {
    if (validator.password(cpassword) && validator.password(npassword)) {
      try {
        const user = await user_data.selectUserById(id);

        if (user == 1) {
          return 1;
        } else {
          if (bcrypt.compareSync(cpassword, user.password)) {
            const hash = await bcrypt.hash(npassword, 10);
            const update = await user_data.updatePassword(id, hash);

            return update;
          } else {
            return -1;
          }
        }
      } catch (err) {
        return err;
      }
    } else {
      return 0;
    }
  }

  async validateAccessToken(header) {
    if (header && header.authorization) {
      const token = header.authorization.split(" ")[1];
      if (token) {
        const payload = await jwt.verify(token, config.jwt_key);
        if (payload && payload.id) {
          return true;
        } else {
          return false;
        }
      }
      return null;
    }
  }
}
