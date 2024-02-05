const { user } = require("../../../db/models");
class User {
  constructor(
    id,
    firstName,
    lastName,
    email,
    password,
    usertype,
    enableExpiry,
    expiryDate
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.usertype = usertype;
    this.enableExpiry = enableExpiry;
    this.expiryDate = expiryDate;
  }
}

module.exports.insertUser = async function (
  firstName,
  lastName,
  email,
  password,
  usertype,
  enableExpiry,
  expiryDate
) {
  try {
    const temp = await user.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      utype: usertype,
      enableExpiry: enableExpiry,
      expiryDate: expiryDate,
    });

    if (temp) {
      return new User(
        temp.dataValues.hashid,
        temp.dataValues.firstName,
        temp.dataValues.lastName,
        temp.dataValues.email,
        temp.dataValues.password,
        temp.dataValues.utype,
        temp.dataValues.enableExpiry,
        temp.dataValues.expiryDate,
        temp.dataValues.loginCount
      );
    }
  } catch (err) {
    console.log(
      "Failed to insert user. Please check the data that has been provided..."
    );
  }
};

module.exports.selectUserByEmail = async function (email) {
  if (email) {
    try {
      const temp = await user.findOne({
        where: {
          email: email,
        },
      });

      if (temp) {
        return new User(
          temp.dataValues.hashid,
          temp.dataValues.firstName,
          temp.dataValues.lastName,
          temp.dataValues.email,
          temp.dataValues.password,
          temp.dataValues.utype,
          temp.dataValues.enableExpiry,
          temp.dataValues.expiryDate,
          temp.dataValues.loginCount
        );
      }
    } catch (err) {
      console.log(err);
    }
    return 1;
  }
};

module.exports.selectUserById = async function (id) {
  if (id) {
    try {
      const temp = await user.findOne({
        where: {
          hashid: id,
        },
      });

      if (temp) {
        return new User(
          temp.dataValues.hashid,
          temp.dataValues.firstName,
          temp.dataValues.lastName,
          temp.dataValues.email,
          temp.dataValues.password,
          temp.dataValues.utype,
          temp.dataValues.enableExpiry,
          temp.dataValues.expiryDate,
          temp.dataValues.loginCount
        );
      }
    } catch (err) {
      console.log(`Failed to find user due to the following error ${err}`);
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

module.exports.selectAllAdmins = async function () {
  const admins = [];
  try {
    const temp = await user.findAll({
      raw: true,
      where: {
        utype: "ADMIN",
      },
    });

    temp.forEach((admin) => {
      const userObj = new User(
        admin.hashid,
        admin.firstName,
        admin.lastName,
        admin.email,
        admin.password,
        admin.utype,
        admin.enableExpiry,
        admin.expiryDate,
        admin.loginCount
      );

      admins.push(userObj);
    });

    return admins;
  } catch (err) {
    return 1;
  }
};

module.exports.selectAllGeneralUsers = async function () {
  const generals = [];
  try {
    const temp = await user.findAll({
      raw: true,
      where: {
        utype: "GENERAL",
      },
    });

    temp.forEach((admin) => {
      const userObj = new User(
        admin.hashid,
        admin.firstName,
        admin.lastName,
        admin.email,
        admin.password,
        admin.utype,
        admin.enableExpiry,
        admin.expiryDate,
        admin.loginCount
      );

      generals.push(userObj);
    });

    return generals;
  } catch (err) {
    return 1;
  }
};

module.exports.deleteUser = async function (id) {
  try {
    await user.destroy({
      where: {
        hashid: id,
      },
    });
    return 0;
  } catch (err) {
    return 1;
  }
};
