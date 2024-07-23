import express from "express";
import dotenv from "dotenv";
import cors from "cors";
/* import session from "express-session"; */

// database connection
import connectDB from "./db/db.js";

import weatherRouter from "./routes/API/weatherRoutes.js";

import locationRouter from "./routes/API/locationRoutes.js";

//import userRouter from "./routes/UsersAccountRoutes.js";
import orderRouter from "./routes/OrderRouter.js";
import productRouter from "./routes/ProductRouter.js";

// importing routes
import userRouter from "./routes/UserRoute/index.js";
import loggingRoutes from "./routes/LoginRoute/index.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors({ origin: "*" }));

connectDB();

app.get("/", (req, res) => {
  res.send(`Hello from Express!`);
});

// app.use("/api/v1/usersaccount", usersRoutes);

// app.get("/*", (req, res) => {
//   res.send("invalid endpoint!");
// });

// Session

/* 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveuninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
 */

//location API route
app.use("/api/v1/location", locationRouter);

//Routes for models (user account, product, order) //user account API route

//app.use("/api/v1/user-account", userRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/product", productRouter);

//weather API route
app.use("/api/v1/weather", weatherRouter);

app.get("/*", (req, res) => {
  res.send("invalid endpoint!");
});

// End points
app.use("/api/v1/auth", loggingRoutes);
app.use("/api/v1/usersaccounts", userRouter);

// app listening port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
