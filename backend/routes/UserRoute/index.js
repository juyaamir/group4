import { Router } from "express";
const userRouter = Router();
import { body, param } from "express-validator";

// importing controllers
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deletOne,
} from "../../controllers/userControlers/index.js";

import { isAuthenticated } from "../../Middleware/Users/index.js";
// import {
//   postErrorValidator,
//   isAuthenticated,
// } from "../../Middleware/Users/index.js";

userRouter.get("/", isAuthenticated, getAll);
// userRouter.post("/", postErrorValidator, createOne);
// userRouter.get(
//   "/:id",
//   [param("id").isInt({ min: 1 }).withMessage("id is not valid")],
//   getOne
// );
// userRouter.put("/:id", isAuthenticated, updateOne);
// userRouter.delete("/:id", isAuthenticated, deletOne);

//userRouter.get("/", getAll);
userRouter.post("/", createOne);
userRouter.get("/:id", getOne);
userRouter.put("/:id", updateOne);
userRouter.delete("/:id", deletOne);

export default userRouter;
