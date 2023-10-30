const user_data = require("../data/logic/user_data");

const validator = require("../../helpers/validator");
const bcrypt = require("bcrypt");

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
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} email 
     * @param {Date} expiryDate 
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

    async listAdmins(){
        var admins = [];
        try {
            const temp = await user_data.selectAllAdmins();

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
            const temp = await user_data.selectAllGeneralUsers();

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
}