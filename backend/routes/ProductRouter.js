import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  createSinglProduct,
  updateSingleProduct,
  deleteSingleProduct,
} from "../controllers/ProductController.js";
/* import { isAdmin } from "../Middleware/Users/index.js"; */

const productRouter = Router();

productRouter.get("/", getAllProducts);
//productRouter.get("?category=category", getAllProducts);

productRouter.post("/", createSinglProduct);

productRouter
  .get("/:id", getSingleProduct)
  .put("/:id", updateSingleProduct)
  .delete("/:id", deleteSingleProduct);

/* orderrouter.put("/:id", updateSingleUser);
orderrouter.delete("/:id", deleteSingleUser); */

export default productRouter;
