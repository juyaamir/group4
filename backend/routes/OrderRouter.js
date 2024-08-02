import { Router } from "express";
import {
  getAllOrders,
  getSingleOrder,
  createSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
} from "../controllers/OrderController.js";

const orderRouter = Router();

orderRouter.get("/", getAllOrders).post("/", createSingleOrder);

/* orderrouter.post("/", createSingleUser); */

orderRouter
  .get("/:id", getSingleOrder)
  .put("/:id", updateSingleOrder)
  .delete("/:id", deleteSingleOrder);

/* orderrouter.put("/:id", updateSingleUser);
orderrouter.delete("/:id", deleteSingleUser); */

export default orderRouter;
