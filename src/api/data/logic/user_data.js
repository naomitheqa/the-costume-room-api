const { user } = require('../../../db/models/user.js');
// import { User } from "../classes/user.js" ;

// export class UserData {
  
//   async insertUser(
//     firstName,
//     lastName,
//     email,
//     password,
//     usertype,
//     enableExpiry,
//     expiryDate,
//     isFirstLogin
//   ) {
//     try {
//       const temp = await user.create({
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: password,
//         utype: usertype,
//         enableExpiry: enableExpiry,
//         expiryDate: expiryDate,
//         isFirstLogin: isFirstLogin
//       });

//       if (temp) {
//         const userObj = new User(
//           temp.dataValues.hashid,
//           temp.dataValues.firstName,
//           temp.dataValues.lastName,
//           temp.dataValues.email,
//           temp.dataValues.password,
//           temp.dataValues.utype,
//           temp.dataValues.enableExpiry,
//           temp.dataValues.expiryDate,
//           temp.dataValues.isFirstLogin
//         );
//         return userObj;
//       }
//     } catch (err) {
//       console.log(
//         "Failed to insert user. Please check the data that has been provided..."
//       );
//     }
//   };

//   async selectUserByEmail(email) {
//     if (email) {
//       try {
//         const temp = await user.findOne({
//           where: {
//             email: email,
//           },
//         });
//       console.log(temp)
//       } catch (err) {
//         console.log(err)
//       }
      

//       if (temp) {
//         const userObj = new User(
//           temp.dataValues.hashid,
//           temp.dataValues.firstName,
//           temp.dataValues.lastName,
//           temp.dataValues.email,
//           temp.dataValues.password,
//           temp.dataValues.utype,
//           temp.dataValues.enableExpiry,
//           temp.dataValues.expiryDate,
//           temp.dataValues.isFirstLogin
//         );
//         return userObj;
//       }

//       return 1;
//     }
//   };

//   async selectUserById(id) {
//     if (id) {
//       const temp = await user.findOne({
//         where: {
//           hashid: id,
//         },
//       });

//       if (temp) {
//         const userObj = new User(
//           temp.dataValues.hashid,
//           temp.dataValues.firstName,
//           temp.dataValues.lastName,
//           temp.dataValues.email,
//           temp.dataValues.password,
//           temp.dataValues.utype,
//           temp.dataValues.enableExpiry,
//           temp.dataValues.expiryDate,
//           temp.dataValues.isFirstLogin
//         );
//         return userObj;
//       }

//       return 1;
//     }
//   };

//   async updatePassword(id, password) {
//     if (id) {
//       try {
//         const temp = await user.findOne({
//           where: {
//             hashid: id,
//           },
//         });

//         await user.update(
//           { password: password },
//           {
//             where: {
//               hashid: temp.dataValues.hashid,
//             },
//           }
//         );

//         return true;
//       } catch (err) {
//         return false;
//       }
//     }
//   };

//   async selectAllAdmins(){
//     var admins = [];
//     try {
//       const temp = await user.findAll({
//         raw: true,
//         where: {
//           utype: 'ADMIN'
//         }
//       });

//       temp.forEach(admin => {
//         let userObj = new User(
//           admin.hashid,
//           admin.firstName,
//           admin.lastName,
//           admin.email,
//           admin.password,
//           admin.utype,
//           admin.enableExpiry,
//           admin.expiryDate,
//           admin.isFirstLogin
//         );

//         admins.push(userObj);
//       });

//       return admins;
//     } catch (err) {
//       return 1;
//     }
//   };

//   async selectAllGeneralUsers(){
//     var generals = [];
//     try {
//       const temp = await user.findAll({
//         raw: true,
//         where: {
//           utype: 'GENERAL'
//         }
//       });

//       temp.forEach(admin => {
//         let userObj = new User(
//           admin.hashid,
//           admin.firstName,
//           admin.lastName,
//           admin.email,
//           admin.password,
//           admin.utype,
//           admin.enableExpiry,
//           admin.expiryDate,
//           admin.isFirstLogin
//         );

//         generals.push(userObj);
//       });

//       return generals;
//     } catch (err) {
//       return 1;
//     }
//   };

//   async deleteUser(id) {
//     try {
//       await user.destroy({
//         where: {
//           hashid: id
//         }
//       });
//       return 0;
//     } catch (err) {
//       return 1;
//     }
//   };
// }

class User {
  constructor(id, firstName, lastName, email, password, usertype, enableExpiry, expiryDate, isFirstLogin) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.usertype = usertype;
    this.enableExpiry = enableExpiry;
    this.expiryDate = expiryDate;
    this.isFirstLogin = isFirstLogin;
  }
}

module.exports.insertUser = async function (
  firstName,
  lastName,
  email,
  password,
  usertype,
  enableExpiry,
  expiryDate,
  isFirstLogin
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
      isFirstLogin: isFirstLogin
    });

    if (temp) {
      const userObj = new User(
        temp.dataValues.hashid,
        temp.dataValues.firstName,
        temp.dataValues.lastName,
        temp.dataValues.email,
        temp.dataValues.password,
        temp.dataValues.utype,
        temp.dataValues.enableExpiry,
        temp.dataValues.expiryDate,
        temp.dataValues.isFirstLogin
      );
      return userObj;
    }
  } catch (err) {
    console.log(
      "Failed to insert user. Please check the data that has been provided..."
    );
  }
};

module.exports.selectUserByEmail = async function (email) {
  console.log(email+3)
  if (email) {
    console.log(email+77)
    try{
      const temp = await user.findOne({
      where: {
        email: email,
      },
    });

    console.log(temp)

    if (temp) {
      const userObj = new User(
        temp.dataValues.hashid,
        temp.dataValues.firstName,
        temp.dataValues.lastName,
        temp.dataValues.email,
        temp.dataValues.password,
        temp.dataValues.utype,
        temp.dataValues.enableExpiry,
        temp.dataValues.expiryDate,
        temp.dataValues.isFirstLogin
      );
      return userObj;
    }

    } catch (err) {
      console.log(err)
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
        temp.dataValues.utype,
        temp.dataValues.enableExpiry,
        temp.dataValues.expiryDate,
        temp.dataValues.isFirstLogin
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

module.exports.selectAllAdmins = async function (){
  var admins = [];
  try {
    const temp = await user.findAll({
      raw: true,
      where: {
        utype: 'ADMIN'
      }
    });

    temp.forEach(admin => {
      let userObj = new User(
        admin.hashid,
        admin.firstName,
        admin.lastName,
        admin.email,
        admin.password,
        admin.utype,
        admin.enableExpiry,
        admin.expiryDate,
        admin.isFirstLogin
      );

      admins.push(userObj);
    });

    return admins;
  } catch (err) {
    return 1;
  }
};

module.exports.selectAllGeneralUsers = async function (){
  var generals = [];
  try {
    const temp = await user.findAll({
      raw: true,
      where: {
        utype: 'GENERAL'
      }
    });

    temp.forEach(admin => {
      let userObj = new User(
        admin.hashid,
        admin.firstName,
        admin.lastName,
        admin.email,
        admin.password,
        admin.utype,
        admin.enableExpiry,
        admin.expiryDate,
        admin.isFirstLogin
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
        hashid: id
      }
    });
    return 0;
  } catch (err) {
    return 1;
  }
}