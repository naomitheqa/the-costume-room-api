require("dotenv").config();

const prodConfig = {
  port: process.env.PORT || 8080,
  mailPort: Number(process.env.MAIL_PORT),
  password: process.env.MAIL_PASSWORD,
  email: process.env.MAIL_EMAIL,
  jwt_key: process.env.SECRET_KEY,
  jwt_expiration: "1h",
  dbConnectionString: process.env.DATABASE_URL,
  dbOptions: {
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
};

module.exports = prodConfig;
