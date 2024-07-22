import { Router } from "express";
import {
  getAllproducts,
  getSingleproduct,
  createSinglproduct,
  updateSingleproduct,
  deleteSingleproduct,
} from "../controllers/ProductController.js";

const productrouter = Router();

productrouter.get("/", getAllproducts).post("/", createSinglproduct);

/* orderrouter.post("/", createSingleUser); */

productrouter
  .get("/:id", getSingleproduct)
  .put("/:id", updateSingleproduct)
  .delete("/:id", deleteSingleproduct);

/* orderrouter.put("/:id", updateSingleUser);
orderrouter.delete("/:id", deleteSingleUser); */

export default productrouter;
