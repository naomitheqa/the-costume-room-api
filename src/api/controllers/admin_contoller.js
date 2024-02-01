import userData from '../data/logic/user_data.js';
import { Validator } from '../../helpers/validator.js';
import bcrypt from 'bcrypt';
import config from '../../../config/env/index.js';
import jwt from 'jsonwebtoken';

// const userData = new UserData();
const validator = new Validator();

export class AdminController {
    /**
     * Allows an admib to create and add another admin
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} email 
     */
    async createAdmin(firstName, lastName, email){
        if (validator.name(firstName) && validator.name(lastName) && validator.email(email)){
            try{
                const user = await userData.selectUserByEmail(email);

                if (user == 1){
                    const hash = await bcrypt.hash('GodFirst1', 10);
                    const newUser = await userData.insertUser(firstName, lastName, email, hash, 'ADMIN', false, null, true);
                    return newUser;
                } else {
                   return 1;
                }
            } catch (err){
                return err;
            }
        } else {
            return 0;
        }
    }

    /**
     * Allows an admin to create and add a general user
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} email 
     * @param {Date} expiryDate 
     * @returns 
     */
    async createUser(firstName, lastName, email, expiryDate){
        if (validator.name(firstName) && validator.name(lastName) && validator.email(email) && validator.date(expiryDate)){
            try{
                const user = await userData.selectUserByEmail(email);

                if (user == 1){
                    const hash = await bcrypt.hash('GodFirst1', 10);
                    const newUser = await userData.insertUser(firstName, lastName, email, hash, 'GENERAL', true, expiryDate, true);
                    return newUser;
                } else {
                   return 1;
                }
            } catch (err){
                return err;
            }
        } else {
            return 0;
        }
    }

    async listAdmins(){
        var admins = [];
        try {
            const temp = await userData.selectAllAdmins();

            if (temp == 1){
                return 1;
            } else {
                temp.forEach(admin => {
                    let tempUser = {
                        id: admin.id,
                        firstName: admin.firstName,
                        lastName: admin.lastName,
                        email: admin.email
                    }

                    admins.push(tempUser);
                });

                return admins;
            }
        } catch (err) {
            return err;
        }
    }

    async listGeneralUsers(){
        var users = [];
        try {
            const temp = await userData.selectAllGeneralUsers();

            if (temp == 1){
                return 1;
            } else {
                temp.forEach(user => {
                    let tempUser = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        expiryEnabled: user.expiryEnabled,
                        expiryDate: user.expiryDate
                    }

                    users.push(tempUser);
                });

                return users;
            }
        } catch (err) {
            return err;
        }
    }

     /**
   * Allows a user (an admin) to delete another user
   * @param {*} id 
   * @returns 
   */
  async deleteUser(id, header){
    const token = header.authorization.split(" ")[1];
    if (token) {
      const payload = jwt.verify(token, config.jwt_key);
      if (id == payload.id){
        return {response: -1, adminId: payload.id};
      } else {
        try{
          const confirm = await userData.deleteUser(id);
    
          if (confirm == 0){
            return {response: true};
          } else {
            return {response: false};
          }
        } catch (err) {
          return {response: err};
        }
      }
    } else {
      return 1;
    }
  }
}