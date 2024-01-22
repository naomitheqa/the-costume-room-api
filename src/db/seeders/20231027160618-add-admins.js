"use strict";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default {
  async up(queryInterface, Sequelize) {
    const hash = await bcrypt.hash("GodFirst", 10);
    await queryInterface.bulkInsert("users", [
      {
        hashid: uuidv4(),
        firstName: "Naomi",
        lastName: "Silvera",
        email: "nobenjamin19@gmail.com",
        password: hash,
        utype: "ADMIN",
        enableExpiry: false,
        isFirstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {});
  },
};
