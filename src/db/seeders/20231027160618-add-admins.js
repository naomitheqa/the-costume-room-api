"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = await bcrypt.hash("GodFirst", 10);
    await queryInterface.bulkInsert("users", [
      {
        firstName: "Naomi",
        lastName: "Silvera",
        email: "nobenjamin19@gmail.com",
        password: hash,
        utype: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {});
  },
};

