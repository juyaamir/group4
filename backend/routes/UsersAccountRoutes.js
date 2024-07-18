import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  createSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from "../controllers/UsersAccountController.js";

const router = Router();

router.get("/", getAllUsers);

router.post("/", createSingleUser);

router.get("/:id", getSingleUser);

router.put("/:id", updateSingleUser);
router.delete("/:id", deleteSingleUser);

export default router;
