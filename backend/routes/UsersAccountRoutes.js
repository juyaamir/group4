import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  createSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from "../controllers/UsersAccountController.js";

const userRouter = Router();

userRouter.route('/').get(getAllUsers).post(createSingleUser);
userRouter.route('/:id').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

/* router.get("/", getAllUsers);

router.post("/", createSingleUser);

router.get("/:id", getSingleUser);

router.put("/:id", updateSingleUser);
router.delete("/:id", deleteSingleUser); */

export default userRouter;
