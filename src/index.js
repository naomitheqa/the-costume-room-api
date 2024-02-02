// Module Imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

import users from "./api/routes/users_routes.js";
import admin from "./api/routes/admin_routes.js";
// import config from '../config/dev.env';

const app = express();

// Initialize Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/tcr/users", users);
app.use("/tcr/admin", admin);

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to The Costume Room API..." });
});

app.listen(8080, () => {
  console.log(`Server is running`);
});

export default app;
