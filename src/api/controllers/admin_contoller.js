const user_data = require("../data/logic/user_data");

const validator = require("../../helpers/validator");
const bcrypt = require("bcrypt");

export class AdminController {
    /**
     * Allows an admib to create and add another admin
     * @param {*} firstName 
     * @param {*} lastName 
     * @param {*} email 
     */
    async createAdmin(firstName, lastName, email){
        if (validator.name(firstName) && validator.name(lastName) && validator.email(email)){
            try{
                const user = await user_data.selectUserByEmail(email);

                if (user == 1){
                    const hash = await bcrypt.hash('GodFirst1', 10);
                    const newUser = await user_data.insertUser(firstName, lastName, email, hash, 'ADMIN', false, null, true);
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
     * @param {*} firstName 
     * @param {*} lastName 
     * @param {*} email 
     * @param {*} expiryDate 
     * @returns 
     */
    async createUser(firstName, lastName, email, expiryDate){
        if (validator.name(firstName) && validator.name(lastName) && validator.email(email) && validator.date(expiryDate)){
            try{
                const user = await user_data.selectUserByEmail(email);

                if (user == 1){
                    const hash = await bcrypt.hash('GodFirst1', 10);
                    const newUser = await user_data.insertUser(firstName, lastName, email, hash, 'GENERAL', true, expiryDate, true);
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
}