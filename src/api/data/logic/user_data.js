import user from '../../../db/models/user.js';
import User from "../classes/user.js";


export class UserData {
  
  async insertUser(
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

  async selectUserByEmail(email) {
    console.log(email + 1)
    if (email) {
      const temp = await user.findOne({
        where: {
          email: email,
        },
      });
      console.log('hmm')
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

      return 1;
    }
  };

  async selectUserById(id) {
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

  async updatePassword(id, password) {
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

  async selectAllAdmins(){
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

  async selectAllGeneralUsers(){
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

  async deleteUser(id) {
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
  };
}



// export const insertUser = async function (
//   firstName,
//   lastName,
//   email,
//   password,
//   usertype,
//   enableExpiry,
//   expiryDate,
//   isFirstLogin
// ) {
//   try {
//     const temp = await user.create({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: password,
//       utype: usertype,
//       enableExpiry: enableExpiry,
//       expiryDate: expiryDate,
//       isFirstLogin: isFirstLogin
//     });

//     if (temp) {
//       const userObj = new User(
//         temp.dataValues.hashid,
//         temp.dataValues.firstName,
//         temp.dataValues.lastName,
//         temp.dataValues.email,
//         temp.dataValues.password,
//         temp.dataValues.utype,
//         temp.dataValues.enableExpiry,
//         temp.dataValues.expiryDate,
//         temp.dataValues.isFirstLogin
//       );
//       return userObj;
//     }
//   } catch (err) {
//     console.log(
//       "Failed to insert user. Please check the data that has been provided..."
//     );
//   }
// };

// export const selectUserByEmail = async function (email) {
//   if (email) {
//     const temp = await user.findOne({
//       where: {
//         email: email,
//       },
//     });

//     if (temp) {
//       const userObj = new User(
//         temp.dataValues.hashid,
//         temp.dataValues.firstName,
//         temp.dataValues.lastName,
//         temp.dataValues.email,
//         temp.dataValues.password,
//         temp.dataValues.utype,
//         temp.dataValues.enableExpiry,
//         temp.dataValues.expiryDate,
//         temp.dataValues.isFirstLogin
//       );
//       return userObj;
//     }

//     return 1;
//   }
// };

// export const selectUserById = async function (id) {
//   if (id) {
//     const temp = await user.findOne({
//       where: {
//         hashid: id,
//       },
//     });

//     if (temp) {
//       const userObj = new User(
//         temp.dataValues.hashid,
//         temp.dataValues.firstName,
//         temp.dataValues.lastName,
//         temp.dataValues.email,
//         temp.dataValues.password,
//         temp.dataValues.utype,
//         temp.dataValues.enableExpiry,
//         temp.dataValues.expiryDate,
//         temp.dataValues.isFirstLogin
//       );
//       return userObj;
//     }

//     return 1;
//   }
// };

// export const updatePassword = async function (id, password) {
//   if (id) {
//     try {
//       const temp = await user.findOne({
//         where: {
//           hashid: id,
//         },
//       });

//       await user.update(
//         { password: password },
//         {
//           where: {
//             hashid: temp.dataValues.hashid,
//           },
//         }
//       );

//       return true;
//     } catch (err) {
//       return false;
//     }
//   }
// };

// export const selectAllAdmins = async function (){
//   var admins = [];
//   try {
//     const temp = await user.findAll({
//       raw: true,
//       where: {
//         utype: 'ADMIN'
//       }
//     });

//     temp.forEach(admin => {
//       let userObj = new User(
//         admin.hashid,
//         admin.firstName,
//         admin.lastName,
//         admin.email,
//         admin.password,
//         admin.utype,
//         admin.enableExpiry,
//         admin.expiryDate,
//         admin.isFirstLogin
//       );

//       admins.push(userObj);
//     });

//     return admins;
//   } catch (err) {
//     return 1;
//   }
// };

// export const selectAllGeneralUsers = async function (){
//   var generals = [];
//   try {
//     const temp = await user.findAll({
//       raw: true,
//       where: {
//         utype: 'GENERAL'
//       }
//     });

//     temp.forEach(admin => {
//       let userObj = new User(
//         admin.hashid,
//         admin.firstName,
//         admin.lastName,
//         admin.email,
//         admin.password,
//         admin.utype,
//         admin.enableExpiry,
//         admin.expiryDate,
//         admin.isFirstLogin
//       );

//       generals.push(userObj);
//     });

//     return generals;
//   } catch (err) {
//     return 1;
//   }
// };

// export const deleteUser = async function (id) {
//   try {
//     await user.destroy({
//       where: {
//         hashid: id
//       }
//     });
//     return 0;
//   } catch (err) {
//     return 1;
//   }
// };
