import userData from "../data/logic/user_data.js";
import { Validator } from "../../helpers/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const userData = new UserData();
const validator = new Validator();

export class UserController {
  /**
   * Authenticates user for use of the API
   * @param {String} email
   * @param {String} password
   */
  async authenticate(email, password) {
    if (validator.email(email) && validator.password(password)) {
      try {
        const user = await userData.selectUserByEmail(email);

        if (user === 1) {
          return 1;
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
              },
              process.env.SECRET_KEY,
              {
                expiresIn: "1h",
              }
            );
            console.log(token);
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

  /**
   * Allows for a user to update their password once authenticated.
   * @param {UUID} id
   * @param {String} cpassword - The user's current password
   * @param {String} npassword - The password that the user wants to change to
   */
  async updatePassword(id, cpassword, npassword) {
    if (validator.password(cpassword) && validator.password(npassword)) {
      try {
        const user = await userData.selectUserById(id);
        console.log(user);

        if (user === 1) {
          return 1;
        } else {
          if (bcrypt.compareSync(cpassword, user.password)) {
            const hash = await bcrypt.hash(npassword, 10);
            return await userData.updatePassword(id, hash);
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

  /**
   * Assess whether a provided header contains a valid JWT token
   * @param {Object} header
   */
  async validateAccessToken(header) {
    if (header && header.authorization) {
      const token = header.authorization.split(" ")[1];
      if (token === undefined) {
        return null;
      } else {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        if (payload && payload.id) {
          try {
            const user = await userData.selectUserById(payload.id);
            if (user === 1) {
              return 1;
            } else {
              return { isfound: true, userType: user.usertype };
            }
          } catch (err) {
            return err;
          }
        } else {
          return { isfound: false };
        }
      }
    }
    return null;
  }
}
