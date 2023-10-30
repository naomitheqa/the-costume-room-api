const { user } = require("../../../db/models");
import { hash } from "bcrypt";
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

module.exports.selectUserByEmail = async function (email) {
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

module.exports.selectUserById = async function (id) {
  if (id) {
    const temp = await user.findOne({
      where: {
        hashid: id,
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
      return userObj;
    }

    return 1;
  }
};

module.exports.updatePassword = async function (id, password) {
  if (id) {
    try {
      const temp = await user.findOne({
        where: {
          hashid: id,
        },
      });

      await user.update(
        { password: password },
        {
          where: {
            hashid: temp.dataValues.hashid,
          },
        }
      );

      return true;
    } catch (err) {
      return false;
    }
  }
};
