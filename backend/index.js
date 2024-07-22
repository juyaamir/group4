import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import weatherRouter from "./routes/API/weatherRoutes.js";
import userRouter from "./routes/UsersAccountRoutes.js";
import connectDB from "./db/db.js";
import locationRouter from "./routes/API/locationRoutes.js";

import usersRoutes from "./routes/UsersAccountRoutes.js";


const app = express();
app.use(express.json());
dotenv.config();
app.use(cors({ origin: "*" }));
const port = process.env.PORT || 8000;


connectDB();

app.get("/", (req, res) => {
  res.send(`Hello from Express!`);
});
//user account API route
app.use("/api/v1/user-account", userRouter);

//location API route
app.use("/api/v1/location", locationRouter);
app.use("/api/v1/usersaccount", usersRoutes);
//app.use("/api/v1/order", orderRouter);

//weather API route
app.use("/api/v1/weather", weatherRouter);
app.get("/*", (req, res) => {
  res.send("invalid endpoint!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
