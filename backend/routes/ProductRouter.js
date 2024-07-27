import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  createSinglProduct,
  updateSingleProduct,
  deleteSingleProduct,
} from "../controllers/ProductController.js";
import { isAdmin } from "../Middleware/Users/index.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
//productRouter.get("?category=category", getAllProducts);

productRouter.post("/", isAdmin, createSinglProduct);

productRouter
  .get("/:id", getSingleProduct)
  .put("/:id", isAdmin, updateSingleProduct)
  .delete("/:id", isAdmin, deleteSingleProduct);

/* orderrouter.put("/:id", updateSingleUser);
orderrouter.delete("/:id", deleteSingleUser); */

export default productRouter;
