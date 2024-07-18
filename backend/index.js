import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import usersRoutes from "./routes/UsersAccountRoutes";

const app = express();
dotenv.config();
app.use(cors({ origin: "*" }));
const port = process.env.PORT || 8000;

// database connection
import connectDB from "./db/db.js";
connectDB();

app.get("/", (req, res) => {
  res.send(`Hello from Express!`);
});

app.use("/api/v1/usersaccount", usersRoutes);

app.get("/*", (req, res) => {
  res.send("invalid endpoint!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
