const user_data = require("../data/logic/user_data");

const validator = require("../../helpers/validator");
const bcrypt = require("bcrypt");

export class AdminController {
    async createAdmin(firstName, lastName, email, password='GodFirst1', usertype='ADMIN', enableExpiry=false){
        if (validator.name(firstName) && validator.name(lastName) && validator.email(email) && validator.password(password)){
            try{
                const user = await user_data.selectUserByEmail(email);

                if (user == 1){
                    const hash = await bcrypt.hash(password, 10);
                    const newUser = await user_data.insertUser(firstName, lastName, email, hash, usertype, enableExpiry);
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