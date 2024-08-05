import { Router } from "express";
import {
  getAllImages,
  createSinglImage,
  getSingleImage,
  updateSingleImage,
  deleteSingleImage,
} from "../controllers/userControlers/UserimageController.js";
/* import { isAdmin } from "../Middleware/Users/index.js"; */

const userimageRouter = Router();

userimageRouter.get("/", getAllImages);
//productRouter.get("?category=category", getAllProducts);

userimageRouter.post("/", createSinglImage);

userimageRouter
  .get("/:id", getSingleImage)
  .put("/:id", updateSingleImage)
  .delete("/:id", deleteSingleImage);

/* orderrouter.put("/:id", updateSingleUser);
orderrouter.delete("/:id", deleteSingleUser); */

export default userimageRouter;
