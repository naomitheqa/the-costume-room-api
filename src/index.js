// Module Imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import users from "./api/routes/users_routes.js";
import admin from "./api/routes/admin_routes.js";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

const app = express();

// Initialize Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/tcr/users", users);
app.use("/tcr/admin", admin);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to The Costume Room API..." });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
