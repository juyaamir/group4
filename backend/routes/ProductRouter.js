import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  createSinglProduct,
  updateSingleProduct,
  deleteSingleProduct,
} from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.get("/", getAllProducts).post("/", createSinglProduct);
//productRouter.get("?category=category", getAllProducts);

/* orderrouter.post("/", createSingleUser); */

productRouter
  .get("/:id", getSingleProduct)
  .put("/:id", updateSingleProduct)
  .delete("/:id", deleteSingleProduct);

/* orderrouter.put("/:id", updateSingleUser);
orderrouter.delete("/:id", deleteSingleUser); */

export default productRouter;
