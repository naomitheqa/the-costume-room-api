const { user } = require("../../../db/models");
import { User } from "../classes/user";

module.exports.insertUser = async function (
  firstName,
  lastName,
  email,
  password,
  usertype
) {
  try {
    const temp = await user.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      usertype: usertype,
    });

    if (temp) {
      const user = new User(
        temp.firstName,
        temp.lastName,
        temp.email,
        temp.password
      );
      return user;
    }
  } catch (err) {
    console.log(
      "Failed to insert user. Please check the data that has been provided..."
    );
  }
};

module.exports.selectUser = async function (email) {
  if (email) {
    const temp = await user.findOne({
      where: {
        email: email,
      },
    });

    if (temp) {
      const userObj = new User(
        temp.dataValues.hashid,
        temp.dataValues.firstName,
        temp.dataValues.lastName,
        temp.dataValues.email,
        temp.dataValues.password,
        temp.dataValues.utype
      );
      console.log(userObj);
      return userObj;
    }

    return 1;
  }
};
