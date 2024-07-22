import { Router } from "express";
import {
  getAllorders,
  getSingleOrder,
  createSinglorder,
  updateSingleOrder,
  deleteSingleorder,
} from "../controllers/OrderController.js";

const orderrouter = Router();

orderrouter.get("/", getAllorders).post("/", createSinglorder);

/* orderrouter.post("/", createSingleUser); */

orderrouter
  .get("/:id", getSingleOrder)
  .put("/:id", updateSingleOrder)
  .delete("/:id", deleteSingleorder);

/* orderrouter.put("/:id", updateSingleUser);
orderrouter.delete("/:id", deleteSingleUser); */

export default orderrouter;
