// Module Imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();

// Initialize Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.json({ message: "from index api" });
});

app.listen(8080, () => {
  console.log(`Server is running`);
});
