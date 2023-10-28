// Module Imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

const users = require("./api/routes/users_routes");

const config = require("../config/env");
const app = express();

// Initialize Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/tcr/users", users);

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to The Costume Room API..." });
});

app.listen(8080, () => {
  console.log(`Server is running`);
});
